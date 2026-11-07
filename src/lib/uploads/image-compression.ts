import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/image.constants";
import imageCompression from "browser-image-compression";


export async function compressPlayerPhoto(
  file: File,
): Promise<File> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Upload a JPEG, PNG, or WebP image.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Player photo must be 5 MB or smaller.");
  }

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
  });

  if (compressedFile.size > MAX_FILE_SIZE) {
    throw new Error("Compressed photo exceeds the 5 MB limit.");
  }

  return new File(
    [compressedFile],
    `${file.name.replace(/\.[^/.]+$/, "")}.webp`,
    {
      type: "image/webp",
      lastModified: Date.now(),
    },
  );
}

export function validatePaymentScreenshot(file: File): File {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Upload a JPEG, PNG, or WebP screenshot.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Payment screenshot must be 5 MB or smaller.");
  }

  return file;
}