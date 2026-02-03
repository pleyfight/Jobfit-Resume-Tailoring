"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowUpRight, CreditCard, History, Trash2, LogOut } from "lucide-react";
import { IngestionForm } from "@/components/IngestionForm";
import { JobTargetInput } from "@/components/JobTargetInput";
import { ResumeViewer } from "@/components/ResumeViewer";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface FormData {
  profile: {
    full_name: string;
    date_of_birth: string;
    phone: string;
    email: string;
    linkedin_url: string;
    portfolio_url: string;
    summary_bio: string;
  };
  work_experiences: any[];
  educations: any[];
  skills: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDocuments, setUseDocuments] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const isDemoMode = !isSupabaseConfigured;

  const handleFormDataChange = useCallback((data: FormData) => {
    setFormData(data);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      if (isDemoMode || !supabase) {
        if (!isMounted) return;
        setUserEmail("demo@local");
        setIsAuthChecked(true);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      setUserEmail(session.user.email ?? null);
      setIsAuthChecked(true);
    };

    checkAuth();

    if (!isDemoMode && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) router.replace("/login");
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, [router, isDemoMode]);

  const handleSignOut = async () => {
    if (!isDemoMode && supabase) {
      await supabase.auth.signOut();
      router.replace("/login");
      return;
    }

    router.replace("/login");
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setErrorMessage("Please enter a job description");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      let accessToken: string | undefined;
      if (!isDemoMode && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        accessToken = session?.access_token;

        if (!accessToken) {
          router.replace("/login");
          return;
        }
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          jobDescription,
          useDocuments,
          demoData: formData ? {
            profile: formData.profile,
            work_experiences: formData.work_experiences,
            educations: formData.educations,
            skills: formData.skills,
          } : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to generate resume");
      }

      setGeneratedResume(data.tailoredResume);
    } catch (error) {
      console.error("Error generating resume:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/50">Loading workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-xl">Jobfit</span>
              <span className="ml-2 text-xs uppercase tracking-[0.2em] text-white/40">Studio</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            {userEmail && (
              <span className="hidden text-sm text-white/40 md:inline">{userEmail}</span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-6 pb-16 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Your workspace</p>
                <h1 className="font-serif text-4xl md:text-5xl">
                  Craft your<br />
                  <span className="text-white/40">perfect</span> resume
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/50">
                  {isDemoMode ? "Demo Mode" : "Free Plan"}
                </span>
              </div>
            </div>
          </header>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Demo Mode Notice */}
          {isDemoMode && (
            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/50">
              Demo mode active. Your data won't be saved between sessions.
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column - Input */}
            <section className="lg:col-span-7 space-y-8">
              {/* Profile Section */}
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Step 01</p>
                    <h2 className="font-serif text-2xl">Your story</h2>
                    <p className="text-sm text-white/40 mt-2">Add your experience, skills, and achievements</p>
                  </div>
                </div>
                <IngestionForm
                  onContextTypeChange={setUseDocuments}
                  useDocuments={useDocuments}
                  onFormDataChange={handleFormDataChange}
                />
              </div>

              {/* Projects Section */}
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Optional</p>
                    <h2 className="font-serif text-2xl">Highlight projects</h2>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/20" />
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                  <textarea
                    rows={3}
                    placeholder="Impact, metrics, tools used..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Project link (optional)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                  <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:text-white">
                    + Add project
                  </button>
                </div>
              </div>

              {/* Links Section */}
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Optional</p>
                    <h2 className="font-serif text-2xl">Public profiles</h2>
                  </div>
                </div>
                <div className="grid gap-4">
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="GitHub or portfolio"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Personal website"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Right Column - Generate & Output */}
            <section className="lg:col-span-5 space-y-8">
              {/* Job Description Input */}
              <JobTargetInput
                value={jobDescription}
                onChange={setJobDescription}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              {/* Generated Resume */}
              {generatedResume && <ResumeViewer resume={generatedResume} />}

              {/* History Card */}
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">History</p>
                    <h3 className="font-serif text-xl">Recent resumes</h3>
                  </div>
                  <History className="h-5 w-5 text-white/20" />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-sm text-white/40">No resumes yet</p>
                  <p className="text-xs text-white/20 mt-1">Generate your first one above</p>
                </div>
              </div>

              {/* Usage Card */}
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Usage</p>
                    <h3 className="font-serif text-xl">Your plan</h3>
                  </div>
                  <CreditCard className="h-5 w-5 text-white/20" />
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="uppercase tracking-[0.2em] text-white/40">Credits remaining</span>
                      <span className="text-white">3</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[60%] rounded-full bg-white" />
                    </div>
                  </div>
                  <button className="w-full rounded-full bg-white text-black px-5 py-3 text-sm font-medium transition-all hover:bg-white/90">
                    Upgrade plan
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-red-400/60 mb-2">Danger zone</p>
                    <h3 className="font-serif text-xl text-red-400">Delete account</h3>
                  </div>
                  <Trash2 className="h-5 w-5 text-red-400/40" />
                </div>
                <p className="text-sm text-red-400/60 mb-4">
                  Permanently remove all your data. This cannot be undone.
                </p>
                <button className="rounded-full border border-red-400/30 px-5 py-2 text-sm text-red-400/70 transition-all hover:border-red-400/50 hover:text-red-400">
                  Request deletion
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
