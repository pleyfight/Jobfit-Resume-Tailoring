import Link from "next/link";
import { Sparkles, Target, Zap, CheckCircle, TrendingUp, FileText, Clock, Shield } from "lucide-react";

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
            <div className="flex items-center gap-6">
              <a href="#features" className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">Features</a>
              <a href="#pricing" className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">Pricing</a>
              <a href="#faq" className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">FAQ</a>
              <Link 
                href="/login"
                className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-2 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
              >
                Sign Up
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
            href="/signup"
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
                Automatically identify and incorporate relevant keywords to pass ATS systems and get your resume in front of hiring managers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F7F5F3] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#2D2D2D]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-[#6B6B6B]">
                Generate a perfectly tailored resume in seconds, not hours. Apply to more jobs in less time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm text-[#6B6B6B] mb-2 uppercase tracking-wider">Pricing</p>
            <h2 className="font-serif text-4xl font-bold text-[#2D2D2D] mb-4">Choose your plan</h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Scale your job applications with flexible pricing that grows with your needs. Start free, upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border border-[#E5E5E5] rounded-xl p-8 bg-white hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-2xl font-semibold mb-2">Free</h3>
              <p className="text-[#6B6B6B] mb-6">Perfect for trying out ResumeAI</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#2D2D2D]">$0</span>
                <span className="text-[#6B6B6B]"> / month</span>
              </div>
              <Link
                href="/signup"
                className="block w-full py-3 px-6 bg-[#F7F5F3] text-[#2D2D2D] rounded-lg hover:bg-[#E5E5E5] transition-colors text-center font-medium mb-6"
              >
                Get Started
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">5 tailored resumes per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">1 week data storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Basic AI optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">PDF export</span>
                </li>
              </ul>
            </div>

            {/* Monthly Plan */}
            <div className="border-2 border-[#2D2D2D] rounded-xl p-8 bg-[#2D2D2D] text-white hover:shadow-2xl transition-shadow relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-[#2D2D2D] px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Monthly</h3>
              <p className="text-gray-300 mb-6">For active job seekers</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$19</span>
                <span className="text-gray-300"> / month</span>
              </div>
              <Link
                href="/signup"
                className="block w-full py-3 px-6 bg-white text-[#2D2D2D] rounded-lg hover:bg-gray-100 transition-colors text-center font-medium mb-6"
              >
                Subscribe
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Unlimited tailored resumes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Indefinite data storage</span>
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
                  <span>Cover letter generation</span>
                </li>
              </ul>
            </div>

            {/* Yearly Plan */}
            <div className="border border-[#E5E5E5] rounded-xl p-8 bg-white hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Save 21%
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Yearly</h3>
              <p className="text-[#6B6B6B] mb-6">Best value for serious job hunters</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#2D2D2D]">$15</span>
                <span className="text-[#6B6B6B]"> / month</span>
                <div className="text-sm text-[#6B6B6B] mt-1">Billed annually at $180</div>
              </div>
              <Link
                href="/signup"
                className="block w-full py-3 px-6 bg-[#F7F5F3] text-[#2D2D2D] rounded-lg hover:bg-[#E5E5E5] transition-colors text-center font-medium mb-6"
              >
                Subscribe
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Unlimited tailored resumes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Indefinite data storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Advanced AI optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Cover letter generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B6B6B]">Early access to new features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-sm text-[#6B6B6B] mb-2 uppercase tracking-wider">FAQ</p>
            <h2 className="font-serif text-4xl font-bold text-[#2D2D2D]">Frequently asked questions</h2>
          </div>

          <div className="space-y-6">
            <details className="group bg-[#F7F5F3] rounded-lg p-6">
              <summary className="font-semibold text-[#2D2D2D] cursor-pointer list-none flex justify-between items-center">
                How does the AI tailoring work?
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Our AI analyzes the job description you provide and automatically adjusts your resume content, highlighting relevant skills and experience that match the position requirements.
              </p>
            </details>

            <details className="group bg-[#F7F5F3] rounded-lg p-6">
              <summary className="font-semibold text-[#2D2D2D] cursor-pointer list-none flex justify-between items-center">
                What happens to my data after 1 week on the free plan?
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                On the free plan, your uploaded documents and generated resumes are automatically deleted after 1 week. You can download your resumes before then. Paid plans offer indefinite storage.
              </p>
            </details>

            <details className="group bg-[#F7F5F3] rounded-lg p-6">
              <summary className="font-semibold text-[#2D2D2D] cursor-pointer list-none flex justify-between items-center">
                Can I cancel my subscription anytime?
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.
              </p>
            </details>

            <details className="group bg-[#F7F5F3] rounded-lg p-6">
              <summary className="font-semibold text-[#2D2D2D] cursor-pointer list-none flex justify-between items-center">
                Do you offer refunds?
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <p className="mt-4 text-[#6B6B6B]">
                We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#2D2D2D] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of job seekers who have successfully tailored their resumes with ResumeAI.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-[#2D2D2D] rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            Start for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2D2D2D]" />
              <span className="font-serif text-xl font-bold text-[#2D2D2D]">ResumeAI</span>
            </div>
            <p className="text-[#6B6B6B] text-sm">
               2026 ResumeAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
