"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Music,
  CalendarDays,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

import { Mark } from "@/components/Logo";

const LINKS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/posts",
    label: "Journal",
    icon: FileText,
  },
  {
    href: "/admin/tracks",
    label: "Music",
    icon: Music,
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: CalendarDays,
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: Inbox,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface px-6 py-8 lg:sticky lg:top-0 lg:flex">
        <div className="flex items-center gap-2.5">
          <Mark size={26} animated={false} />

          <span className="font-display text-lg text-bone">
            EXT!MATE
          </span>
        </div>

        <p className="eyebrow-muted mt-1">
          Admin CMS
        </p>

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-wide transition-colors duration-200 ${
                  active
                    ? "bg-ember/10 text-ember"
                    : "text-bone/65 hover:bg-raised hover:text-bone"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-1 border-t border-line pt-5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-wide text-bone/65 transition-colors duration-200 hover:bg-raised hover:text-bone"
          >
            <ExternalLink size={15} />
            View site
          </a>

          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[12px] uppercase tracking-wide text-bone/65 transition-colors duration-200 hover:bg-raised hover:text-ember"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-line bg-surface/95 px-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2.5">
          <Mark size={24} animated={false} />

          <div>
            <div className="font-display text-base leading-none text-bone">
              EXT!MATE
            </div>

            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-stone">
              Admin CMS
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-bone transition-colors hover:border-ember hover:text-ember"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />

          <div className="fixed inset-x-0 top-16 z-50 border-b border-line bg-surface px-4 pb-5 pt-3 shadow-2xl lg:hidden">
            <nav className="flex flex-col gap-1">
              {LINKS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className={`flex min-h-12 items-center gap-3 rounded-lg px-4 font-mono text-[12px] uppercase tracking-wide transition-colors ${
                      active
                        ? "bg-ember/10 text-ember"
                        : "text-bone/70 hover:bg-raised hover:text-bone"
                    }`}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-raised px-3 font-mono text-[10px] uppercase tracking-wide text-bone/70"
              >
                <ExternalLink size={14} />
                View site
              </a>

              <button
                type="button"
                onClick={logout}
                className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-raised px-3 font-mono text-[10px] uppercase tracking-wide text-bone/70"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}