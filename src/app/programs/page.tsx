import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ProgramsPage() {
  const courses = [
    {
      id: 1,
      level: 'BEGINNER',
      title: 'Forex Fundamentals: Zero to Hero',
      description: 'Complete beginner course covering market basics, terminology, reading charts, and placing your first trades with confidence.',
      price: 199,
      duration: '8 weeks',
      trader: 'Alex Thompson',
      modules: [
        {
          title: 'Introduction to Forex Markets',
          lessons: [
            'What is Forex Trading?',
            'Market Sessions Explained',
            'Currency Pairs Overview',
          ],
        },
        {
          title: 'Reading Charts & Price Action',
          lessons: [
            'Candlestick Patterns 101',
            'Support and Resistance',
            'Trend Lines and Channels',
          ],
        },
        {
          title: 'Risk Management Essentials',
          lessons: [
            'Position Sizing Basics',
            'Stop Loss Strategies',
            'Risk-Reward Ratios',
          ],
        },
      ],
      benefits: [
        'Lifetime access to course materials',
        'Downloadable resources and checklists',
        'Community forum access',
        'Certificate of completion',
      ],
    },
    {
      id: 2,
      level: 'INTERMEDIATE',
      title: 'Advanced Technical Analysis',
      description: 'Deep dive into technical indicators, multi-timeframe analysis, and advanced chart patterns for experienced traders.',
      price: 349,
      duration: '10 weeks',
      trader: 'Alex Thompson',
      modules: [
        {
          title: 'Advanced Chart Patterns',
          lessons: [
            'Reversal Patterns',
            'Continuation Patterns',
            'Multi-Timeframe Analysis',
          ],
        },
        {
          title: 'Technical Indicators Mastery',
          lessons: [
            'Oscillators and Momentum',
            'Trend Indicators',
            'Volume Analysis',
          ],
        },
      ],
      benefits: [
        'Advanced trading strategies',
        'Live trading sessions',
        'Strategy backtesting templates',
        'Priority support',
      ],
    },
    {
      id: 3,
      level: 'ADVANCED',
      title: 'Professional Trading Strategies',
      description: 'Institutional-level trading strategies, algorithmic concepts, and portfolio management for serious traders.',
      price: 599,
      duration: '12 weeks',
      trader: 'Marcus Williams',
      modules: [
        {
          title: 'Institutional Trading Concepts',
          lessons: [
            'Order Flow Analysis',
            'Market Microstructure',
            'Smart Money Concepts',
          ],
        },
        {
          title: 'Algorithmic Trading Basics',
          lessons: [
            'Building Simple Strategies',
            'Backtesting Fundamentals',
            'Portfolio Optimization',
          ],
        },
      ],
      benefits: [
        'Proprietary indicators',
        'Algorithmic trading templates',
        '1-on-1 mentoring sessions',
        'Prop firm preparation',
      ],
    },
  ]

  const plans = [
    {
      id: 'community',
      name: 'Community Membership',
      description: 'Access to our exclusive trading community, live sessions, and daily market analysis.',
      price: 99,
      duration: 'monthly',
      isMonthly: true,
      features: [
        'Daily market analysis',
        'Weekly live trading sessions',
        'Private Discord community',
        'Trade breakdowns and reviews',
        'Q&A with professional traders',
      ],
      includedCourses: ['Forex Fundamentals', 'Advanced Technical Analysis'],
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      description: 'Complete access to all courses, mentoring sessions, and priority support.',
      price: 299,
      duration: 'quarterly',
      isMonthly: false,
      features: [
        'All courses included',
        'Monthly 1-on-1 mentoring',
        'Priority email support',
        'Advanced strategy access',
        'Proprietary indicators',
        'Risk management audit',
      ],
      includedCourses: ['Forex Fundamentals', 'Advanced Technical Analysis', 'Professional Trading Strategies'],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Education Programs</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto">
              Choose the learning path that matches your experience level and trading goals.
            </p>
          </div>
        </section>

        {/* Courses */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-16">
              {courses.map((course) => (
                <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {course.level}
                        </span>
                        <h2 className="text-3xl font-bold mt-2 mb-2">{course.title}</h2>
                        <p className="text-muted mb-4">{course.description}</p>
                        <div className="flex items-center text-sm text-muted">
                          <span className="mr-4">👨‍🏫 {course.trader}</span>
                          <span>⏱️ {course.duration}</span>
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 text-right">
                        <div className="text-4xl font-bold">${course.price}</div>
                        <p className="text-muted text-sm">One-time payment</p>
                      </div>
                    </div>

                    {/* Modules */}
                    <div className="mb-8">
                      <h3 className="font-semibold mb-4">Course Curriculum</h3>
                      <div className="space-y-4">
                        {course.modules.map((module, index) => (
                          <div key={index} className="bg-background p-4 rounded-lg">
                            <h4 className="font-medium mb-2">{module.title}</h4>
                            <ul className="space-y-1">
                              {module.lessons.map((lesson, i) => (
                                <li key={i} className="text-sm text-muted flex items-center">
                                  <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="font-semibold mb-4">What You'll Get</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {course.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/checkout?course=${course.id}`}
                      className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Membership Plans</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Get ongoing support and access to our trading community with our membership plans.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-card p-8 rounded-2xl border border-border card-hover">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Included Courses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.includedCourses.map((course, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/checkout?plan=${plan.id}`}
                    className="block w-full py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Plan Comparison</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl border border-border">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">Beginner Course</th>
                    <th className="p-4 text-center font-semibold">Intermediate Course</th>
                    <th className="p-4 text-center font-semibold">Advanced Course</th>
                    <th className="p-4 text-center font-semibold">Community</th>
                    <th className="p-4 text-center font-semibold">Professional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4">Course Access</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">2 courses</td>
                    <td className="p-4 text-center">All courses</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Live Sessions</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">Weekly</td>
                    <td className="p-4 text-center">Weekly + 1-on-1</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Community Access</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Premium</td>
                    <td className="p-4 text-center">Premium</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Mentoring</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">Group</td>
                    <td className="p-4 text-center">Q&A only</td>
                    <td className="p-4 text-center">Monthly 1-on-1</td>
                  </tr>
                  <tr>
                    <td className="p-4">Price</td>
                    <td className="p-4 text-center font-semibold">$199</td>
                    <td className="p-4 text-center font-semibold">$349</td>
                    <td className="p-4 text-center font-semibold">$599</td>
                    <td className="p-4 text-center font-semibold">$99/mo</td>
                    <td className="p-4 text-center font-semibold">$299/qtr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Not Sure Which to Choose?</h2>
            <p className="text-muted mb-8">
              Contact us for a personalized recommendation based on your experience level and goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}