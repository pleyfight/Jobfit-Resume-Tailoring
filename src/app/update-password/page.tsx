"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isDemoMode = !isSupabaseConfigured;

  useEffect(() => {
    if (isDemoMode || !supabase) {
      setIsReady(true);
      setHasSession(false);
      return;
    }

    let isMounted = true;

    const checkSession = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!isMounted) return;
      setHasSession(!!session);
      setIsReady(true);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setHasSession(!!session);
      setIsReady(true);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isDemoMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDemoMode || !supabase) {
      setErrorMessage("Supabase is not configured. Password updates are disabled.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen text-[#1B1712]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#C29B6F]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-[420px] w-[420px] rounded-full bg-[#6E7B6C]/15 blur-3xl" />

        <nav className="relative z-10 border-b border-[#E4D7CA] bg-[#FFFCF7]/80 backdrop-blur">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CBBE] bg-[#FFF9F1]">
                <Sparkles className="h-5 w-5 text-[#8B5B2B]" />
              </div>
              <div>
                <div className="font-serif text-xl font-semibold tracking-tight">Sleek</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#6F6257]">Resume Studio</div>
              </div>
            </Link>
          </div>
        </nav>

        <main className="relative z-10 px-6 py-14">
          <div className="container mx-auto max-w-lg">
            <div className="rounded-3xl border border-[#E4D7CA] bg-[#FFFCF7] p-8 shadow-[0_20px_50px_rgba(20,16,12,0.12)]">
              <div className="mb-6 text-center">
                <h1 className="font-serif text-3xl">Set a new password</h1>
                <p className="mt-2 text-sm text-[#6F6257]">
                  Choose a strong password you can remember.
                </p>
              </div>

              {!isReady ? (
                <div className="rounded-2xl border border-[#E4D7CA] bg-[#F7F2EA] p-4 text-center text-sm text-[#6F6257]">
                  Loading...
                </div>
              ) : isDemoMode ? (
                <div className="rounded-2xl border border-[#E4D7CA] bg-[#F7F2EA] p-4 text-center text-sm text-[#6F6257]">
                  Supabase is not configured, so password updates are unavailable.
                </div>
              ) : !hasSession ? (
                <div className="rounded-2xl border border-[#E4D7CA] bg-[#F7F2EA] p-4 text-center text-sm text-[#6F6257]">
                  This link is invalid or expired. Request a new reset email.
                  <div className="mt-4">
                    <Link
                      href="/reset-password"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B1712] px-5 py-2 text-xs font-semibold text-[#1B1712] transition hover:-translate-y-0.5"
                    >
                      Send new reset link
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  )}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#1B1712]">
                      New Password
                    </label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7B6C]" />
                      <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1B1712]">
                      Confirm Password
                    </label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7B6C]" />
                      <input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B1712] px-6 py-3 text-sm font-semibold text-[#FFFCF7] transition hover:-translate-y-0.5 hover:bg-[#2C241C] disabled:cursor-not-allowed disabled:bg-[#CBB9A9]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFFCF7] border-t-transparent" />
                        Updating...
                      </>
                    ) : (
                      <>
                        Update password
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {!isDemoMode && !hasSession && isReady && (
                <div className="mt-6 text-center text-xs text-[#6F6257]">
                  Need another link?{" "}
                  <Link href="/reset-password" className="font-semibold text-[#8B5B2B] hover:underline">
                    Request it here
                  </Link>
                </div>
              )}
              {isDemoMode && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6F6257]">
                  <CheckCircle className="h-4 w-4 text-[#8B5B2B]" />
                  Demo mode enabled
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
