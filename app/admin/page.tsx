import { FileText, Music, CalendarDays, Inbox } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [posts, tracks, events, bookings, newBookings] = await Promise.all([
    prisma.post.count(),
    prisma.track.count(),
    prisma.event.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    { label: "Journal Posts", value: posts, icon: FileText },
    { label: "Tracks", value: tracks, icon: Music },
    { label: "Events", value: events, icon: CalendarDays },
    { label: "Bookings", value: bookings, icon: Inbox },
  ];

  return (
    <AdminShell eyebrow="Overview" title="Good to see you, Extimate.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-6">
            <Icon size={18} className="text-ember" />
            <p className="mt-4 font-display text-4xl text-bone">{value}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-stone">{label}</p>
          </div>
        ))}
      </div>

      {newBookings > 0 && (
        <div className="card mt-6 flex items-center justify-between p-6">
          <p className="text-sm text-bone/80">
            You have <span className="text-ember">{newBookings}</span> new booking request
            {newBookings === 1 ? "" : "s"} waiting for a reply.
          </p>
          <a href="/admin/bookings" className="btn-ghost">
            Review
          </a>
        </div>
      )}

      <p className="mt-10 max-w-lg text-sm leading-relaxed text-stone">
        This dashboard is connected to the live database. Use the sidebar to publish music,
        journal entries and events, or review incoming booking requests.
      </p>
    </AdminShell>
  );
}
