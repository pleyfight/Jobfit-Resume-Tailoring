"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, ArrowUpRight, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-serif text-xl">Jobfit</span>
          </Link>
        </div>
      </nav>

      <main className="pt-24 px-6 pb-16 md:px-12 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-[#111] p-8 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="font-serif text-3xl">Set new password</h1>
              <p className="mt-2 text-sm text-white/40">
                Choose a strong password you can remember.
              </p>
            </div>

            {!isReady ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/50">
                <div className="h-4 w-4 mx-auto animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            ) : isDemoMode ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/50">
                Supabase not configured. Password updates unavailable.
              </div>
            ) : !hasSession ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/50">
                <p>This link is invalid or expired.</p>
                <Link
                  href="/reset-password"
                  className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
                >
                  Send new reset link
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label htmlFor="password" className="block text-sm text-white/70 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-white/70 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 text-sm font-medium transition-all hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Update password
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {!isDemoMode && !hasSession && isReady && (
              <p className="mt-6 text-center text-sm text-white/40">
                Need another link?{" "}
                <Link href="/reset-password" className="text-white hover:underline">
                  Request it here
                </Link>
              </p>
            )}
            {isDemoMode && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
                <CheckCircle className="h-4 w-4 text-white/30" />
                Demo mode enabled
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
