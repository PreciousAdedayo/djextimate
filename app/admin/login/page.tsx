"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Mark } from "@/components/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Invalid credentials.");
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6">
      <form onSubmit={onSubmit} className="card w-full max-w-sm p-8">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Mark size={32} />
          <p className="eyebrow-muted">Admin Login</p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-line bg-raised px-4 py-3.5 text-sm text-bone placeholder:text-stone/60 outline-none focus:border-ember"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-line bg-raised px-4 py-3.5 text-sm text-bone placeholder:text-stone/60 outline-none focus:border-ember"
          />
          <button className="btn-solid w-full justify-center" disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Sign In
          </button>
          {error && <p className="text-center text-sm text-ember">{error}</p>}
        </div>
      </form>
    </main>
  );
}
