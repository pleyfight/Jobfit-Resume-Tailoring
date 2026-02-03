"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowUpRight, CheckCircle } from "lucide-react";
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
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full border border-white px-6 py-2 text-sm font-medium transition-all hover:bg-white hover:text-black"
          >
            Back to login
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <main className="pt-24 px-6 pb-16 md:px-12 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {!submitted ? (
            <div className="rounded-2xl border border-white/10 bg-[#111] p-8 md:p-10">
              <div className="mb-8">
                <h1 className="font-serif text-3xl">Reset password</h1>
                <p className="mt-2 text-sm text-white/40">
                  Enter your email and we'll send a reset link.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {errorMessage}
                </div>
              )}
              {isDemoMode && (
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/50">
                  Supabase not configured. Password reset unavailable.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm text-white/70 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isDemoMode}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors disabled:opacity-50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isDemoMode}
                  className="group w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 text-sm font-medium transition-all hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send reset link
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111] p-8 md:p-10 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h1 className="font-serif text-3xl">Check your email</h1>
              <p className="mt-3 text-sm text-white/50">
                We sent a password reset link to <strong className="text-white">{email}</strong>.
              </p>
              <Link
                href="/login"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
              >
                Back to login
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
