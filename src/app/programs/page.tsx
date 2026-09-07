import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ProgramsPage() {
  const courses = [
    {
      id: 'mentorship',
      level: 'MENTORSHIP',
      title: 'Full Mentorship Course',
      description: 'A complete forex mentorship program for traders who want structured learning and direct guidance from professional traders.',
      price: 500,
      duration: 'Ongoing',
      trader: 'Pipsphere Team',
      modules: [
        {
          title: 'Complete Curriculum',
          lessons: [
            'Comprehensive strategy education',
            'Market analysis techniques',
            'Risk management fundamentals',
            'Trading psychology mastery',
          ],
        },
        {
          title: 'Live Sessions',
          lessons: [
            'Weekly live trading sessions',
            'Market breakdowns',
            'Q&A with professional traders',
          ],
        },
        {
          title: 'Community Access',
          lessons: [
            'Private community forum',
            'Peer learning opportunities',
            'Accountability groups',
          ],
        },
      ],
      benefits: [
        'Lifetime access to course materials',
        'Weekly live trading sessions',
        'Direct mentorship from professional traders',
        'Community access and support',
        'Downloadable resources and templates',
        'Certificate of completion',
      ],
      disclaimer: 'Educational course - does not guarantee results. Trading involves significant risk of loss.',
    },
  ]

  const plans = [
    {
      id: 'signals',
      name: 'Forex Signals',
      description: 'A recurring monthly subscription for forex market insights and trade setups from professional traders.',
      price: 199,
      duration: 'month',
      isMonthly: true,
      features: [
        'Daily market analysis',
        'Trade setup notifications',
        'Entry and exit point ideas',
        'Risk management guidance',
        'Community access',
      ],
      disclaimer: 'Educational market commentary - not financial advice. Trading results are never guaranteed.',
    },
    {
      id: 'prop-firm',
      name: 'Prop Firm Challenge Support',
      description: 'Dedicated service to help traders prepare for and navigate prop-firm evaluation challenges through education and mentorship.',
      price: 0,
      duration: 'Custom',
      isMonthly: false,
      features: [
        'Challenge preparation guidance',
        'Risk management for evals',
        'Trading plan development',
        'Accountability tracking',
        'Mentorship support',
      ],
      disclaimer: 'Education and guidance - does not guarantee pass or funding. Trading involves significant risk.',
      contactRequired: true,
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

                    {course.disclaimer && (
                      <p className="text-xs text-muted mb-4 italic">{course.disclaimer}</p>
                    )}

                    <Link
                      href={`/programs`}
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Additional Services</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Supplement your learning with our ongoing services and support options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-card p-8 rounded-2xl border border-border card-hover">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted mb-6">{plan.description}</p>
                  {plan.price > 0 && (
                    <div className="mb-6">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted">/{plan.duration}</span>
                    </div>
                  )}
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
                  {plan.disclaimer && (
                    <p className="text-xs text-muted mb-6 italic">{plan.disclaimer}</p>
                  )}
                  {plan.contactRequired ? (
                    <Link
                      href="/contact"
                      className="block w-full py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
                    >
                      Get Challenge Support
                    </Link>
                  ) : (
                    <Link
                      href={`/programs`}
                      className="block w-full py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
                    >
                      Subscribe Monthly
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Service Comparison</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl border border-border">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">Mentorship Course</th>
                    <th className="p-4 text-center font-semibold">Forex Signals</th>
                    <th className="p-4 text-center font-semibold">Prop Firm Support</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4">Complete Curriculum</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Live Sessions</td>
                    <td className="p-4 text-center">✓ Weekly</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Market Analysis</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓ Daily</td>
                    <td className="p-4 text-center">-</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Trade Setups</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">-</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Risk Management</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Mentorship</td>
                    <td className="p-4 text-center">✓ Direct</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Community Access</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Price</td>
                    <td className="p-4 text-center font-semibold">$500</td>
                    <td className="p-4 text-center font-semibold">$199/mo</td>
                    <td className="p-4 text-center font-semibold">Custom</td>
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