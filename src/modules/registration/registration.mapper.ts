import type { season_player } from "@/generated/prisma/client";

import type {
  RegistrationResponseDto,
  RegistrationConfirmationDto,
} from "./registration.dto";

export function toRegistrationResponseDto(
  player: season_player,
): RegistrationResponseDto {
  return {
    id: player.id,
    fullName: player.full_name,
    village: player.village,
    playingRole: player.playing_role,
    registrationStatus: player.registration_status,
    paymentStatus: player.payment_status,
    createdAt: player.created_at.toISOString(),
  };
}

export function toRegistrationConfirmationDto(
  player: season_player,
): RegistrationConfirmationDto {
  return {
    registrationId: player.id,
    registrationStatus: player.registration_status,
    paymentStatus: player.payment_status,
    message: "Registration submitted successfully. Awaiting review.",
  };
}