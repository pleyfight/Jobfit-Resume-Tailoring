"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, User, ArrowUpRight, CheckCircle, Shield, Zap, FileText } from "lucide-react";
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
            Log in
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <main className="pt-24 px-6 pb-16 md:px-12">
        <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-2 items-center min-h-[calc(100vh-10rem)]">
          {/* Left - Marketing */}
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Start free</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              Build a<br />
              <span className="text-white/40">tailored</span><br />
              resume in minutes
            </h1>
            <p className="text-lg text-white/50 max-w-md">
              Join thousands who craft interview-winning resumes with AI-powered precision.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-4 w-4" />, text: "AI-powered generation" },
                { icon: <Shield className="h-4 w-4" />, text: "Private, secure storage" },
                { icon: <FileText className="h-4 w-4" />, text: "Export to PDF instantly" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Unlimited tailoring" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-white/50">
                  <span className="text-white/30">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-8 md:p-10">
            <div className="mb-8">
              <h2 className="font-serif text-2xl">Create account</h2>
              <p className="mt-2 text-sm text-white/40">Start with free resume credits</p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                {successMessage}
              </div>
            )}
            {isDemoMode && (
              <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/50">
                Supabase not configured. Explore in demo mode instead.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-white/70 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isDemoMode}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors disabled:opacity-50"
                    placeholder="Jordan Lee"
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isDemoMode}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-white/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isDemoMode}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors disabled:opacity-50"
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
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={isDemoMode}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-white/40">
                <input
                  type="checkbox"
                  required
                  disabled={isDemoMode}
                  className="mt-1 rounded border-white/20 bg-white/5"
                />
                I agree to the Terms of Service and Privacy Policy
              </label>

              <button
                type="submit"
                disabled={isSubmitting || isDemoMode}
                className="group w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 text-sm font-medium transition-all hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>

            {isDemoMode && (
              <button
                type="button"
                onClick={handleDemo}
                className="group mt-4 w-full flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
              >
                Continue in demo
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}

            <p className="mt-8 text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
