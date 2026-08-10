"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Music, CalendarDays, Inbox, LogOut, ExternalLink } from "lucide-react";
import { Mark } from "@/components/Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Journal", icon: FileText },
  { href: "/admin/tracks", label: "Music", icon: Music },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/bookings", label: "Bookings", icon: Inbox },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-full flex-col border-r border-line bg-surface px-6 py-8 lg:sticky lg:top-0 lg:w-64">
      <div className="flex items-center gap-2.5">
        <Mark size={26} animated={false} />
        <span className="font-display text-lg text-bone">EXT!MATE</span>
      </div>
      <p className="eyebrow-muted mt-1">Admin CMS</p>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-wide transition-colors duration-200 ${
                active ? "bg-ember/10 text-ember" : "text-bone/65 hover:bg-raised hover:text-bone"
              }`}
            >
              <Icon size={15} /> {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-line pt-5">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-wide text-bone/65 hover:bg-raised hover:text-bone transition-colors duration-200"
        >
          <ExternalLink size={15} /> View site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-wide text-bone/65 hover:bg-raised hover:text-ember transition-colors duration-200"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}
