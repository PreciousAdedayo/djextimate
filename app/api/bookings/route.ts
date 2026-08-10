import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.eventType || !body.eventDate) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const eventDate = new Date(body.eventDate);
    if (Number.isNaN(eventDate.getTime())) {
      return NextResponse.json({ error: "Invalid event date." }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        name: String(body.name),
        email: String(body.email),
        phone: body.phone || null,
        eventType: String(body.eventType),
        eventDate,
        venue: body.venue || null,
        message: body.message || null,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
