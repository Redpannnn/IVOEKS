import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wishes = await db.wish.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const formatted = wishes.map((w) => ({
      name: w.name,
      message: w.message,
      time: w.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    return NextResponse.json({ wishes: formatted });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const wish = await db.wish.create({
      data: {
        name: String(name),
        message: String(message),
      },
    });

    return NextResponse.json(
      {
        success: true,
        wish: {
          name: wish.name,
          message: wish.message,
          time: wish.createdAt.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit wish" },
      { status: 500 }
    );
  }
}