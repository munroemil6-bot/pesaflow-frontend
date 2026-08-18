import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';

export default function Landing() {
  const features = [
    {
      title: 'Fast Transfers',
      description: 'Send money in seconds, not days. Instant delivery to any mobile wallet or bank account.',
    },
    {
      title: 'Secure & Safe',
      description: 'Bank-level encryption protects every transaction. Your money and data are always secure.',
    },
    {
      title: 'Low Fees',
      description: 'Transparent pricing with no hidden charges. Send more, keep more.',
    },
    {
      title: '24/7 Available',
      description: 'Transfer money anytime, anywhere. Available round the clock, every day.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up in minutes with just your phone number and basic details.',
    },
    {
      number: '2',
      title: 'Add Funds',
      description: 'Link your bank account or use M-Pesa to top up your wallet instantly.',
    },
    {
      number: '3',
      title: 'Send Money',
      description: 'Transfer to anyone, instantly. Save beneficiaries for faster future transfers.',
    },
  ];

  const faqs = [
    {
      question: 'Is PesaFlow safe to use?',
      answer: 'Yes. We use bank-level encryption and comply with all financial regulations to protect your money and data.',
    },
    {
      question: 'How long do transfers take?',
      answer: 'Most transfers complete instantly. Mobile wallet transfers take seconds, bank transfers 1-3 minutes.',
    },
    {
      question: 'What are the transfer limits?',
      answer: 'You can send up to KES 999,999 per transaction. Daily limits vary by account type.',
    },
    {
      question: 'How much does it cost?',
      answer: 'Fees are transparent and displayed before you confirm. Most transfers cost less than KES 50.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left side - Text */}
            <div className="flex flex-col justify-center" >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-50">
                Welcome to PesaFlow
              </p>
              <h1 className="mt-3 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-5xl">
                Send Money.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-emerald-100">
                  Simple. Secure. Fast.
                </span>
              </h1>
              <p className="mt-6 text-lg text-green-50 leading-relaxed">
                Send money to anyone, anywhere in Kenya. Instant transfers, transparent fees, and bank-level security.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link to="/auth/register">
                  <Button size="lg" variant="secondary">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-col gap-2 text-sm text-green-50">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  <span>No hidden fees. Transparent pricing.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  <span>Bank-level security and encryption.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  <span>Transfers complete in seconds.</span>
                </div>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                
                {/* Green glow behind the image */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-300/30 to-emerald-300/30 rounded-3xl blur-3xl" />

                {/* Online Money Image */}
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1621761191319-c6fb62004040"
                    alt="Money and finance"
                    className="w-full h-[420px] object-cover rounded-3xl"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Why Choose PesaFlow
            </p>
            <h2 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
              Everything you need to send money
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Fast, secure, and affordable money transfers at your fingertips.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-green-200 hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Getting Started
            </p>
            <h2 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Three simple steps to start sending money today.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-400 to-transparent" />
                )}

                {/* Card */}
                <div className="relative z-10 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-green-500/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/auth/register">
              <Button size="lg">Start Your Journey</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Questions?
            </p>
            <h2 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
              Frequently asked
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-200 hover:shadow-md hover:shadow-green-500/10"
              >
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  {faq.question}
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-green-50">
            Join thousands of Kenyans who trust PesaFlow for fast, secure money transfers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link to="/auth/register">
              <Button size="lg" variant="secondary">
                Create Free Account
              </Button>
            </Link>
            <a href="#" className="text-white font-medium hover:text-green-50 transition flex items-center justify-center gap-2">
              Learn more <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-lg font-bold text-white">
                  P
                </div>
                <div>
                  <p className="font-bold text-white">PesaFlow</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                    Money Transfer
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-400">
                Fast, secure money transfers for everyone in Kenya.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  PesaFlow provides a simple and convenient way to send and receive
                  money through a secure digital platform.
                </li>
                <li>
                  Users can initiate transfers and monitor their transaction activity
                  from one place.
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  PesaFlow is designed to make digital money transfers easier,
                  faster, and more accessible.
                </li>
                <li>
                  Our goal is to provide a straightforward experience for everyday
                  financial transactions.
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  Your transaction information should be handled securely and
                  responsibly.
                </li>
                <li>
                  PesaFlow is designed with privacy and secure transaction handling
                  in mind.
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2026 PesaFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
