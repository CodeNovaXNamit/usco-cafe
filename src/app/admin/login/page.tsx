import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLoginPage() {
  const enabled = isSupabaseConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-4">
      <div className="w-full max-w-md rounded-[32px] border border-matcha-light bg-white p-8 shadow-[0_24px_70px_rgba(74,94,56,0.08)]">
        <div className="text-center">
          <div className="font-display text-5xl tracking-[0.08em] text-matcha-deep">USCO</div>
          <p className="mt-3 font-accent text-xs uppercase tracking-[0.38em] text-matcha-mid">
            Admin Login
          </p>
        </div>
        <AdminLoginForm enabled={enabled} />
        <div className="mt-8 text-center">
          <Link href="/admin" className="font-sans text-xs uppercase tracking-[0.24em] text-matcha-deep">
            View dashboard shell
          </Link>
        </div>
      </div>
    </main>
  );
}
