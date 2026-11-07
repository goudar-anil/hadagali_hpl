import { playing_role } from "@/generated/prisma/enums";

export const PLAYING_ROLE_OPTIONS = [
  { value: playing_role.BATSMAN, label: "Batsman" },
  { value: playing_role.BOWLER, label: "Bowler" },
  { value: playing_role.ALL_ROUNDER, label: "All Rounder" },
  { value: playing_role.WICKET_KEEPER, label: "Wicket Keeper" },
] as const;