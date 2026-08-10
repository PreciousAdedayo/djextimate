import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Mark } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-ink">
      <Nav />
      <div className="shell flex flex-1 flex-col items-start justify-center gap-6 py-24">
        <Mark size={40} />
        <p className="eyebrow">404</p>
        <h1 className="font-display text-5xl text-bone sm:text-6xl">
          THIS TRACK DOESN&apos;T EXIST.
        </h1>
        <p className="max-w-md text-sm text-bone/60">
          The page you&apos;re looking for isn&apos;t here. Head back and pick up the set from the top.
        </p>
        <Link href="/" className="btn-solid">
          Back to Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
