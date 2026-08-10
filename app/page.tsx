import Link from "next/link";
import { ArrowRight, ArrowDown, Play, Instagram } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import HeroGraphic from "@/components/HeroGraphic";
import ShardDivider from "@/components/ShardDivider";
import Waveform from "@/components/Waveform";
import { prisma } from "@/lib/prisma";
import { formatDay } from "@/lib/utils";

export const revalidate = 60;

export default async function Home() {
  const [track, posts, event] = await Promise.all([
    prisma.track.findFirst({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.event.findFirst({
      where: { published: true, eventDate: { gte: new Date() } },
      orderBy: { eventDate: "asc" },
    }),
  ]);

  return (
    <main>
      <Nav />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-ink">
        <HeroGraphic />
        <div className="shell relative z-10 flex min-h-[86svh] flex-col justify-center py-24 md:py-28">
          <p className="eyebrow mb-6 animate-fadeUp">DJ &middot; Producer &middot; Curator</p>

          <h1
            className="max-w-4xl font-display text-[15vw] leading-[0.88] text-bone sm:text-[9vw] md:text-[7.2vw] xl:text-[100px] animate-fadeUp"
            style={{ animationDelay: "0.08s" }}
          >
            THE SOUND
            <br />
            BEYOND <span className="text-ember">THE SET.</span>
          </h1>

          <p
            className="mt-7 max-w-md text-[15px] leading-relaxed text-bone/70 animate-fadeUp"
            style={{ animationDelay: "0.16s" }}
          >
            Crafting unforgettable experiences through music, energy and culture &mdash;
            Afro-house, amapiano and tech beats, built for the room in front of me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fadeUp" style={{ animationDelay: "0.24s" }}>
            <Link href="/music" className="btn-solid">
              Listen Now <Play size={13} fill="currentColor" />
            </Link>
            <Link href="/booking" className="btn-outline">
              Book Extimate
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stone animate-fadeUp" style={{ animationDelay: "0.32s" }}>
            <ArrowDown size={13} className="animate-floatSlow" />
            Scroll to explore
          </div>
        </div>
      </section>

      {/* ---------- STICKY PLAYER ---------- */}
      <MusicPlayer
        title={track?.title ?? "WHAT IS THE EXTIMATE"}
        artist={track?.featuredArtist ? `DJ Extimate feat. ${track.featuredArtist}` : "DJ Extimate"}
        audioUrl={track?.audioUrl}
        duration={track?.duration ?? "03:42"}
      />

      {/* ---------- LATEST RELEASE + JOURNAL ---------- */}
      <section className="section-pad bg-ink">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Latest release */}
          <div className="flex flex-col gap-7">
            <p className="eyebrow">Latest Release</p>
            <div className="flex gap-6">
              <div className="relative grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-xl bg-ember-sweep shadow-[0_20px_50px_-15px_rgba(255,90,31,0.5)] sm:h-36 sm:w-36">
                <span className="px-3 text-center font-display text-lg leading-none text-ink sm:text-2xl">
                  {(track?.title ?? "WHAT IS THE EXTIMATE").split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
              <div className="flex min-w-0 flex-col justify-center gap-3">
                <h2 className="font-display text-3xl leading-[0.95] text-bone sm:text-4xl">
                  {track?.title ?? "WHAT IS THE EXTIMATE"}
                </h2>
                {track?.featuredArtist && (
                  <p className="font-mono text-xs uppercase tracking-widest2 text-ember">
                    feat. {track.featuredArtist}
                  </p>
                )}
                <Waveform bars={28} color="#FF5A1F" className="opacity-80" />
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wide text-stone">
              {["Spotify", "Apple Music", "Audiomack", "YouTube"].map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <Link href="/music" className="btn-outline w-fit">
              Play Now <Play size={12} fill="currentColor" />
            </Link>
          </div>

          {/* Journal teaser */}
          <div>
            <p className="eyebrow mb-6">From the Journal</p>
            {posts.length ? (
              <Link
                href={`/journal/${posts[0].slug}`}
                className="card group relative flex min-h-[280px] flex-col justify-end overflow-hidden p-8 transition-colors duration-300 hover:border-ember/50"
              >
                <div className="absolute inset-0 bg-ember-glow opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <p className="eyebrow mb-3">{posts[0].category} &middot; {posts[0].readTime}</p>
                  <h3 className="max-w-md font-display text-2xl leading-tight text-bone sm:text-3xl">
                    {posts[0].title}
                  </h3>
                  <span className="btn-ghost mt-5">
                    Read Story <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ) : (
              <div className="card p-8 text-sm text-stone">Publish your first article from admin.</div>
            )}

            {posts.length > 1 && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {posts.slice(1, 3).map((p) => (
                  <Link
                    key={p.id}
                    href={`/journal/${p.slug}`}
                    className="card p-6 transition-colors duration-300 hover:border-ember/50"
                  >
                    <p className="eyebrow-muted mb-2">{p.category} &middot; {p.readTime}</p>
                    <h4 className="font-display text-lg leading-tight text-bone">{p.title}</h4>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ShardDivider />

      {/* ---------- EVENT + ABOUT + GRAM ---------- */}
      <section className="section-pad bg-ink">
        <div className="shell grid gap-8 lg:grid-cols-3">
          {/* Upcoming event */}
          <div className="card flex flex-col gap-6 p-8">
            <p className="eyebrow">Upcoming Event</p>
            {event ? (
              <>
                <div className="flex items-start gap-4">
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-lg border border-line py-2">
                    <b className="font-mono text-[11px] uppercase tracking-widest2 text-ember">
                      {formatDay(event.eventDate).month}
                    </b>
                    <strong className="font-display text-3xl leading-none text-bone">
                      {formatDay(event.eventDate).day}
                    </strong>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-stone">
                      {event.location}
                    </p>
                    <h3 className="font-display text-2xl leading-tight text-bone">{event.title}</h3>
                    <p className="text-sm text-bone/60">{event.venue}</p>
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest2 text-stone">
                  {formatDay(event.eventDate).time} &middot; Till late
                </p>
              </>
            ) : (
              <p className="text-sm text-stone">No upcoming event announced yet.</p>
            )}
            <Link href="/events" className="btn-ghost mt-auto">
              View All Events <ArrowRight size={13} />
            </Link>
          </div>

          {/* About teaser */}
          <div className="card flex flex-col gap-5 p-8">
            <p className="eyebrow">About Extimate</p>
            <h2 className="font-display text-3xl leading-[0.95] text-bone">
              MORE THAN A DJ.
              <br />
              A MOVEMENT.
            </h2>
            <p className="text-sm leading-relaxed text-bone/65">
              From the streets to the stage, Extimate represents the new wave of sound,
              energy and culture &mdash; #DStandard.
            </p>
            <Link href="/about" className="btn-ghost mt-auto">
              Read My Story <ArrowRight size={13} />
            </Link>
          </div>

          {/* Instagram */}
          <div className="card flex flex-col gap-5 p-8">
            <p className="eyebrow">From the Gram</p>
            <h3 className="font-display text-2xl text-bone">@djextimate</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-gradient-to-br from-raised to-surface transition-transform duration-300 hover:scale-95"
                  style={{
                    backgroundImage:
                      i % 2 === 0
                        ? "radial-gradient(circle at 30% 30%, rgba(255,90,31,0.35), transparent 70%)"
                        : "radial-gradient(circle at 70% 70%, rgba(255,178,91,0.25), transparent 70%)",
                  }}
                />
              ))}
            </div>
            <a
              href="https://www.instagram.com/djextimate/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-auto"
            >
              Follow the Journey <Instagram size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- BOOKING BANNER ---------- */}
      <section className="relative overflow-hidden bg-ember-sweep">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-40" />
        <div className="shell relative z-10 flex flex-col items-start gap-6 py-20 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/70">Bookings</p>
          <h2 className="max-w-2xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl md:text-6xl">
            BRING THE EXTIMATE
            <br />
            EXPERIENCE TO YOUR EVENT.
          </h2>
          <p className="max-w-md text-sm text-ink/70">
            Clubs, festivals, private events, brand activations &amp; more.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-widest2 text-bone transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book Extimate <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
