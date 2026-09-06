import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Master the Markets.</span>
                <br />
                <span className="text-foreground">Trade With Purpose.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted mb-8 max-w-2xl mx-auto">
                Professional forex education with structured learning, live market analysis, mentorship from experienced traders, and a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/programs"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all glow"
                >
                  Explore Programs
                </Link>
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-card/80 transition-all"
                >
                  Join Pipsphere
                </Link>
              </div>
            </div>

            {/* Animated Chart Visual */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p className="text-muted">Live Market Analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Pipsphere Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Pipsphere?</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Our comprehensive approach combines education, mentorship, and community to help you develop as a trader.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '📚',
                  title: 'Structured Learning',
                  description: 'Progressive curriculum from beginner to advanced levels with clear learning paths.',
                },
                {
                  icon: '📊',
                  title: 'Live Market Analysis',
                  description: 'Real-time market breakdowns and trade analysis from professional traders.',
                },
                {
                  icon: '👨‍🏫',
                  title: 'Expert Mentorship',
                  description: 'Direct guidance from traders with years of market experience.',
                },
                {
                  icon: '👥',
                  title: 'Supportive Community',
                  description: 'Connect with fellow traders, share insights, and grow together.',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border card-hover">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Programs</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Choose the learning path that matches your experience level and goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  level: 'Beginner',
                  title: 'Forex Fundamentals',
                  price: '$199',
                  duration: '8 weeks',
                  features: ['Market basics', 'Chart reading', 'Risk management', 'First trades'],
                },
                {
                  level: 'Intermediate',
                  title: 'Technical Analysis',
                  price: '$349',
                  duration: '10 weeks',
                  features: ['Advanced patterns', 'Indicators mastery', 'Multi-timeframe analysis', 'Strategy development'],
                },
                {
                  level: 'Advanced',
                  title: 'Professional Trading',
                  price: '$599',
                  duration: '12 weeks',
                  features: ['Institutional concepts', 'Algorithmic basics', 'Portfolio management', 'Prop firm prep'],
                },
              ].map((program, index) => (
                <div key={index} className="bg-card p-8 rounded-xl border border-border card-hover">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {program.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{program.price}</span>
                    <span className="text-muted ml-2">/ {program.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/programs"
                    className="block w-full py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
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
          </div>
        </section>

        {/* Meet the Traders */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet the Traders</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Learn from professionals with diverse expertise and years of market experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Alex Thompson',
                  specialty: 'Technical Analysis',
                  bio: '8+ years in forex markets, specializing in swing trading and technical analysis patterns.',
                },
                {
                  name: 'Sarah Chen',
                  specialty: 'Fundamental Analysis',
                  bio: '10+ years experience in global markets. Expert in central bank policies and economic indicators.',
                },
                {
                  name: 'Marcus Williams',
                  specialty: 'Algorithmic Trading',
                  bio: 'Former quantitative analyst. Specializes in automated trading systems and risk management.',
                },
                {
                  name: 'Elena Rodriguez',
                  specialty: 'Trading Psychology',
                  bio: 'Trading psychology coach. Helps traders develop emotional discipline and decision-making.',
                },
              ].map((trader, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border card-hover text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {trader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{trader.name}</h3>
                  <p className="text-primary text-sm mb-3">{trader.specialty}</p>
                  <p className="text-muted text-sm">{trader.bio}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/about"
                className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
              >
                Learn More About Our Team
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Student Experiences</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Individual results vary. These are personal experiences from our community members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'James Wilson',
                  content: 'The structured approach at Pipsphere transformed my trading. I went from losing consistently to having a profitable strategy after completing the intermediate course.',
                  rating: 5,
                },
                {
                  name: 'Maria Garcia',
                  content: 'The community membership is worth every penny. Daily analysis and live sessions have helped me understand market movements much better.',
                  rating: 5,
                },
                {
                  name: 'David Kim',
                  content: 'Elena\'s psychology sessions changed everything. I was my own worst enemy, but now I have the discipline to follow my trading plan.',
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted mb-4 italic">"{testimonial.content}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'Is this suitable for complete beginners?',
                  answer: 'Yes! Our beginner program is designed specifically for those with no prior trading experience. We start from the very basics and build up gradually.',
                },
                {
                  question: 'How long do I have access to the courses?',
                  answer: 'Once you enroll in a course, you have lifetime access to the course materials, including any future updates.',
                },
                {
                  question: 'Do you guarantee profits?',
                  answer: 'No. Trading involves substantial risk of loss. We provide education and strategies, but we cannot guarantee results. Individual outcomes vary based on many factors.',
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept credit/debit cards through Stripe and cryptocurrency payments (USDT) via TRC20 and ERC20 networks.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their understanding of the markets through our structured education programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all glow"
              >
                Explore Programs
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-card/80 transition-all"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}