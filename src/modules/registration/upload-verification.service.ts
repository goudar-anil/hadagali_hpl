import { upload_purpose } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";
import { supabaseAdmin } from "@/lib/supabase/server";
import { ApiError } from "@/lib/api/api-error";
import { hashUploadToken } from "@/lib/security/token";
const BUCKET_BY_PURPOSE = {
  PLAYER_PHOTO: "player-photos",
  PAYMENT_PROOF: "payment-proofs",
} as const;

interface VerifyUploadInput {
  seasonId: string;
  objectPath: string;
  token: string;
  purpose: upload_purpose;
}

export async function verifyUploadIntent(
  input: VerifyUploadInput,
): Promise<void> {
  const { seasonId, objectPath, token, purpose } = input;

  const uploadIntent = await prisma.upload_intent.findFirst({
    where: {
      season_id: seasonId,
      object_path: objectPath,
      purpose,
      consumed_at: null,
      expires_at: {
        gt: new Date(),
      },
    },
  });

  if (!uploadIntent) {
    throw new ApiError(
      "Upload authorization is invalid or expired.",
      "INVALID_UPLOAD_INTENT",
      400,
    );
  }

  if (hashUploadToken(token) !== uploadIntent.token_hash) {
    throw new ApiError(
        "Upload authorization is invalid.",
        "INVALID_UPLOAD_TOKEN",
        400,
    );
  }

  const bucket = BUCKET_BY_PURPOSE[purpose];
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .list(objectPath.split("/").slice(0, -1).join("/"), {
      search: objectPath.split("/").pop(),
      limit: 1,
    });

  if (
    error ||
    !data?.some((file) => file.name === objectPath.split("/").pop())
  ) {
    throw new ApiError(
      "Uploaded file could not be found.",
      "UPLOAD_FILE_NOT_FOUND",
      400,
    );
  }
}