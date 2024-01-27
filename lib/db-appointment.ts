import { PrismaClient } from "@/prisma/db-appointment/generated/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const dbAppointment = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = dbAppointment;
