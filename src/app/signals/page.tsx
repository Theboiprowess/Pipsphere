'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Signal {
  id: string
  instrument: string
  bias: string
  entry_zone: string
  stop_loss: string
  target_levels: string[]
  risk_level: string
  status: string
  reasoning: string
  trader_id: string
  trader_name?: string
  published_at: string
  expires_at: string
  closed_at: string
  outcome: string
}

export default function SignalsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [signals, setSignals] = useState<Signal[]>([])
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('active')
  const [instrumentFilter, setInstrumentFilter] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
          return
        }

        setUser(session.user)

        // Check for active signals subscription
        const { data: subs } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .single()

        setHasActiveSubscription(!!subs)

        // Fetch signals
        const { data: signalsData } = await supabase
          .from('signals')
          .select(`
            *,
            trader:traders(name)
          `)
          .order('published_at', { ascending: false })

        if (signalsData) {
          setSignals(signalsData)
        }
      } catch (error) {
        console.error('Failed to fetch signals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const filteredSignals = signals.filter(signal => {
    const statusMatch = filter === 'all' || signal.status === filter.toUpperCase()
    const instrumentMatch = instrumentFilter === 'all' || signal.instrument === instrumentFilter
    return statusMatch && instrumentMatch
  })

  const instruments = [...new Set(signals.map(s => s.instrument))]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading signals...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h1 className="text-2xl font-bold mb-4">Premium Signals Hub</h1>
              <p className="text-muted mb-6">
                Access to our signals hub requires an active Forex Signals subscription ($199/month).
                Get daily market analysis, trade ideas, and educational commentary from our professional traders.
              </p>
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-6">
                <h3 className="font-semibold mb-2">What's Included:</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Daily market analysis and trade setups</li>
                  <li>• Entry zones, stop losses, and target levels</li>
                  <li>• Risk management guidance</li>
                  <li>• Educational reasoning for each signal</li>
                  <li>• Complete archive of all signals (wins and losses)</li>
                  <li>• Real-time status updates</li>
                </ul>
              </div>
              <button
                onClick={() => router.push('/checkout?plan=signals')}
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Subscribe to Signals - $199/month
              </button>
            </div>
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
            <h1 className="text-3xl font-bold mb-2">Premium Signals Hub</h1>
            <p className="text-muted">
              Educational market analysis and trade ideas from our professional traders.
            </p>
          </div>

          {/* Important Disclaimer */}
          <div className="bg-yellow-500/5 p-6 rounded-xl border border-yellow-500/20 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="font-semibold text-yellow-500 mb-2">Important Notice</h3>
                <p className="text-sm text-muted">
                  Pipsphere signals are educational market commentary and do not constitute financial or investment advice. 
                  Trading involves substantial risk, and results are not guaranteed. 
                  Past performance does not guarantee future results. 
                  Always use proper risk management and never risk more than you can afford to lose.
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex gap-2">
              {['all', 'active', 'closed', 'cancelled', 'expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border hover:bg-card/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <select
              value={instrumentFilter}
              onChange={(e) => setInstrumentFilter(e.target.value)}
              className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Instruments</option>
              {instruments.map(inst => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          {/* Signals List */}
          {filteredSignals.length === 0 ? (
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">No signals found</h3>
              <p className="text-muted">
                Check back later for new market analysis and trade ideas.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSignals.map((signal) => (
                <div key={signal.id} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{signal.instrument}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          signal.bias === 'LONG' ? 'bg-green-500/10 text-green-500' :
                          signal.bias === 'SHORT' ? 'bg-red-500/10 text-red-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {signal.bias}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          signal.status === 'ACTIVE' ? 'bg-blue-500/10 text-blue-500' :
                          signal.status === 'CLOSED' ? 'bg-gray-500/10 text-gray-500' :
                          signal.status === 'CANCELLED' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {signal.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted">
                        Published: {new Date(signal.published_at).toLocaleString()}
                        {signal.expires_at && ` • Expires: ${new Date(signal.expires_at).toLocaleString()}`}
                      </p>
                      {signal.trader_name && (
                        <p className="text-sm text-muted">By: {signal.trader_name}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted mb-1">Risk Level</div>
                      <div className="font-semibold">{signal.risk_level || 'Medium'}</div>
                    </div>
                  </div>

                  {/* Trade Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-sm text-muted mb-1">Entry Zone</div>
                      <div className="font-semibold">{signal.entry_zone || 'N/A'}</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-sm text-muted mb-1">Stop Loss</div>
                      <div className="font-semibold text-red-500">{signal.stop_loss || 'N/A'}</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-sm text-muted mb-1">Target Levels</div>
                      <div className="font-semibold text-green-500">
                        {signal.target_levels?.join(', ') || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Educational Reasoning */}
                  {signal.reasoning && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Educational Reasoning</h4>
                      <p className="text-sm text-muted whitespace-pre-line">{signal.reasoning}</p>
                    </div>
                  )}

                  {/* Outcome for closed signals */}
                  {signal.status === 'CLOSED' && (
                    <div className={`p-4 rounded-lg ${
                      signal.outcome === 'WIN' ? 'bg-green-500/10 border border-green-500/20' :
                      signal.outcome === 'LOSS' ? 'bg-red-500/10 border border-red-500/20' :
                      'bg-yellow-500/10 border border-yellow-500/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">Signal Outcome</h4>
                          <p className="text-sm text-muted">
                            Closed: {signal.closed_at ? new Date(signal.closed_at).toLocaleString() : 'N/A'}
                          </p>
                        </div>
                        <div className={`text-2xl font-bold ${
                          signal.outcome === 'WIN' ? 'text-green-500' :
                          signal.outcome === 'LOSS' ? 'text-red-500' :
                          'text-yellow-500'
                        }`}>
                          {signal.outcome || 'N/A'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Performance Summary */}
          <div className="mt-8 bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">Performance Summary (Last 30 Days)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted">Total Signals</div>
                <div className="text-2xl font-bold">{signals.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted">Win Rate</div>
                <div className="text-2xl font-bold">
                  {signals.filter(s => s.status === 'CLOSED' && s.outcome === 'WIN').length > 0
                    ? Math.round(
                        (signals.filter(s => s.status === 'CLOSED' && s.outcome === 'WIN').length /
                         signals.filter(s => s.status === 'CLOSED').length) * 100
                      )
                    : 0}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted">Active Signals</div>
                <div className="text-2xl font-bold">{signals.filter(s => s.status === 'ACTIVE').length}</div>
              </div>
              <div>
                <div className="text-sm text-muted">Closed Signals</div>
                <div className="text-2xl font-bold">{signals.filter(s => s.status === 'CLOSED').length}</div>
              </div>
            </div>
            <p className="text-xs text-muted mt-4">
              * Performance data is for educational purposes only and does not guarantee future results.
            </p>
          </div>

          {/* Archive Notice */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <h3 className="font-semibold mb-2">Transparent Archive</h3>
            <p className="text-sm text-muted">
              We maintain a complete archive of all signals, including wins, losses, breakevens, and cancelled ideas. 
              We do not selectively delete or hide unfavorable results. This transparency helps you understand the realistic 
              nature of trading and the importance of proper risk management.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
