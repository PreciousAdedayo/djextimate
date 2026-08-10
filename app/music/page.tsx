import Link from "next/link";
import { Play, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Waveform from "@/components/Waveform";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const PLATFORM_FIELDS = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "audiomack", label: "Audiomack" },
  { key: "youtube", label: "YouTube" },
] as const;

export default async function MusicPage() {
  const tracks = await prisma.track.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-ink min-h-screen">
      <Nav />

      <section className="shell pt-16 pb-10 md:pt-24 md:pb-14">
        <p className="eyebrow mb-5">Discography</p>
        <h1 className="font-display text-[16vw] leading-[0.85] text-bone sm:text-[9vw] md:text-7xl xl:text-8xl">
          MUSIC
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-bone/60">
          Original releases and mixtapes &mdash; from club-ready Afro-house cuts to
          full-length sets recorded live.
        </p>
      </section>

      <section className="shell pb-24 md:pb-32">
        {tracks.length === 0 ? (
          <div className="card p-10 text-sm text-stone">
            No tracks published yet. Add one from the admin panel.
          </div>
        ) : (
          <div className="divide-y divide-line border-y border-line">
            {tracks.map((t, i) => (
              <div
                key={t.id}
                className="group flex flex-col gap-4 py-7 transition-colors duration-300 hover:bg-surface/60 sm:flex-row sm:items-center sm:gap-8 sm:px-4"
              >
                <span className="font-mono text-xs text-stone sm:w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-ember-sweep">
                  <Play size={16} className="text-ink" fill="currentColor" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-2xl leading-tight text-bone sm:text-3xl">
                    {t.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-stone">
                    {t.artist}
                    {t.featuredArtist ? ` feat. ${t.featuredArtist}` : ""}
                  </p>
                </div>

                <Waveform bars={20} color="#FF5A1F" className="hidden opacity-0 transition-opacity duration-300 group-hover:opacity-70 md:flex" />

                <span className="font-mono text-xs tabular-nums text-stone sm:w-14 sm:text-right">
                  {t.duration ?? "--:--"}
                </span>

                <div className="flex flex-wrap gap-4">
                  {PLATFORM_FIELDS.map(({ key, label }) => {
                    const url = (t as any)[key] as string | null;
                    if (!url) return null;
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost !text-[10px]"
                      >
                        {label} <ArrowUpRight size={11} />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-surface">
        <div className="shell flex flex-col items-start gap-6 py-20 md:py-24">
          <p className="eyebrow">Bookings</p>
          <h2 className="max-w-xl font-display text-3xl leading-[0.95] text-bone sm:text-4xl">
            WANT THIS SOUND IN YOUR ROOM?
          </h2>
          <Link href="/booking" className="btn-solid">
            Book Extimate
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
