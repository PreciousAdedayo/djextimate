"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const EVENT_TYPES = ["Club Night", "Private Event", "Festival", "Brand Activation", "Wedding", "Other"];

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3.5 text-sm text-bone placeholder:text-stone/70 outline-none transition-colors duration-300 focus:border-ember";

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-start gap-4 p-10">
        <CheckCircle2 className="text-ember" size={32} />
        <h3 className="font-display text-2xl text-bone">Request sent.</h3>
        <p className="text-sm leading-relaxed text-bone/65">
          Thanks for reaching out &mdash; the request has landed in the inbox. Expect a reply
          within 48 hours with availability and a quote.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-2">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-8 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="eyebrow-muted mb-2 block">Full name</label>
          <input className={inputClass} name="name" required placeholder="Your name" />
        </div>
        <div>
          <label className="eyebrow-muted mb-2 block">Email</label>
          <input className={inputClass} type="email" name="email" required placeholder="you@email.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="eyebrow-muted mb-2 block">Phone (optional)</label>
          <input className={inputClass} name="phone" placeholder="+234..." />
        </div>
        <div>
          <label className="eyebrow-muted mb-2 block">Event type</label>
          <select className={inputClass} name="eventType" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="eyebrow-muted mb-2 block">Event date</label>
          <input className={inputClass} type="date" name="eventDate" required />
        </div>
        <div>
          <label className="eyebrow-muted mb-2 block">Venue / city</label>
          <input className={inputClass} name="venue" placeholder="Venue name, city" />
        </div>
      </div>

      <div>
        <label className="eyebrow-muted mb-2 block">Tell me about the event</label>
        <textarea
          className={inputClass}
          name="message"
          rows={4}
          placeholder="Crowd size, vibe, set length, budget range..."
        />
      </div>

      <button className="btn-solid mt-2 w-fit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Sending
          </>
        ) : (
          "Send Booking Request"
        )}
      </button>

      {status === "error" && (
        <p className="text-sm text-ember">
          Something went wrong sending that &mdash; please try again in a moment.
        </p>
      )}
    </form>
  );
}
