"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, User, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isDemoMode = !isSupabaseConfigured;

  useEffect(() => {
    if (isDemoMode || !supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/dashboard");
    });
  }, [router, isDemoMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDemoMode || !supabase) {
      setErrorMessage("Supabase is not configured. Continue in demo mode instead.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    if (!data.session) {
      setSuccessMessage("Account created. Check your email to confirm your address, then log in.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: formData.name,
          email: formData.email,
        } as any);
      }
    } catch (error) {
      console.warn("Failed to upsert profile (non-fatal):", error);
    }

    router.push("/dashboard");
  };

  const handleDemo = () => {
    router.push("/dashboard");
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
              Log in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        <main className="relative z-10 px-6 py-14">
          <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E4D7CA] bg-[#FFFCF7] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#6F6257]">
                Start free
              </div>
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">
                Build a resume for every job description.
              </h1>
              <p className="text-lg text-[#6F6257]">
                Sleek guides you through a premium, empathetic experience that highlights your strengths and gets you interview-ready.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: <CheckCircle className="h-4 w-4 text-[#8B5B2B]" />, text: "Tailored drafts in minutes" },
                  { icon: <Shield className="h-4 w-4 text-[#8B5B2B]" />, text: "Private, secure storage" },
                ].map((item) => (
                  <div key={item.text} className="rounded-2xl border border-[#E4D7CA] bg-[#FFFCF7] p-4 text-sm text-[#1B1712]">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#E4D7CA] bg-[#FFFCF7] p-8 shadow-[0_20px_50px_rgba(20,16,12,0.12)]">
              <div className="mb-6">
                <h2 className="font-serif text-2xl">Create your account</h2>
                <p className="mt-2 text-sm text-[#6F6257]">Start with free resume credits.</p>
              </div>

              {errorMessage && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  {successMessage}
                </div>
              )}
              {isDemoMode && (
                <div className="mb-5 rounded-2xl border border-[#E4D7CA] bg-[#F7F2EA] p-3 text-sm text-[#6F6257]">
                  Supabase is not configured, so sign up is disabled. You can explore in demo mode.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1B1712]">
                    Full Name
                  </label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7B6C]" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isDemoMode}
                      className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                      placeholder="Jordan Lee"
                    />
                  </div>
                </div>
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isDemoMode}
                      className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#1B1712]">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7B6C]" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={isDemoMode}
                      className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                      placeholder=""
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
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      disabled={isDemoMode}
                      className="w-full rounded-2xl border border-[#D9CBBE] bg-[#F7F2EA] py-3 pl-11 pr-4 text-sm text-[#1B1712] focus:border-[#8B5B2B] focus:outline-none focus:ring-2 focus:ring-[#8B5B2B]/20"
                      placeholder=""
                    />
                  </div>
                </div>
                <label className="flex items-start gap-2 text-xs text-[#6F6257]">
                  <input type="checkbox" required disabled={isDemoMode} className="mt-1 rounded border-[#D9CBBE]" />
                  I agree to the Terms of Service and Privacy Policy.
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting || isDemoMode}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B1712] px-6 py-3 text-sm font-semibold text-[#FFFCF7] transition hover:-translate-y-0.5 hover:bg-[#2C241C] disabled:cursor-not-allowed disabled:bg-[#CBB9A9]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFFCF7] border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {isDemoMode && (
                <button
                  type="button"
                  onClick={handleDemo}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#1B1712] px-6 py-3 text-sm font-semibold text-[#1B1712] transition hover:-translate-y-0.5"
                >
                  Continue in demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <p className="mt-6 text-center text-xs text-[#6F6257]">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#8B5B2B] hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
