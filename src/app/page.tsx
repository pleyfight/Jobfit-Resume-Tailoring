import Link from "next/link";
import { Sparkles, Target, Zap, CheckCircle, TrendingUp, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Navigation */}
      <nav className="border-b border-[#E5E5E5] bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#2D2D2D]" />
              <span className="font-serif text-2xl font-bold text-[#2D2D2D]">ResumeAI</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#features" className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">Features</a>
              <a href="#pricing" className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">Pricing</a>
              <a href="#faq" className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">FAQ</a>
              <Link 
                href="/dashboard"
                className="px-6 py-2 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-6xl font-bold text-[#2D2D2D] mb-6 leading-tight">
            Effortless AI-powered resume tailoring by ResumeAI
          </h1>
          <p className="text-xl text-[#6B6B6B] mb-8 max-w-2xl mx-auto">
            Streamline your job application process with seamless AI automation for every custom resume, perfectly tailored to each job description.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors text-lg font-medium"
          >
            Start for free
          </Link>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#E5E5E5]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 h-64 flex items-center justify-center border border-purple-100">
                <div className="text-center">
                  <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-900">Job Matching</h3>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 h-64 flex items-center justify-center border border-orange-100">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-orange-900">ATS Optimization</h3>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 h-64 flex items-center justify-center border border-green-100">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-900">Smart Templates</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm text-[#6B6B6B] mb-2 uppercase tracking-wider">Features</p>
            <h2 className="font-serif text-4xl font-bold text-[#2D2D2D]">Everything you need to land your dream job</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F7F5F3] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#2D2D2D]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">AI-Powered Tailoring</h3>
              <p className="text-[#6B6B6B]">
                Our advanced AI analyzes job descriptions and optimizes your resume to match exactly what employers are looking for.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F7F5F3] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#2D2D2D]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Keyword Optimization</h3>
              <p className="text-[#6B6B6B]">
                Automatically highlight your most relevant skills and experiences based on the job requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F7F5F3] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#2D2D2D]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Instant Generation</h3>
              <p className="text-[#6B6B6B]">
                Get a professionally tailored resume in seconds, not hours. Focus on applying, not formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-[#F7F5F3]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm text-[#6B6B6B] mb-4 uppercase tracking-wider">Trusted by job seekers</p>
          <h2 className="font-serif text-3xl font-bold text-[#2D2D2D] mb-12">
            Confidence backed by results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#2D2D2D] mb-2">95%</div>
              <p className="text-[#6B6B6B]">ATS Pass Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#2D2D2D] mb-2">10k+</div>
              <p className="text-[#6B6B6B]">Resumes Generated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#2D2D2D] mb-2">4.9/5</div>
              <p className="text-[#6B6B6B]">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm text-[#6B6B6B] mb-2 uppercase tracking-wider">Plans & Pricing</p>
            <h2 className="font-serif text-4xl font-bold text-[#2D2D2D] mb-4">
              Choose the perfect plan for your job search
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Scale your job applications with flexible pricing that grows with your needs. Start free, upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border border-[#E5E5E5] rounded-xl p-8 bg-white hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-2xl font-semibold mb-2">Starter</h3>
              <p className="text-[#6B6B6B] mb-6">Perfect for individuals testing the waters</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#2D2D2D]">$0</span>
                <span className="text-[#6B6B6B]"> / month</span>
              </div>
              <Link
                href="/dashboard"
                className="block w-full py-3 px-6 bg-[#F7F5F3] text-[#2D2D2D] rounded-lg hover:bg-[#E5E5E5] transition-colors text-center font-medium mb-6"
              >
                Start for free
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Up to 3 tailored resumes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Basic AI optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Standard templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Community support</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-[#2D2D2D] rounded-xl p-8 bg-[#2D2D2D] text-white hover:shadow-2xl transition-shadow relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-[#2D2D2D] px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Professional</h3>
              <p className="text-gray-300 mb-6">Advanced features for active job seekers</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$16</span>
                <span className="text-gray-300"> / month</span>
              </div>
              <Link
                href="/dashboard"
                className="block w-full py-3 px-6 bg-white text-[#2D2D2D] rounded-lg hover:bg-gray-100 transition-colors text-center font-medium mb-6"
              >
                Get started
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Unlimited tailored resumes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Advanced AI optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Custom templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Cover letter generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>LinkedIn integration</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-[#E5E5E5] rounded-xl p-8 bg-white hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-2xl font-semibold mb-2">Enterprise</h3>
              <p className="text-[#6B6B6B] mb-6">For teams and organizations</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#2D2D2D]">$160</span>
                <span className="text-[#6B6B6B]"> / year</span>
              </div>
              <Link
                href="/dashboard"
                className="block w-full py-3 px-6 bg-[#F7F5F3] text-[#2D2D2D] rounded-lg hover:bg-[#E5E5E5] transition-colors text-center font-medium mb-6"
              >
                Contact sales
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">24/7 phone support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Custom branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">API access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-[#F7F5F3]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#2D2D2D] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#6B6B6B]">
              Everything you need to know about ResumeAI
            </p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-lg border border-[#E5E5E5] p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-[#2D2D2D]">
                How does the AI resume tailoring work?
                <span className="text-[#999] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Our AI analyzes the job description you provide and compares it with your experience, skills, and achievements. It then optimizes your resume by highlighting the most relevant information, using job-specific keywords, and restructuring content to match what employers are looking for.
              </p>
            </details>

            <details className="group bg-white rounded-lg border border-[#E5E5E5] p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-[#2D2D2D]">
                Can I integrate ResumeAI with my existing tools?
                <span className="text-[#999] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Yes! Professional and Enterprise plans include integrations with LinkedIn, allowing you to import your profile data directly. Enterprise plans also offer API access for custom integrations.
              </p>
            </details>

            <details className="group bg-white rounded-lg border border-[#E5E5E5] p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-[#2D2D2D]">
                What kind of support do you provide?
                <span className="text-[#999] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Starter plan users get community support. Professional users receive priority email support with response times under 24 hours. Enterprise customers get 24/7 phone support and a dedicated account manager.
              </p>
            </details>

            <details className="group bg-white rounded-lg border border-[#E5E5E5] p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-[#2D2D2D]">
                Is my data secure with ResumeAI?
                <span className="text-[#999] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Absolutely. We use industry-standard encryption for all data storage and transmission. Your resume data is stored securely in Supabase with row-level security, and we never share your information with third parties.
              </p>
            </details>

            <details className="group bg-white rounded-lg border border-[#E5E5E5] p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-[#2D2D2D]">
                How do I get started with ResumeAI?
                <span className="text-[#999] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Simply click "Start for free" to access the dashboard. You can either upload an existing resume or manually enter your information. Then paste a job description and let our AI generate a tailored resume in seconds!
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl font-bold text-[#2D2D2D] mb-4">
            Ready to transform your job search?
          </h2>
          <p className="text-xl text-[#6B6B6B] mb-8">
            Join thousands of job seekers streamlining their applications, optimizing their resumes, and landing interviews with AI-powered insights.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors text-lg font-medium"
          >
            Start for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#2D2D2D]" />
                <span className="font-serif text-xl font-bold text-[#2D2D2D]">ResumeAI</span>
              </div>
              <p className="text-[#6B6B6B] text-sm">
                AI-powered resume tailoring made effortless
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#6B6B6B]">
                <li><Link href="/dashboard" className="hover:text-[#2D2D2D]">Dashboard</Link></li>
                <li><a href="#features" className="hover:text-[#2D2D2D]">Features</a></li>
                <li><a href="#pricing" className="hover:text-[#2D2D2D]">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#6B6B6B]">
                <li><a href="#" className="hover:text-[#2D2D2D]">About us</a></li>
                <li><a href="#" className="hover:text-[#2D2D2D]">Careers</a></li>
                <li><a href="#" className="hover:text-[#2D2D2D]">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#6B6B6B]">
                <li><a href="#" className="hover:text-[#2D2D2D]">Documentation</a></li>
                <li><a href="#" className="hover:text-[#2D2D2D]">Support</a></li>
                <li><a href="#faq" className="hover:text-[#2D2D2D]">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E5E5E5] text-center text-sm text-[#6B6B6B]">
            <p>© 2026 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
