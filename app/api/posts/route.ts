import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const slug = slugify(body.slug || body.title);
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt || null,
        content: body.content || "",
        category: body.category || "Music",
        readTime: body.readTime || "5 min read",
        published: !!body.published,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "A post with that slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 401 });
  }
}
