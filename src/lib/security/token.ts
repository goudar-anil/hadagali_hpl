import { createHash, randomBytes } from "node:crypto";

export function generateUploadToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashUploadToken(token: string): string {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}