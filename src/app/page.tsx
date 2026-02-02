"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder")
);

const TAGLINE = "We highlight your story. Every detail matters.";

const services = [
  {
    title: "Resume Tailoring",
    description: "Map your experience to every job description. We highlight what matters, nothing false.",
  },
  {
    title: "Achievement Extraction",
    description: "Surface the impact you\'ve made. Numbers, outcomes, real results from your history.",
  },
  {
    title: "ATS Optimization",
    description: "Clean formatting that passes screening systems while staying true to your story.",
  },
  {
    title: "Skill Alignment",
    description: "Match your existing skills to the exact tools and keywords each role requires.",
  },
  {
    title: "Professional Export",
    description: "Download polished PDFs ready to send. Your resume, your way.",
  },
  {
    title: "Version Management",
    description: "Keep every tailored version organized. Track what you sent where.",
  },
];

const caseStudies = [
  {
    title: "From Career Change to Offer",
    role: "Product Manager",
    location: "NYC, USA",
    highlight: "3 applications → 2 interviews → 1 offer",
  },
  {
    title: "Return to Work Success",
    role: "Software Engineer",
    location: "SF, USA",
    highlight: "Layoff recovery in 4 weeks",
  },
  {
    title: "Industry Pivot",
    role: "Marketing Lead",
    location: "Austin, USA",
    highlight: "New field, same impact story",
  },
  {
    title: "Entry Level Breakthrough",
    role: "Designer",
    location: "London, UK",
    highlight: "First role with polished resume",
  },
];

const AnimatedCircles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let time = 0;

    const circles = [
      { radius: 80, offsetX: 0.3, offsetY: 0.3, speed: 0.002, opacity: 0.15 },
      { radius: 120, offsetX: 0.7, offsetY: 0.4, speed: 0.0015, opacity: 0.1 },
      { radius: 60, offsetX: 0.5, offsetY: 0.7, speed: 0.0025, opacity: 0.12 },
    ];

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2D2D2D";

      circles.forEach((circle) => {
        const x =
          canvas.width * circle.offsetX +
          Math.sin(time * circle.speed) * circle.radius * 0.5;
        const y =
          canvas.height * circle.offsetY +
          Math.cos(time * circle.speed * 0.7) * circle.radius * 0.3;

        ctx.globalAlpha = circle.opacity;
        ctx.beginPath();
        ctx.arc(x, y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const startHref = isSupabaseConfigured ? "/signup" : "/dashboard";
  const startLabel = isSupabaseConfigured ? "Get started" : "Start demo";

  return (
    <div className="min-h-screen bg-[#F7F5F3] text-[#2D2D2D]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-[#F7F5F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4 md:px-12">
          <div className="text-2xl font-semibold tracking-tight">Jobfit</div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-12 text-sm md:flex">
            <a href="#what-we-do" className="hover:text-[#6B6B6B] transition">
              What we do
            </a>
            <a href="#results" className="hover:text-[#6B6B6B] transition">
              Results
            </a>
            <a href="#process" className="hover:text-[#6B6B6B] transition">
              Process
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E5E5E5] bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a href="#what-we-do" className="hover:text-[#6B6B6B]">
                What we do
              </a>
              <a href="#results" className="hover:text-[#6B6B6B]">
                Results
              </a>
              <a href="#process" className="hover:text-[#6B6B6B]">
                Process
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
        <div className="pointer-events-none absolute inset-0">
          <AnimatedCircles />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="font-serif text-5xl leading-tight md:text-7xl lg:text-8xl">
              {TAGLINE}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-[#6B6B6B] md:text-xl">
              Jobfit helps professionals tailor their resume to match every job they want. We don't fabricate. We highlight what's real.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:gap-4">
              <Link
                href={startHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2D2D2D] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
              >
                {startLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D1D1] bg-white px-8 py-3 text-sm font-semibold text-[#2D2D2D] transition hover:bg-[#F7F5F3]"
              >
                View demo
              </Link>
            </div>
            {!isSupabaseConfigured && (
              <p className="text-xs text-[#6B6B6B]">Demo mode active. No sign-up required.</p>
            )}
          </div>
        </div>
      </section>

      {/* Repeating Tagline */}
      <section className="border-y border-[#E5E5E5] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="font-serif text-3xl md:text-5xl text-center">{TAGLINE}</p>
        </div>
      </section>

      {/* What We Do - Services */}
      <section id="what-we-do" className="px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24">
            <p className="text-xs uppercase tracking-[0.35em] text-[#6B6B6B] mb-4">Services</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">What we do for you</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="rounded-lg border border-[#E5E5E5] bg-white p-6 hover:shadow-md transition"
              >
                <div className="text-sm font-semibold text-[#6B6B6B]">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-[#6B6B6B]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repeating Tagline */}
      <section className="border-y border-[#E5E5E5] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="font-serif text-3xl md:text-5xl text-center">{TAGLINE}</p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="results" className="px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24">
            <p className="text-xs uppercase tracking-[0.35em] text-[#6B6B6B] mb-4">Results</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">Resumes that work</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((study, i) => (
              <Link
                key={i}
                href="#"
                className="group rounded-lg border border-[#E5E5E5] bg-white p-6 hover:shadow-lg transition"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B6B6B] mb-2">Case Study</p>
                <h3 className="font-semibold mb-4 group-hover:text-[#6B6B6B] transition">
                  {study.title}
                </h3>
                <div className="space-y-2 text-sm text-[#6B6B6B]">
                  <p>{study.role}</p>
                  <p className="text-xs uppercase tracking-[0.2em]">{study.location}</p>
                  <p className="pt-2 font-semibold text-[#2D2D2D]">{study.highlight}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Repeating Tagline */}
      <section className="border-y border-[#E5E5E5] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="font-serif text-3xl md:text-5xl text-center">{TAGLINE}</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24">
            <p className="text-xs uppercase tracking-[0.35em] text-[#6B6B6B] mb-4">Process</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">How it works</h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Add your history",
                desc: "Upload your resume or enter your work, education, and skills.",
              },
              {
                step: "2",
                title: "Paste the job",
                desc: "Share the job description. We analyze what they're looking for.",
              },
              {
                step: "3",
                title: "Get tailored",
                desc: "See your achievements matched to their needs. Download and send.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="text-sm font-semibold text-[#6B6B6B]">Step {item.step}</div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-[#6B6B6B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repeating Tagline */}
      <section className="border-y border-[#E5E5E5] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="font-serif text-3xl md:text-5xl text-center">{TAGLINE}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
              Ready to highlight your best?
            </h2>
            <p className="text-lg text-[#6B6B6B]">
              Let's get your resume tailored to the role you want.
            </p>
            <Link
              href={startHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2D2D2D] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
            >
              {startLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Repeating Tagline */}
      <section className="border-y border-[#E5E5E5] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="font-serif text-3xl md:text-5xl text-center">{TAGLINE}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3 md:gap-24">
            <div>
              <div className="text-2xl font-semibold">Jobfit</div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
                Resume Tailoring
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-4">Tell us about your career goals.</p>
              <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#6B6B6B]">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3 text-sm text-[#6B6B6B]">
              <Link href="#" className="block hover:text-[#2D2D2D]">
                Privacy
              </Link>
              <Link href="#" className="block hover:text-[#2D2D2D]">
                Terms
              </Link>
              <Link href="#" className="block hover:text-[#2D2D2D]">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-12 border-t border-[#E5E5E5] pt-8 text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
            © 2026 Jobfit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
