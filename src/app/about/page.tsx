import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  const traders = [
    {
      name: 'Alex Thompson',
      specialty: 'Technical Analysis & Price Action',
      bio: '8+ years in forex markets, specializing in swing trading and technical analysis patterns. Former prop firm trader with proven risk management strategies. Alex has successfully navigated various market conditions and developed robust trading systems that emphasize capital preservation.',
      achievements: 'Former prop firm trader, developed multiple profitable trading strategies',
      linkedin: 'https://linkedin.com/in/alexthompson',
      twitter: 'https://twitter.com/alexthompson',
      instagram: 'https://instagram.com/alexthompson',
    },
    {
      name: 'Sarah Chen',
      specialty: 'Fundamental Analysis & Macro Trading',
      bio: '10+ years experience in global markets. Expert in central bank policies, economic indicators, and long-term trend following. Certified Financial Market Analyst with deep understanding of how geopolitical events and economic data impact currency movements.',
      achievements: 'Certified Financial Market Analyst, tracked major central bank decisions for a decade',
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen',
      instagram: 'https://instagram.com/sarahchen',
    },
    {
      name: 'Marcus Williams',
      specialty: 'Algorithmic Trading & Risk Management',
      bio: 'Former quantitative analyst at a major investment bank. Specializes in automated trading systems, portfolio risk management, and statistical arbitrage strategies. Marcus brings institutional-level quantitative approaches to retail trading.',
      achievements: 'Developed algorithmic systems used by institutional investors, risk management expert',
      linkedin: 'https://linkedin.com/in/marcuswilliams',
      twitter: 'https://twitter.com/marcuswilliams',
      instagram: 'https://instagram.com/marcuswilliams',
    },
    {
      name: 'Elena Rodriguez',
      specialty: 'Trading Psychology & Discipline',
      bio: 'Trading psychology coach with background in behavioral finance. Helps traders develop emotional discipline, decision-making frameworks, and sustainable trading habits. Elena focuses on the mental aspects that separate successful traders from those who struggle.',
      achievements: 'Coached hundreds of traders, published research on trading psychology',
      linkedin: 'https://linkedin.com/in/elenarodriguez',
      twitter: 'https://twitter.com/elenarodriguez',
      instagram: 'https://instagram.com/elenarodriguez',
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
              <span className="gradient-text">About Pipsphere</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto">
              Professional forex education built on experience, integrity, and a genuine desire to help traders develop.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <p className="text-lg leading-relaxed text-muted mb-6">
                At Pipsphere, we believe that quality forex education should be accessible, practical, and grounded in reality. Our mission is to provide traders with the knowledge, skills, and mindset needed to navigate the markets with confidence and discipline.
              </p>
              <p className="text-lg leading-relaxed text-muted mb-6">
                We don't promise overnight wealth or guaranteed profits. Instead, we focus on building solid foundations, teaching proven methodologies, and fostering a community of continuous learners who understand that successful trading is a journey, not a destination.
              </p>
              <p className="text-lg leading-relaxed text-muted">
                Our approach combines technical expertise with psychological insights, recognizing that sustainable trading success requires both skill and the right mindset.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Integrity',
                  description: 'We provide honest, realistic education without misleading claims or false promises of guaranteed returns.',
                },
                {
                  title: 'Excellence',
                  description: 'We maintain high standards in our curriculum, teaching methods, and ongoing support for our students.',
                },
                {
                  title: 'Community',
                  description: 'We foster a supportive environment where traders can learn from each other and grow together.',
                },
                {
                  title: 'Transparency',
                  description: 'We are open about our methods, risks involved in trading, and what students can realistically expect.',
                },
                {
                  title: 'Continuous Learning',
                  description: 'We believe in constant improvement and adaptation to changing market conditions.',
                },
                {
                  title: 'Student Success',
                  description: 'We measure our success by the progress and development of our students, not by sales figures.',
                },
              ].map((value, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border card-hover">
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Teaching Philosophy</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Structured Learning Paths',
                  content: 'We believe in progressive education that builds from fundamentals to advanced concepts, ensuring students have solid foundations before moving to complex strategies.',
                },
                {
                  title: 'Practical Application',
                  content: 'Theory is important, but practice is essential. Our courses include real-world examples, case studies, and opportunities to apply concepts in simulated environments.',
                },
                {
                  title: 'Risk-First Approach',
                  content: 'We prioritize risk management and capital preservation above all else. Before teaching profit strategies, we ensure students understand how to protect their capital.',
                },
                {
                  title: 'Psychological Development',
                  content: 'Trading psychology is often the difference between success and failure. We integrate mental training throughout our curriculum to help students develop discipline and emotional control.',
                },
              ].map((philosophy, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-semibold mb-3">{philosophy.title}</h3>
                  <p className="text-muted">{philosophy.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Traders */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Traders</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Learn from experienced professionals with diverse expertise and a shared commitment to quality education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {traders.map((trader, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl border border-border card-hover">
                  <div className="flex items-start mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-2xl font-bold text-white">
                        {trader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{trader.name}</h3>
                      <p className="text-primary font-medium">{trader.specialty}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted mb-4">{trader.bio}</p>
                  
                  <div className="bg-background p-4 rounded-lg mb-6">
                    <p className="text-sm">
                      <span className="font-semibold">Key Achievement:</span> {trader.achievements}
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={trader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors"
                      aria-label={`${trader.name} LinkedIn`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href={trader.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors"
                      aria-label={`${trader.name} Twitter`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a
                      href={trader.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors"
                      aria-label={`${trader.name} Instagram`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-2xl border border-primary/30">
              <h2 className="text-2xl font-bold mb-4 text-primary">Important Notice</h2>
              <p className="text-muted leading-relaxed mb-4">
                Pipsphere provides educational content and training materials for informational purposes only. The content, courses, and materials offered by Pipsphere do not constitute financial advice, investment advice, trading advice, or any other type of advice.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Trading forex, CFDs, and other leveraged products involves substantial risk of loss and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
              <p className="text-muted leading-relaxed">
                The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Learn From the Best?</h2>
            <p className="text-muted mb-8">
              Join our community and start your journey toward becoming a more informed, disciplined trader.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View Our Programs
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-card/80 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}