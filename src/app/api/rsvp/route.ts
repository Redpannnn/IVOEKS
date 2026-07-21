import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attendance, guests } = body;

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 }
      );
    }

    const rsvp = await db.rsvp.create({
      data: {
        name: String(name),
        attendance: String(attendance),
        guests: String(guests || "1"),
      },
    });

    return NextResponse.json(
      { success: true, rsvp },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}