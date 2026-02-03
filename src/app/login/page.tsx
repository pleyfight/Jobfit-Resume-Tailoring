'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, ArrowUpRight, Shield, Clock, CheckCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDemoMode = !isSupabaseConfigured;
  const startHref = isDemoMode ? "/dashboard" : "/signup";
  const startLabel = isDemoMode ? "Try demo" : "Sign up";

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

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
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
            href={startHref}
            className="flex items-center gap-2 rounded-full border border-white px-6 py-2 text-sm font-medium transition-all hover:bg-white hover:text-black"
          >
            {startLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <main className="pt-24 px-6 pb-16 md:px-12">
        <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-2 items-center min-h-[calc(100vh-10rem)]">
          {/* Left - Marketing */}
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Welcome back</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              Your next<br />
              <span className="text-white/40">tailored</span><br />
              resume awaits
            </h1>
            <p className="text-lg text-white/50 max-w-md">
              Log in to continue refining your story and stay ready for every opportunity.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: <CheckCircle className="h-4 w-4" />, text: "Private, secure storage" },
                { icon: <Shield className="h-4 w-4" />, text: "Enterprise-grade security" },
                { icon: <Clock className="h-4 w-4" />, text: "Resume history on demand" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Instant PDF exports" },
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
              <h2 className="font-serif text-2xl">Log in</h2>
              <p className="mt-2 text-sm text-white/40">Enter your credentials to continue</p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            {isDemoMode && (
              <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/50">
                Supabase not configured. Explore in demo mode instead.
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isDemoMode}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label htmlFor="password" className="text-white/70">Password</label>
                  <Link href="/reset-password" className="text-white/40 hover:text-white transition-colors">
                    Forgot?
                  </Link>
                </div>
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

              <label className="flex items-center gap-2 text-sm text-white/40">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  disabled={isDemoMode}
                  className="rounded border-white/20 bg-white/5"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={isSubmitting || isDemoMode}
                className="group w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 text-sm font-medium transition-all hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log in
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

            <div className="my-8 flex items-center gap-4 text-xs text-white/30">
              <div className="h-px flex-1 bg-white/10" />
              or continue with
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {['Google', 'Apple', 'LinkedIn'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setErrorMessage("OAuth requires Supabase configuration.")}
                  disabled={isDemoMode}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition-all hover:bg-white/10 disabled:opacity-50"
                >
                  {provider}
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-white/40">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
