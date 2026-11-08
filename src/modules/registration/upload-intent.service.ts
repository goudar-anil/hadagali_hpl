import type { Prisma } from "@/generated/prisma/client";
import { ApiError } from "@/lib/api/api-error";

interface ConsumeUploadIntentsInput {
  playerPhotoIntentId: string;
  paymentProofIntentId: string;
}

export async function consumeUploadIntents(
  tx: Prisma.TransactionClient,
  input: ConsumeUploadIntentsInput,
): Promise<void> {
  const now = new Date();

  const photoResult = await tx.upload_intent.updateMany({
    where: {
      id: input.playerPhotoIntentId,
      consumed_at: null,
      expires_at: { gt: now },
    },
    data: {
      consumed_at: now,
    },
  });

  if (photoResult.count !== 1) {
    throw new ApiError(
      "Player photo upload authorization is invalid or already used.",
      "UPLOAD_INTENT_UNAVAILABLE",
      409,
    );
  }

  const paymentResult = await tx.upload_intent.updateMany({
    where: {
      id: input.paymentProofIntentId,
      consumed_at: null,
      expires_at: { gt: now },
    },
    data: {
      consumed_at: now,
    },
  });

  if (paymentResult.count !== 1) {
    throw new ApiError(
      "Payment proof upload authorization is invalid or already used.",
      "UPLOAD_INTENT_UNAVAILABLE",
      409,
    );
  }
}