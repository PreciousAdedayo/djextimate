import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) return notFound();

  return (
    <main className="bg-ink min-h-screen">
      <Nav />

      <article className="shell max-w-3xl pt-16 pb-28 md:pt-24">
        <Link href="/journal" className="btn-ghost mb-10 inline-flex">
          <ArrowLeft size={13} /> Journal
        </Link>

        <p className="eyebrow mb-4">{post.category} &middot; {post.readTime}</p>
        <h1 className="font-display text-4xl leading-[0.95] text-bone sm:text-5xl md:text-6xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg leading-relaxed text-bone/60">{post.excerpt}</p>
        )}

        <div className="my-10 h-64 rounded-2xl bg-gradient-to-br from-raised via-surface to-ink" />

        <div className="flex flex-col gap-5">
          {post.content.split("\n").filter(Boolean).map((paragraph, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-bone/75">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
