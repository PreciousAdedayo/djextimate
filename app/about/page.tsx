import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShardDivider from "@/components/ShardDivider";
import { Mark } from "@/components/Logo";

const STATS = [
  { value: "8+", label: "Years Behind the Decks" },
  { value: "120+", label: "Shows Played" },
  { value: "3", label: "Mixtape Volumes" },
  { value: "Lagos", label: "Home Base" },
];

const TIMELINE = [
  {
    year: "2017",
    title: "First residency",
    text: "Started warming up rooms across Lagos, learning to read a crowd one set at a time.",
  },
  {
    year: "2024",
    title: "THIS IS IT VOL. 2",
    text: "A full-length mixtape that pushed the Afro-house and amapiano blend further than before.",
  },
  {
    year: "2025",
    title: "\u201cWhat Is The Extimate\u201d",
    text: "First original single, featuring Idowest \u2014 the record that gave the movement its name.",
  },
  {
    year: "2026",
    title: "#DStandard",
    text: "Building Extimate into more than a DJ name \u2014 a standard for sound, energy and culture.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-ink min-h-screen">
      <Nav />

      <section className="shell grid gap-14 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow mb-5">About Extimate</p>
          <h1 className="font-display text-[13vw] leading-[0.86] text-bone sm:text-6xl md:text-7xl xl:text-8xl">
            MORE THAN
            <br />
            A DJ. <span className="text-ember">A MOVEMENT.</span>
          </h1>
        </div>
        <p className="text-[15px] leading-relaxed text-bone/65">
          DJ Extimate is a Nigerian DJ, producer and curator based in Lagos, building a
          catalog of Afro-house, amapiano and tech-driven sets under the banner
          <span className="text-ember"> #DStandard</span>. From the streets to the stage,
          the goal has never just been to play music &mdash; it&apos;s to build a moment people
          remember.
        </p>
      </section>

      <section className="border-y border-line bg-surface/60">
        <div className="shell grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-ember md:text-5xl">{s.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-stone">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section-pad">
        <p className="eyebrow mb-4">My Story</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <p className="text-[15px] leading-relaxed text-bone/70">
            It started with a single CDJ in a bedroom and a crate of borrowed records.
            Lagos nightlife doesn&apos;t give you a warm-up &mdash; you either learn to read a
            room fast, or you lose it. That's where the craft came from: building a set as
            a story, not a playlist.
          </p>
          <p className="text-[15px] leading-relaxed text-bone/70">
            Today the sound sits at the crossing of Afro-house, amapiano log drums and
            tech beats built for late, loud rooms. Every release and every set carries the
            same standard &mdash; #DStandard &mdash; whether it&apos;s a rooftop at sunset or a club
            till 4am.
          </p>
        </div>
      </section>

      <ShardDivider />

      <section className="shell section-pad">
        <p className="eyebrow mb-10">Timeline</p>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {TIMELINE.map((t) => (
            <div key={t.year} className="grid gap-2 py-7 sm:grid-cols-[110px_1fr] sm:gap-8">
              <span className="font-mono text-sm text-ember">{t.year}</span>
              <div>
                <h3 className="font-display text-2xl leading-tight text-bone">{t.title}</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-bone/60">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ember-sweep">
        <div className="shell relative z-10 flex flex-col items-start gap-6 py-20 md:py-24">
          <Mark size={40} animated={false} />
          <h2 className="max-w-xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
            LET&apos;S BUILD THE NEXT MOMENT.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-widest2 text-bone transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book Extimate <ArrowRight size={13} />
            </Link>
            <a
              href="https://www.instagram.com/djextimate/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/40 px-8 py-4 font-mono text-[12px] uppercase tracking-widest2 text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Instagram size={14} /> @djextimate
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
