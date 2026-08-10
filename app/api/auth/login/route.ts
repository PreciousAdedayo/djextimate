import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin credentials are not configured on the server." },
        { status: 500 }
      );
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      await createSession(email);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
