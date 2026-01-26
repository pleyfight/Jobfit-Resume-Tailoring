"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDemoMode = !isSupabaseConfigured;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDemoMode || !supabase) {
      setErrorMessage("Supabase is not configured. Password reset is unavailable.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const redirectTo = `${window.location.origin}/update-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen text-[#1B1712]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#C29B6F]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-[420px] w-[420px] rounded-full bg-[#6E7B6C]/15 blur-3xl" />

        <nav className="relative z-10 border-b border-[#E4D7CA] bg-[#FFFCF7]/80 backdrop-blur">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CBBE] bg-[#FFF9F1]">
                <Sparkles className="h-5 w-5 text-[#8B5B2B]" />
              </div>
              <div>
                <div className="font-serif text-xl font-semibold tracking-tight">Sleek</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#6F6257]">Resume Studio</div>
              </div>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[#1B1712] px-5 py-2 text-sm font-semibold text-[#1B1712] transition hover:-translate-y-0.5"
            >
              Back to login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        <main className="relative z-10 px-6 py-14">
          <div className="container mx-auto max-w-lg">
            {!submitted ? (
              <div className="rounded-3xl border border-[#E4D7CA] bg-[#FFFCF7] p-8 shadow-[0_20px_50px_rgba(20,16,12,0.12)]">
                <div className="mb-6">
                  <h1 className="font-serif text-3xl">Reset your password</h1>
                  <p className="mt-2 text-sm text-[#6F6257]">
                    Enter your email and we will send a reset link.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}
                {isDemoMode && (
                  <div className="mb-5 rounded-2xl border border-[#E4D7CA] bg-[#F7F2EA] p-3 text-sm text-[#6F6257]">
                    Supabase is not configured, so password reset is disabled.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1B1712]">
                      Email Address
                    </label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7B6C]" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isDemoMode}
                        className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isDemoMode}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B1712] px-6 py-3 text-sm font-semibold text-[#FFFCF7] transition hover:-translate-y-0.5 hover:bg-[#2C241C] disabled:cursor-not-allowed disabled:bg-[#CBB9A9]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFFCF7] border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send reset link
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-3xl border border-[#E4D7CA] bg-[#FFFCF7] p-8 text-center shadow-[0_20px_50px_rgba(20,16,12,0.12)]">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F2EA]">
                  <CheckCircle className="h-8 w-8 text-[#8B5B2B]" />
                </div>
                <h1 className="font-serif text-3xl">Check your email</h1>
                <p className="mt-3 text-sm text-[#6F6257]">
                  We sent a password reset link to <strong>{email}</strong>.
                </p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#1B1712] px-6 py-3 text-sm font-semibold text-[#1B1712] transition hover:-translate-y-0.5"
                >
                  Back to login
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
