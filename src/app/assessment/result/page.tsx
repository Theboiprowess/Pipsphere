'use client'

import { Suspense, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const recommendedPaths = {
  beginner_forex_foundation: {
    title: 'Beginner Forex Foundation',
    description: 'Perfect for newcomers to forex trading. Learn the fundamentals, understand market mechanics, and build a solid foundation for your trading journey.',
    price: '$199',
    features: [
      'Complete beginner curriculum',
      'Market basics and terminology',
      'Reading charts and price action',
      'Risk management fundamentals',
      'Practice trading simulations',
      'Community access',
    ],
    cta: 'Start Beginner Course',
    link: '/programs',
  },
  full_mentorship: {
    title: 'Full Mentorship Course',
    description: 'Comprehensive mentorship for serious traders. Get personalized guidance, advanced strategies, and ongoing support from professional traders.',
    price: '$500',
    features: [
      'Complete structured curriculum',
      'Strategy education and development',
      'Live market analysis sessions',
      'Risk management mastery',
      'Trading psychology coaching',
      '1-on-1 mentorship sessions',
      'Private community access',
    ],
    cta: 'Enroll in Mentorship',
    link: '/checkout?plan=mentorship',
  },
  signals_membership: {
    title: 'Forex Signals Membership',
    description: 'Receive daily market analysis and trade ideas from professional traders. Perfect for traders who want guidance while developing their own analysis.',
    price: '$199/month',
    features: [
      'Daily market analysis',
      'Trade setup notifications',
      'Entry, stop loss, and target levels',
      'Risk management guidance',
      'Market commentary and reasoning',
      'Community access',
    ],
    cta: 'Subscribe to Signals',
    link: '/checkout?plan=signals',
    disclaimer: 'Signals are educational market commentary - not financial advice. Results never guaranteed.',
  },
  prop_firm_challenge_support: {
    title: 'Prop Firm Challenge Support',
    description: 'Specialized guidance for traders preparing for prop firm evaluations. Learn the risk management and discipline needed to pass challenges.',
    price: 'Custom',
    features: [
      'Challenge preparation strategy',
      'Risk management planning',
      'Trading plan development',
      'Accountability tracking',
      'Psychological support',
      'Challenge-specific education',
      'Ongoing mentorship',
    ],
    cta: 'Get Challenge Support',
    link: '/contact',
    disclaimer: 'Education and guidance - does not guarantee pass or funding',
  },
}

function AssessmentResultContent() {
  const searchParams = useSearchParams()
  const path = searchParams.get('path') || 'beginner_forex_foundation'
  const recommendation = recommendedPaths[path as keyof typeof recommendedPaths] || recommendedPaths.beginner_forex_foundation

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Your Recommended Path</h1>
            <p className="text-muted max-w-2xl mx-auto">
              Based on your assessment, we recommend starting with this program. This path is tailored to your experience level, goals, and learning style.
            </p>
          </div>

          {/* Recommendation Card */}
          <div className="bg-card p-8 rounded-2xl border border-border mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                  Recommended for You
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{recommendation.title}</h2>
                <p className="text-muted">{recommendation.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{recommendation.price}</div>
                {recommendation.price.includes('/month') && (
                  <div className="text-sm text-muted">Recurring monthly</div>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {recommendation.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {recommendation.disclaimer && (
              <p className="text-xs text-muted mb-6 italic">{recommendation.disclaimer}</p>
            )}

            <Link
              href={recommendation.link}
              className="block w-full py-4 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
            >
              {recommendation.cta}
            </Link>
          </div>

          {/* Alternative Options */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Not sure this is right for you?</h3>
            <p className="text-muted mb-6">
              Explore all our programs to find the perfect fit for your goals and budget.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
            >
              View All Programs
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Risk Disclaimer */}
          <div className="bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Important:</strong> Trading forex and leveraged products carries substantial risk and may not be suitable for every person. Pipsphere provides educational content only and does not provide financial, investment, or legal advice. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function AssessmentResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <AssessmentResultContent />
    </Suspense>
  )
}
