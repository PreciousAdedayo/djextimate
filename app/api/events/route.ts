import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { eventDate: "asc" } });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.title || !body.eventDate) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const event = await prisma.event.create({
      data: {
        title: body.title,
        venue: body.venue || null,
        location: body.location || null,
        eventDate: new Date(body.eventDate),
        description: body.description || null,
        ticketUrl: body.ticketUrl || null,
        published: !!body.published,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 401 });
  }
}
