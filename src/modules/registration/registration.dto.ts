import {
  playing_role,
  registration_status,
  payment_status,
} from "@/generated/prisma/enums";

export interface CreateRegistrationDto {
  fullName: string;
  phone: string;
  dob: string;
  playingRole: playing_role;
  village: string;
  photoPath: string;
  paymentProofPath: string;
}

export interface RegistrationResponseDto {
  id: string;
  fullName: string;
  village: string;
  playingRole: playing_role;
  registrationStatus: registration_status;
  paymentStatus: payment_status;
  createdAt: string;
}

export interface RegistrationConfirmationDto {
  registrationId: string;
  registrationStatus: typeof registration_status.PENDING_REVIEW;
  paymentStatus: typeof payment_status.NOT_REVIEWED;
  message: string;
}