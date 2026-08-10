"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  eventType: string;
  eventDate: string;
  venue: string | null;
  message: string | null;
  status: string;
  createdAt: string;
};

const STATUSES = ["NEW", "CONTACTED", "CONFIRMED", "DECLINED"];

const statusColor: Record<string, string> = {
  NEW: "text-ember",
  CONTACTED: "text-amber",
  CONFIRMED: "text-green-400",
  DECLINED: "text-stone",
};

export default function AdminBookings() {
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/bookings");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    setItems((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <AdminShell eyebrow="Inbox" title="Booking Requests">
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-stone">
          <Loader2 size={14} className="animate-spin" /> Loading&hellip;
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-stone">No booking requests yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((b) => (
            <div key={b.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-bone">{b.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-stone">
                    {b.email} {b.phone ? `· ${b.phone}` : ""}
                  </p>
                </div>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  className={`rounded-full border border-line bg-raised px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 outline-none ${statusColor[b.status] || "text-bone"}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-bone/70">
                <span>{b.eventType}</span>
                <span>{new Date(b.eventDate).toLocaleDateString()}</span>
                {b.venue && <span>{b.venue}</span>}
              </div>

              {b.message && <p className="mt-3 text-sm leading-relaxed text-bone/55">{b.message}</p>}

              <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-stone/70">
                Received {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
