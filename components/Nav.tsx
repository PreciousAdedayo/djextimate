"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/journal", label: "Journal" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="shell flex h-20 items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-[12px] uppercase tracking-widest2 transition-colors duration-300 ${
                  active ? "text-ember" : "text-bone/75 hover:text-bone"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link href="/booking" className="btn-outline">
            Book Extimate
          </Link>
        </div>

        <button
          className="lg:hidden text-bone p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink/97 backdrop-blur-md">
          <div className="shell flex flex-col gap-1 py-6">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-3 font-display text-2xl ${
                  pathname === l.href ? "text-ember" : "text-bone"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-solid mt-4 w-fit">
              Book Extimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
