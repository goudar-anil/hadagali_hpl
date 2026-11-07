import { z } from "zod";
import {
  playing_role,
  registration_status,
  payment_status,
} from "@/generated/prisma/enums";

export const playingRoleSchema = z.enum(playing_role);

export const registrationStatusSchema = z.enum(registration_status);

export const paymentStatusSchema = z.enum(payment_status);

export const createRegistrationSchema = z.object({
  fullName: z.string().trim().min(1).max(100),

  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: "Enter a valid 10-digit Indian mobile number",
  }),

  dob: z.iso.date(),

  playingRole: playingRoleSchema,

  village: z.string().trim().min(1).max(100),

  photoPath: z.string().min(1),

  paymentProofPath: z.string().min(1),
});

export type CreateRegistrationInput = z.infer<
  typeof createRegistrationSchema
>;