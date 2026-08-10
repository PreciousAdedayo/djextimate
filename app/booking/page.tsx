import { Mail, MapPin, Clock } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

const DETAILS = [
  { icon: Clock, label: "Response time", value: "Within 48 hours" },
  { icon: MapPin, label: "Based in", value: "Lagos, Nigeria \u2014 available to travel" },
  { icon: Mail, label: "Direct email", value: "booking@djextimate.com" },
];

export default function BookingPage() {
  return (
    <main className="bg-ink min-h-screen">
      <Nav />

      <section className="shell grid gap-14 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-5">Bookings</p>
          <h1 className="font-display text-[13vw] leading-[0.86] text-bone sm:text-6xl md:text-7xl">
            BOOK
            <br />
            EXTIMATE.
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bone/65">
            Clubs, festivals, private events and brand activations. Tell me about your
            event and I&apos;ll get back with availability and a quote.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {DETAILS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ember">
                  <Icon size={15} />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-stone">{label}</p>
                  <p className="text-sm text-bone/85">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BookingForm />
      </section>

      <Footer />
    </main>
  );
}
