'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image: string
  published_at: string
  author_name?: string
}

export default function LearningPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [email, setEmail] = useState('')
  const [showStarterKit, setShowStarterKit] = useState(false)

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'BEGINNER', label: 'Beginner Guides' },
    { value: 'RISK_MANAGEMENT', label: 'Risk Management' },
    { value: 'PSYCHOLOGY', label: 'Trading Psychology' },
    { value: 'TECHNICAL', label: 'Technical Analysis' },
    { value: 'PROP_FIRM', label: 'Prop Firm Guides' },
    { value: 'MARKET_OUTLOOK', label: 'Market Outlook' },
  ]

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: articlesData } = await supabase
          .from('articles')
          .select(`
            *,
            trader:traders(name)
          `)
          .eq('published', true)
          .order('published_at', { ascending: false })

        if (articlesData) {
          setArticles(articlesData.map(a => ({
            ...a,
            author_name: a.trader?.name,
          })))
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = categoryFilter === 'all' 
    ? articles 
    : articles.filter(article => article.category === categoryFilter)

  const handleStarterKitSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would integrate with an email service
    alert('Thank you! Your Forex Starter Kit will be sent to: ' + email)
    setShowStarterKit(false)
    setEmail('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading learning resources...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Learning Centre</h1>
            <p className="text-muted">
              Comprehensive forex education, guides, and market insights from professional traders.
            </p>
          </div>

          {/* Forex Starter Kit CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">📚 Free Forex Starter Kit</h2>
                <p className="text-muted mb-6">
                  Get our comprehensive starter kit including beginner guides, risk management templates, 
                  trading checklists, and more. Perfect for new traders looking to build a solid foundation.
                </p>
                {!showStarterKit ? (
                  <button
                    onClick={() => setShowStarterKit(true)}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Get Free Starter Kit
                  </button>
                ) : (
                  <form onSubmit={handleStarterKitSignup} className="flex gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Send Kit
                    </button>
                  </form>
                )}
              </div>
              <div className="text-6xl ml-8 hidden md:block">📦</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setCategoryFilter(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  categoryFilter === category.value
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border hover:bg-card/80'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
              <p className="text-muted">
                We're creating educational content. Check back soon for forex guides and tutorials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/learning/${article.slug}`}
                  className="bg-card rounded-xl border border-border overflow-hidden card-hover block"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {article.image ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">📊</span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                      {article.category.replace('_', ' ')}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{article.author_name || 'Pipsphere Team'}</span>
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Learning Topics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Learning Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="font-semibold mb-2">Beginner Forex</h3>
                <p className="text-sm text-muted mb-4">
                  Market basics, terminology, reading charts, and placing your first trades.
                </p>
                <button
                  onClick={() => setCategoryFilter('BEGINNER')}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View Beginner Guides →
                </button>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">⚖️</div>
                <h3 className="font-semibold mb-2">Risk Management</h3>
                <p className="text-sm text-muted mb-4">
                  Position sizing, stop losses, risk-reward ratios, and capital preservation.
                </p>
                <button
                  onClick={() => setCategoryFilter('RISK_MANAGEMENT')}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View Risk Management →
                </button>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="font-semibold mb-2">Trading Psychology</h3>
                <p className="text-sm text-muted mb-4">
                  Emotional discipline, patience, decision-making, and mindset development.
                </p>
                <button
                  onClick={() => setCategoryFilter('PSYCHOLOGY')}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View Psychology Guides →
                </button>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="font-semibold mb-2">Technical Analysis</h3>
                <p className="text-sm text-muted mb-4">
                  Chart patterns, indicators, support/resistance, and multi-timeframe analysis.
                </p>
                <button
                  onClick={() => setCategoryFilter('TECHNICAL')}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View Technical Analysis →
                </button>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Prop Firm Guides</h3>
                <p className="text-sm text-muted mb-4">
                  Challenge preparation, risk rules, trading plans, and evaluation strategies.
                </p>
                <button
                  onClick={() => setCategoryFilter('PROP_FIRM')}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View Prop Firm Guides →
                </button>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="font-semibold mb-2">Market Outlook</h3>
                <p className="text-sm text-muted mb-4">
                  Weekly market analysis, economic calendar, and fundamental factors.
                </p>
                <button
                  onClick={() => setCategoryFilter('MARKET_OUTLOOK')}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View Market Outlook →
                </button>
              </div>
            </div>
          </div>

          {/* Forex Glossary */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="font-semibold mb-4">Quick Forex Glossary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Pip:</strong> The smallest price move in forex, typically 0.0001 for most pairs.
              </div>
              <div>
                <strong>Lot:</strong> Standard unit of trade size. Standard lot = 100,000 units.
              </div>
              <div>
                <strong>Spread:</strong> Difference between bid and ask prices.
              </div>
              <div>
                <strong>Leverage:</strong> Using borrowed capital to increase trading position size.
              </div>
              <div>
                <strong>Margin:</strong> Required collateral to open and maintain positions.
              </div>
              <div>
                <strong>Long/Short:</strong> Buying (long) or selling (short) a currency pair.
              </div>
            </div>
            <Link
              href="/learning/glossary"
              className="inline-block mt-4 text-primary text-sm font-medium hover:text-accent transition-colors"
            >
              View Full Glossary →
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Important:</strong> All educational content is for informational purposes only and does not constitute financial advice. 
              Trading involves substantial risk of loss. Always conduct your own analysis and use proper risk management.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
