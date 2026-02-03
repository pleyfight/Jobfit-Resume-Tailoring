"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X, ArrowLeft, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";

const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder")
);

const services = [
  {
    id: "01",
    category: "TAILORING",
    title: "Resume Tailoring",
    items: ["Job Description Analysis", "Keyword Optimization", "ATS Compatibility", "Achievement Highlighting"],
  },
  {
    id: "02",
    category: "EXTRACTION",
    title: "Smart Extraction",
    items: ["Impact Metrics", "Quantifiable Results", "Skill Mapping", "Experience Translation"],
  },
  {
    id: "03",
    category: "EXPORT",
    title: "Professional Export",
    items: ["Multiple Formats", "Clean Typography", "Version Control", "Instant Download"],
  },
];

const results = [
  {
    title: "Career Changer",
    subtitle: "Product Manager",
    location: "New York, USA",
    stat: "3→2→1",
    statLabel: "apps→interviews→offer",
  },
  {
    title: "Return to Work",
    subtitle: "Software Engineer",
    location: "San Francisco, USA",
    stat: "4 weeks",
    statLabel: "to new role",
  },
  {
    title: "Industry Pivot",
    subtitle: "Marketing Lead",
    location: "Austin, USA",
    stat: "100%",
    statLabel: "skill transfer",
  },
  {
    title: "First Job",
    subtitle: "Product Designer",
    location: "London, UK",
    stat: "5 offers",
    statLabel: "in 3 weeks",
  },
];

const MarqueeText = () => {
  const text = "You bring you. We tailor your story • Maximizing opportunity • ";
  return (
    <div className="overflow-hidden border-y border-[#222] py-6 bg-[#0a0a0a]">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4 font-serif text-4xl md:text-6xl lg:text-7xl text-white/90">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const startHref = isSupabaseConfigured ? "/signup" : "/dashboard";
  const startLabel = isSupabaseConfigured ? "Start now" : "Try demo";

  const navItems = [
    { label: "Studio", href: "#", active: true },
    { label: "Services", href: "#services", active: false },
    { label: "Works", href: "#results", active: false },
    { label: "Contact", href: "#contact", active: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section with New Design */}
      <section className="relative min-h-screen bg-[#2B2F31]">
        {/* Header - Absolute positioned */}
        <header className="absolute top-0 left-0 right-0 z-50 px-[88px] py-[42px] max-md:px-6 max-md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-[42px] h-[42px] rounded-full border border-white/20 flex items-center justify-center">
                <span className="font-serif text-xl text-white">J</span>
              </div>
            </Link>

            {/* Desktop Nav - Right aligned */}
            <nav className="hidden md:flex items-center gap-[44px]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-[14px] font-semibold tracking-[0.01em] text-white hover:text-white/80 transition-colors flex items-center gap-2"
                >
                  {item.active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 py-6 border-t border-white/10">
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-white/70 hover:text-white text-lg flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero Content */}
        <div className="relative min-h-screen flex flex-col">
          {/* Main Headline - Centered */}
          <div className="flex-1 flex items-center justify-center px-6 pt-[160px] pb-[300px] md:pb-[350px]">
            <h1 
              className="hero-headline font-sans text-[42px] sm:text-[72px] md:text-[90px] lg:text-[120px] font-extrabold leading-[0.92] tracking-[-0.02em] text-white text-center max-w-[1250px]"
            >
              You bring you,<br />
              we tailor your story.
            </h1>
          </div>

          {/* Carousel Row - Above media card */}
          <div className="absolute left-0 right-0 bottom-[280px] md:bottom-[300px] px-[88px] max-md:px-6">
            <div className="flex items-center justify-between h-[64px]">
              {/* Pagination Dots - Left */}
              <div className="flex items-center gap-[14px]">
                <button 
                  onClick={() => setActiveSlide(0)}
                  className={`w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all ${
                    activeSlide === 0 ? 'bg-white/10' : ''
                  }`}
                >
                  {activeSlide === 0 && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
                <button 
                  onClick={() => setActiveSlide(1)}
                  className={`w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all ${
                    activeSlide === 1 ? 'bg-white/10' : ''
                  }`}
                >
                  {activeSlide === 1 && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
              </div>

              {/* Center Meta */}
              <div className="hidden md:flex items-center gap-[34px]">
                <span className="text-[14px] font-bold tracking-[0.08em] uppercase text-white">
                  JOBFIT
                </span>
                <span className="text-[14px] font-medium tracking-[0.01em] text-white/70">
                  AI-Powered Resume Tailoring
                </span>
              </div>

              {/* CTA Link - Right */}
              <a 
                href="#results" 
                className="text-[14px] font-medium italic text-white hover:text-white/80 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Our Results
              </a>
            </div>
          </div>

          {/* Footer Bar - White */}
          <div className="absolute left-0 right-0 bottom-0 h-[140px] md:h-[180px] bg-white">
            <div className="h-full px-[88px] max-md:px-6 flex items-center justify-end gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-[18px]">
                <a href="#" className="text-[#0B0C0D] hover:text-[#0B0C0D]/70 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#0B0C0D] hover:text-[#0B0C0D]/70 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#0B0C0D] hover:text-[#0B0C0D]/70 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>

              {/* Circle Button */}
              <button 
                onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
                className="w-[52px] h-[52px] rounded-full border-2 border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-[#0B0C0D]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About/Manifesto Section */}
      <section id="about" className="bg-white text-[#0B0C0D]">
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 lg:px-[150px] py-[85px] pb-[120px]">
          {/* Statement */}
          <h2 className="text-[44px] md:text-[72px] lg:text-[120px] font-extrabold leading-[1.05] md:leading-[0.95] tracking-[-0.03em] text-[#0B0C0D] mb-[120px] md:mb-[190px]">
            We blend technology and<br className="hidden md:block" />
            insight to craft resumes that<br className="hidden md:block" />
            open up new possibilities.
          </h2>

          {/* Two Column Body */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-[210px]">
            {/* Left Column */}
            <div className="space-y-[46px]">
              <p className="text-[16px] md:text-[20px] font-normal leading-[1.6] text-[#111315]">
                At Jobfit, we blend technology and human insight to create tailored resumes that open up new career possibilities. We understand that every professional story is unique, and our approach combines AI precision with empathetic understanding.
              </p>
              <p className="text-[16px] md:text-[20px] font-normal leading-[1.6] text-[#111315]">
                Specializing in career transitions and job applications, we analyze what employers truly seek. From keyword optimization to achievement highlighting, we cover everything from entry-level to executive positions. What sets us apart is our personalized approach.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-[16px] md:text-[20px] font-normal leading-[1.6] text-[#111315]">
                Our AI is actively involved throughout the tailoring process, ensuring a precise and results-driven experience. With our dedicated attention to detail, close alignment with job requirements, and streamlined process, we make resume tailoring simple and efficient, without unnecessary complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeText />

      {/* Services Section */}
      <section id="services" className="px-6 py-32 md:px-12 md:py-48">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">What we do</p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl">
              What can we<br />do for you
            </h2>
          </div>

          <div className="grid gap-1">
            {services.map((service) => (
              <div
                key={service.id}
                className="group border-t border-white/10 py-8 md:py-12 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                  <div className="flex items-center gap-6 md:w-1/3">
                    <span className="text-xs text-white/30 font-mono">{service.id}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">{service.category}</span>
                  </div>
                  <div className="md:w-1/3">
                    <h3 className="font-serif text-2xl md:text-3xl group-hover:text-white/80 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div className="md:w-1/3 flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <span key={item} className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              href={startHref}
              className="group flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <span className="link-underline">View all capabilities</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeText />

      {/* Results Grid */}
      <section id="results" className="px-6 py-32 md:px-12 md:py-48">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Results</p>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl">
                Success<br />stories
              </h2>
            </div>
            <p className="max-w-sm text-white/50">
              Real people, real results. See how professionals transformed their careers with tailored resumes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {results.map((result, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 md:p-12 hover:border-white/20 transition-all hover-lift"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">{result.subtitle}</p>
                      <h3 className="font-serif text-2xl md:text-3xl">{result.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-auto">
                    <div className="text-5xl md:text-6xl font-serif text-white/90 mb-2">{result.stat}</div>
                    <p className="text-sm text-white/40">{result.statLabel}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30 mt-4">{result.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="px-6 py-32 md:px-12 md:py-48 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Process</p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl">
              How it<br />works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                num: "01",
                title: "Add your story",
                desc: "Upload your existing resume or enter your experience manually. We capture every achievement, skill, and milestone.",
              },
              {
                num: "02",
                title: "Paste the job",
                desc: "Share the job description you're targeting. Our AI analyzes requirements, keywords, and what employers truly seek.",
              },
              {
                num: "03",
                title: "Get tailored",
                desc: "Receive a perfectly matched resume highlighting your most relevant experience. Download and apply with confidence.",
              },
            ].map((step) => (
              <div key={step.num} className="group">
                <div className="text-6xl md:text-7xl font-serif text-white/10 mb-6 group-hover:text-white/20 transition-colors">
                  {step.num}
                </div>
                <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-32 md:px-12 md:py-48 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">Ready to start?</p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8">
            Say hi!
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-md mx-auto">
            Tell us about your career goals. Let's craft a resume that opens doors.
          </p>
          <Link
            href={startHref}
            className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-10 py-5 text-lg font-medium transition-all hover:bg-white/90"
          >
            Get started
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-16 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="font-serif text-3xl">Jobfit</Link>
              <p className="mt-4 text-white/40 max-w-sm">
                AI-powered resume tailoring that helps you land the job you want.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4">Links</p>
              <div className="space-y-3">
                <Link href="#services" className="block text-white/60 hover:text-white transition-colors">Services</Link>
                <Link href="#results" className="block text-white/60 hover:text-white transition-colors">Results</Link>
                <Link href="#process" className="block text-white/60 hover:text-white transition-colors">Process</Link>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4">Legal</p>
              <div className="space-y-3">
                <Link href="#" className="block text-white/60 hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="block text-white/60 hover:text-white transition-colors">Terms</Link>
                <Link href="#" className="block text-white/60 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">© 2026 Jobfit. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-white/30 hover:text-white transition-colors text-sm">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
