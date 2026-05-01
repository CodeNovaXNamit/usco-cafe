"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!enabled) {
      setError("Add Supabase env keys before using admin auth.");
      return;
    }

    setPending(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? "Wrong credentials. Try again quietly.");
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-matcha-mid">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-matcha-light bg-[#fbfaf6] px-4 py-4 outline-none focus:border-matcha-mid"
            placeholder="owner@usco.cafe"
            required
          />
        </label>
        <label className="block">
          <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-matcha-mid">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-matcha-light bg-[#fbfaf6] px-4 py-4 outline-none focus:border-matcha-mid"
            placeholder="••••••••"
            required
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-matcha-mid px-5 py-4 font-sans text-xs uppercase tracking-[0.26em] text-white disabled:opacity-70"
        >
          {pending ? "Entering..." : "Enter"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-[#8e5f54]">
        {error || (enabled ? "Wrong credentials. Try again quietly." : "Supabase auth is not configured in this workspace yet.")}
      </p>
    </>
  );
}
