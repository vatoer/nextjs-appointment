import { NextResponse } from "next/server";

export async function GET() {
  const OFF_DAYS = process.env.OFF_DAYS || "0,6";
  const offDays = OFF_DAYS.split(",").map((day) => parseInt(day));
  return NextResponse.json({ data: offDays });
}
