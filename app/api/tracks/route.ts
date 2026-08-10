import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const tracks = await prisma.track.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(tracks);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const track = await prisma.track.create({
      data: {
        title: body.title,
        artist: body.artist || "DJ Extimate",
        featuredArtist: body.featuredArtist || null,
        duration: body.duration || null,
        audioUrl: body.audioUrl || null,
        spotify: body.spotify || null,
        appleMusic: body.appleMusic || null,
        audiomack: body.audiomack || null,
        youtube: body.youtube || null,
        published: !!body.published,
      },
    });
    return NextResponse.json(track, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 401 });
  }
}
