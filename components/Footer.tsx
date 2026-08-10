import Link from "next/link";
import { Instagram, Youtube, Music2, Disc3 } from "lucide-react";
import Logo from "./Logo";

const SOCIALS = [
  { href: "https://www.instagram.com/djextimate/", icon: Instagram, label: "Instagram" },
  { href: "https://www.tiktok.com/", icon: Disc3, label: "TikTok" },
  { href: "https://www.youtube.com/channel/UC2YemYQoWWLnD6nm9esQbTA", icon: Youtube, label: "YouTube" },
  { href: "https://music.apple.com/us/artist/dj-extimate/1749495124", icon: Music2, label: "Apple Music" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="shell py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo animated={false} />
          <p className="mt-5 max-w-xs text-sm text-stone leading-relaxed">
            DJ, producer and curator based in Lagos, Nigeria. Crafting unforgettable
            experiences through music, energy and culture.
          </p>
          <div className="mt-6 flex items-center gap-4">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-bone/60 hover:text-ember transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow-muted mb-4">Explore</p>
          <ul className="space-y-2.5 font-body text-sm text-bone/80">
            <li><Link href="/music" className="hover:text-ember transition-colors">Music</Link></li>
            <li><Link href="/journal" className="hover:text-ember transition-colors">Journal</Link></li>
            <li><Link href="/events" className="hover:text-ember transition-colors">Events</Link></li>
            <li><Link href="/about" className="hover:text-ember transition-colors">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow-muted mb-4">Work together</p>
          <ul className="space-y-2.5 font-body text-sm text-bone/80">
            <li><Link href="/booking" className="hover:text-ember transition-colors">Book Extimate</Link></li>
            <li><a href="mailto:booking@djextimate.com" className="hover:text-ember transition-colors">booking@djextimate.com</a></li>
            <li className="text-stone">Lagos, Nigeria</li>
          </ul>
        </div>
      </div>

      <div className="divider">
        <div className="shell flex flex-col-reverse gap-3 py-6 text-xs text-stone font-mono md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DJ Extimate. All rights reserved.</p>
          <p className="tracking-widest2 uppercase">#DStandard</p>
        </div>
      </div>
    </footer>
  );
}
