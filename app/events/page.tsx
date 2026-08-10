import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { formatDay } from "@/lib/utils";

export const revalidate = 60;

export default async function EventsPage() {
  const now = new Date();
  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({
      where: { published: true, eventDate: { gte: now } },
      orderBy: { eventDate: "asc" },
    }),
    prisma.event.findMany({
      where: { published: true, eventDate: { lt: now } },
      orderBy: { eventDate: "desc" },
      take: 6,
    }),
  ]);

  return (
    <main className="bg-ink min-h-screen">
      <Nav />

      <section className="shell pt-16 pb-10 md:pt-24 md:pb-14">
        <p className="eyebrow mb-5">Where to find me</p>
        <h1 className="font-display text-[16vw] leading-[0.85] text-bone sm:text-[9vw] md:text-7xl xl:text-8xl">
          EVENTS
        </h1>
      </section>

      <section className="shell pb-20">
        <p className="eyebrow-muted mb-6">Upcoming</p>
        {upcoming.length === 0 ? (
          <div className="card p-10 text-sm text-stone">No upcoming events announced right now &mdash; check back soon.</div>
        ) : (
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {upcoming.map((e) => {
              const d = formatDay(e.eventDate);
              return (
                <div
                  key={e.id}
                  className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-8"
                >
                  <div className="flex w-20 shrink-0 flex-col items-center rounded-xl border border-line py-3">
                    <b className="font-mono text-[11px] uppercase tracking-widest2 text-ember">{d.month}</b>
                    <strong className="font-display text-4xl leading-none text-bone">{d.day}</strong>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-3xl leading-tight text-bone">{e.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-stone">
                      {e.venue && <span>{e.venue}</span>}
                      {e.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {e.location}
                        </span>
                      )}
                      <span>{d.time} &middot; till late</span>
                    </div>
                    {e.description && (
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/60">{e.description}</p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-3">
                    {e.ticketUrl ? (
                      <a href={e.ticketUrl} target="_blank" rel="noreferrer" className="btn-solid">
                        Tickets <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <Link href="/booking" className="btn-outline">
                        Guest List
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="shell pb-24">
          <p className="eyebrow-muted mb-6">Past</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => {
              const d = formatDay(e.eventDate);
              return (
                <div key={e.id} className="card p-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-stone">
                    {d.month} {d.day} &middot; {e.eventDate.getFullYear()}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-tight text-bone/80">{e.title}</h3>
                  <p className="mt-1 text-xs text-stone">{e.venue}{e.venue && e.location ? ", " : ""}{e.location}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-surface">
        <div className="shell flex flex-col items-start gap-6 py-20 md:py-24">
          <p className="eyebrow">Bookings</p>
          <h2 className="max-w-xl font-display text-3xl leading-[0.95] text-bone sm:text-4xl">
            PLANNING SOMETHING? LET&apos;S TALK.
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
