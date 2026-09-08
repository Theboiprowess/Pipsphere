'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface JournalEntry {
  id: string
  trade_date: string
  currency_pair: string
  direction: string
  setup: string
  entry_price: number
  stop_loss: number
  take_profit: number
  exit_price: number
  lot_size: number
  risk_percentage: number
  risk_reward_ratio: number
  result: string
  screenshot_url: string
  thesis: string
  emotions_before: string
  emotions_after: string
  lesson_learned: string
}

interface JournalAnalytics {
  total_trades: number
  win_rate: number
  avg_risk_reward: number
  best_setup: string
  weakest_setup: string
  total_pips: number
}

export default function JournalPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [analytics, setAnalytics] = useState<JournalAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState('all')

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

        // Fetch journal entries
        const { data: journalData } = await supabase
          .from('trading_journal')
          .select('*')
          .eq('user_id', session.user.id)
          .order('trade_date', { ascending: false })

        if (journalData) {
          setEntries(journalData)
          calculateAnalytics(journalData)
        }
      } catch (error) {
        console.error('Failed to fetch journal data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const calculateAnalytics = (data: JournalEntry[]) => {
    const closedTrades = data.filter(entry => entry.result !== 'OPEN')
    const totalTrades = closedTrades.length
    const wins = closedTrades.filter(entry => entry.result === 'WIN').length
    const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0
    
    const avgRR = closedTrades.length > 0 
      ? closedTrades.reduce((acc, entry) => acc + (entry.risk_reward_ratio || 0), 0) / closedTrades.length 
      : 0

    // Calculate setup performance
    const setupPerformance: Record<string, { wins: number; total: number }> = {}
    closedTrades.forEach(entry => {
      if (entry.setup) {
        if (!setupPerformance[entry.setup]) {
          setupPerformance[entry.setup] = { wins: 0, total: 0 }
        }
        setupPerformance[entry.setup].total++
        if (entry.result === 'WIN') {
          setupPerformance[entry.setup].wins++
        }
      }
    })

    let bestSetup = 'N/A'
    let weakestSetup = 'N/A'
    let bestWinRate = 0
    let worstWinRate = 100

    Object.entries(setupPerformance).forEach(([setup, stats]) => {
      const winRate = (stats.wins / stats.total) * 100
      if (winRate > bestWinRate && stats.total >= 3) {
        bestWinRate = winRate
        bestSetup = setup
      }
      if (winRate < worstWinRate && stats.total >= 3) {
        worstWinRate = winRate
        weakestSetup = setup
      }
    })

    setAnalytics({
      total_trades: totalTrades,
      win_rate: Math.round(winRate),
      avg_risk_reward: Math.round(avgRR * 100) / 100,
      best_setup: bestSetup,
      weakest_setup: weakestSetup,
      total_pips: 0, // Would need actual pip calculation
    })
  }

  const filteredEntries = filter === 'all' 
    ? entries 
    : entries.filter(entry => entry.result === filter)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading your trading journal...</p>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Trading Journal</h1>
              <p className="text-muted">
                Track your trades, analyze performance, and improve your strategy.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {showAddForm ? 'Cancel' : '+ Add Entry'}
            </button>
          </div>

          {/* Analytics Overview */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">{analytics.total_trades}</div>
                <div className="text-sm text-muted">Total Trades</div>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">{analytics.win_rate}%</div>
                <div className="text-sm text-muted">Win Rate</div>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1:{analytics.avg_risk_reward}</div>
                <div className="text-sm text-muted">Avg Risk/Reward</div>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">
                  {entries.filter(e => e.result === 'OPEN').length}
                </div>
                <div className="text-sm text-muted">Open Positions</div>
              </div>
            </div>
          )}

          {/* Setup Performance */}
          {analytics && (analytics.best_setup !== 'N/A' || analytics.weakest_setup !== 'N/A') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-green-500">Best Performing Setup</h3>
                <p className="text-2xl font-bold">{analytics.best_setup}</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2 text-red-500">Weakest Setup</h3>
                <p className="text-2xl font-bold">{analytics.weakest_setup}</p>
              </div>
            </div>
          )}

          {/* Add Entry Form */}
          {showAddForm && (
            <div className="bg-card p-8 rounded-xl border border-border mb-8">
              <h2 className="text-xl font-bold mb-6">Add Journal Entry</h2>
              <AddJournalForm 
                onSuccess={() => {
                  setShowAddForm(false)
                  // Refresh data
                  window.location.reload()
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['all', 'WIN', 'LOSS', 'BREAKEVEN', 'OPEN'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border hover:bg-card/80'
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Journal Entries */}
          {filteredEntries.length === 0 ? (
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No journal entries yet</h3>
              <p className="text-muted mb-4">
                Start tracking your trades to build your trading journal and improve your performance.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Add Your First Entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{entry.currency_pair}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.result === 'WIN' ? 'bg-green-500/10 text-green-500' :
                          entry.result === 'LOSS' ? 'bg-red-500/10 text-red-500' :
                          entry.result === 'BREAKEVEN' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          {entry.result}
                        </span>
                        <span className="text-sm text-muted">
                          {entry.direction}
                        </span>
                      </div>
                      <p className="text-sm text-muted">
                        {new Date(entry.trade_date).toLocaleDateString()} • {entry.setup || 'No setup'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted mb-1">R:R</div>
                      <div className="font-semibold">1:{entry.risk_reward_ratio || 'N/A'}</div>
                    </div>
                  </div>

                  {entry.thesis && (
                    <div className="mb-4">
                      <p className="text-sm text-muted mb-1">Trade Thesis:</p>
                      <p className="text-sm">{entry.thesis}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted">Entry:</span>
                      <span className="ml-1 font-medium">{entry.entry_price || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-muted">Stop Loss:</span>
                      <span className="ml-1 font-medium">{entry.stop_loss || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-muted">Take Profit:</span>
                      <span className="ml-1 font-medium">{entry.take_profit || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-muted">Risk:</span>
                      <span className="ml-1 font-medium">{entry.risk_percentage || 0}%</span>
                    </div>
                  </div>

                  {entry.lesson_learned && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted mb-1">Key Lesson:</p>
                      <p className="text-sm italic">{entry.lesson_learned}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Important:</strong> This trading journal is for educational purposes only. It is not investment advice, profit tracking, or a guarantee of future results. Trading involves substantial risk of loss.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function AddJournalForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    trade_date: new Date().toISOString().split('T')[0],
    currency_pair: '',
    direction: 'BUY',
    setup: '',
    entry_price: '',
    stop_loss: '',
    take_profit: '',
    exit_price: '',
    lot_size: '',
    risk_percentage: '',
    result: 'OPEN',
    thesis: '',
    emotions_before: '',
    emotions_after: '',
    lesson_learned: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const entry_price = parseFloat(formData.entry_price)
      const stop_loss = parseFloat(formData.stop_loss)
      const take_profit = parseFloat(formData.take_profit)
      
      // Calculate risk/reward ratio
      let risk_reward_ratio = 0
      if (entry_price && stop_loss && take_profit) {
        const risk = Math.abs(entry_price - stop_loss)
        const reward = Math.abs(take_profit - entry_price)
        risk_reward_ratio = risk > 0 ? reward / risk : 0
      }

      const { error } = await supabase.from('trading_journal').insert({
        user_id: session.user.id,
        trade_date: formData.trade_date,
        currency_pair: formData.currency_pair.toUpperCase(),
        direction: formData.direction,
        setup: formData.setup,
        entry_price: entry_price || null,
        stop_loss: stop_loss || null,
        take_profit: take_profit || null,
        exit_price: formData.exit_price ? parseFloat(formData.exit_price) : null,
        lot_size: formData.lot_size ? parseFloat(formData.lot_size) : null,
        risk_percentage: formData.risk_percentage ? parseFloat(formData.risk_percentage) : null,
        risk_reward_ratio,
        result: formData.result,
        thesis: formData.thesis,
        emotions_before: formData.emotions_before,
        emotions_after: formData.emotions_after,
        lesson_learned: formData.lesson_learned,
      })

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error adding journal entry:', error)
      alert('Failed to add journal entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Trade Date *</label>
          <input
            type="date"
            required
            value={formData.trade_date}
            onChange={(e) => setFormData({ ...formData, trade_date: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Currency Pair *</label>
          <input
            type="text"
            required
            placeholder="EUR/USD"
            value={formData.currency_pair}
            onChange={(e) => setFormData({ ...formData, currency_pair: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Direction *</label>
          <select
            value={formData.direction}
            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="BUY">BUY (Long)</option>
            <option value="SELL">SELL (Short)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Setup/Strategy</label>
          <input
            type="text"
            placeholder="e.g., Breakout, Pullback"
            value={formData.setup}
            onChange={(e) => setFormData({ ...formData, setup: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Entry Price</label>
          <input
            type="number"
            step="0.00001"
            placeholder="1.08500"
            value={formData.entry_price}
            onChange={(e) => setFormData({ ...formData, entry_price: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stop Loss</label>
          <input
            type="number"
            step="0.00001"
            placeholder="1.08300"
            value={formData.stop_loss}
            onChange={(e) => setFormData({ ...formData, stop_loss: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Take Profit</label>
          <input
            type="number"
            step="0.00001"
            placeholder="1.09000"
            value={formData.take_profit}
            onChange={(e) => setFormData({ ...formData, take_profit: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Exit Price</label>
          <input
            type="number"
            step="0.00001"
            placeholder="1.08800"
            value={formData.exit_price}
            onChange={(e) => setFormData({ ...formData, exit_price: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Lot Size</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.10"
            value={formData.lot_size}
            onChange={(e) => setFormData({ ...formData, lot_size: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Risk Percentage</label>
          <input
            type="number"
            step="0.1"
            placeholder="1.0"
            value={formData.risk_percentage}
            onChange={(e) => setFormData({ ...formData, risk_percentage: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Result</label>
          <select
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="OPEN">Open</option>
            <option value="WIN">Win</option>
            <option value="LOSS">Loss</option>
            <option value="BREAKEVEN">Breakeven</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Trade Thesis</label>
        <textarea
          rows={3}
          placeholder="Why did you take this trade? What was your reasoning?"
          value={formData.thesis}
          onChange={(e) => setFormData({ ...formData, thesis: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Emotions Before Trade</label>
          <textarea
            rows={2}
            placeholder="How did you feel before entering?"
            value={formData.emotions_before}
            onChange={(e) => setFormData({ ...formData, emotions_before: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Emotions After Trade</label>
          <textarea
            rows={2}
            placeholder="How did you feel after exiting?"
            value={formData.emotions_after}
            onChange={(e) => setFormData({ ...formData, emotions_after: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Key Lesson Learned</label>
        <textarea
          rows={2}
          placeholder="What did you learn from this trade?"
          value={formData.lesson_learned}
          onChange={(e) => setFormData({ ...formData, lesson_learned: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-card/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
