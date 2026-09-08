'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">What Pipsphere Does & Does Not Do</h1>
            <p className="text-muted text-lg">
              Clear transparency about our services, limitations, and commitment to ethical education.
            </p>
          </div>

          {/* What We Do */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-green-500">✓ What We Do</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Provide Forex Education</h3>
                <p className="text-sm text-muted">
                  We teach forex trading concepts, strategies, risk management, and market analysis through structured courses, mentorship, and live sessions.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Share Market Analysis</h3>
                <p className="text-sm text-muted">
                  Our traders share their market analysis and trade ideas as educational commentary to help students learn to analyze markets themselves.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Support Prop Firm Preparation</h3>
                <p className="text-sm text-muted">
                  We provide education, risk management guidance, and accountability support for traders preparing for prop firm evaluations.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Build a Trading Community</h3>
                <p className="text-sm text-muted">
                  We foster a supportive community where traders can learn from each other, share insights, and grow together.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Teach Risk Management</h3>
                <p className="text-sm text-muted">
                  We emphasize capital preservation, proper position sizing, and disciplined risk management as the foundation of successful trading.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Share Realistic Performance</h3>
                <p className="text-sm text-muted">
                  We transparently share both wins and losses in our signals and analysis to provide a realistic view of trading.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Provide Ongoing Support</h3>
                <p className="text-sm text-muted">
                  We offer continued mentorship, Q&A sessions, and community support to help students throughout their trading journey.
                </p>
              </div>
            </div>
          </section>

          {/* What We Don't Do */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-red-500">✗ What We Do Not Do</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Provide Financial Advice</h3>
                <p className="text-sm text-muted">
                  We are educators, not financial advisors. Our content is for informational purposes only and should not be considered personalized investment advice.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Guarantee Profits</h3>
                <p className="text-sm text-muted">
                  Trading involves substantial risk of loss. We never guarantee profits, successful challenge passes, or specific trading outcomes.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Manage Client Funds</h3>
                <p className="text-sm text-muted">
                  We do not accept or manage client funds. All trading is done by students in their own accounts with their own capital.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Promise Funded Accounts</h3>
                <p className="text-sm text-muted">
                  We do not guarantee that students will pass prop firm challenges or receive funded accounts. We provide preparation support only.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Use Fake Testimonials</h3>
                <p className="text-sm text-muted">
                  All testimonials on our platform are from real students with their actual experiences. We do not fabricate or pay for reviews.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Cherry-Pick Results</h3>
                <p className="text-sm text-muted">
                  We maintain complete archives of our signals including wins, losses, and cancelled ideas. We do not hide unfavorable results.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Pressure Sales</h3>
                <p className="text-sm text-muted">
                  We do not use high-pressure sales tactics, false urgency, or manipulative marketing. Students choose programs at their own pace.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Do Not Hide Subscription Terms</h3>
                <p className="text-sm text-muted">
                  All pricing, subscription terms, and renewal policies are clearly stated. There are no hidden fees or surprise charges.
                </p>
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="mb-12">
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
              <p className="text-muted mb-4">
                We are committed to providing honest, transparent, and high-quality forex education. Our goal is to help you become a 
                more knowledgeable, disciplined, and risk-aware trader—not to sell you dreams of easy wealth.
              </p>
              <p className="text-muted mb-4">
                If you ever feel that our marketing, communications, or services do not align with these principles, we encourage you 
                to contact us directly. We continuously work to improve our transparency and educational quality.
              </p>
              <p className="text-muted">
                Trading is a challenging journey that requires dedication, patience, and realistic expectations. We're here to support 
                that journey with honest education, not false promises.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <h3 className="font-semibold mb-4">Questions About Our Services?</h3>
              <p className="text-sm text-muted mb-4">
                If you have any questions about what we do, our educational approach, or our services, please reach out.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>

          {/* Legal Disclaimer */}
          <section>
            <div className="bg-card/50 p-6 rounded-xl border border-border">
              <p className="text-sm text-muted text-center">
                <strong>Legal Disclaimer:</strong> Pipsphere Forex Academy provides educational content only and does not constitute 
                financial, investment, or legal advice. Trading forex and leveraged products carries substantial risk of loss and may 
                not be suitable for every investor. Past performance does not guarantee future results. You should carefully consider 
                your financial situation, risk tolerance, and investment objectives before trading. Seek independent advice if needed.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
