import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function JournalPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-ink min-h-screen">
      <Nav />

      <section className="shell pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="eyebrow mb-5">Stories &middot; Culture &middot; Music</p>
        <h1 className="font-display text-[16vw] leading-[0.85] text-bone sm:text-[9vw] md:text-7xl xl:text-8xl">
          JOURNAL
        </h1>
      </section>

      <section className="shell pb-28">
        {posts.length === 0 ? (
          <div className="card p-10 text-sm text-stone">No articles published yet.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/journal/${p.slug}`}
                className="card group flex flex-col gap-4 p-7 transition-colors duration-300 hover:border-ember/50"
              >
                <div className="relative h-40 overflow-hidden rounded-lg bg-gradient-to-br from-raised to-surface">
                  <div className="absolute inset-0 bg-ember-glow opacity-50 transition-opacity duration-500 group-hover:opacity-90" />
                </div>
                <p className="eyebrow-muted">{p.category} &middot; {p.readTime}</p>
                <h2 className="font-display text-2xl leading-tight text-bone">{p.title}</h2>
                <p className="line-clamp-2 text-sm text-bone/60">{p.excerpt}</p>
                <span className="btn-ghost mt-auto">
                  Read Story <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
