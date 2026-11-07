import { prisma } from "./prisma";

export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      connected: true,
      message: "Database connection successful",
    };
  } catch (error) {
    console.error("Database connection failed:", error);

    return {
      connected: false,
      message: "Database connection failed",
    };
  }
}