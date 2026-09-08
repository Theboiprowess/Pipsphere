'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface PropChallenge {
  id: string
  firm_name: string
  account_size: number
  profit_target: number
  max_overall_drawdown: number
  max_daily_drawdown: number
  time_limit: number
  current_balance: number
  current_equity: number
  stage: string
  started_at: string
  target_completion_at: string
}

export default function PropFirmPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [challenges, setChallenges] = useState<PropChallenge[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

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

        // Fetch prop challenges
        const { data: challengesData } = await supabase
          .from('prop_challenges')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        if (challengesData) {
          setChallenges(challengesData)
        }
      } catch (error) {
        console.error('Failed to fetch prop challenges:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const calculateProgress = (challenge: PropChallenge) => {
    const targetProfit = (challenge.account_size * challenge.profit_target) / 100
    const currentProfit = challenge.current_balance - challenge.account_size
    const progress = (currentProfit / targetProfit) * 100
    
    const maxLossAllowed = (challenge.account_size * challenge.max_overall_drawdown) / 100
    const currentLoss = challenge.account_size - challenge.current_balance
    const drawdownUsed = (currentLoss / maxLossAllowed) * 100

    const dailyLossAllowed = (challenge.account_size * challenge.max_daily_drawdown) / 100
    const dailyDrawdownUsed = Math.min((currentLoss / dailyLossAllowed) * 100, 100)

    return {
      profitProgress: Math.max(0, Math.min(100, progress)),
      drawdownUsed: Math.max(0, Math.min(100, drawdownUsed)),
      dailyDrawdownUsed: Math.max(0, Math.min(100, dailyDrawdownUsed)),
      targetProfit,
      maxLossAllowed,
      dailyLossAllowed,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading prop firm challenges...</p>
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
              <h1 className="text-3xl font-bold mb-2">Prop Firm Challenge Hub</h1>
              <p className="text-muted">
                Track your prop firm evaluations with risk management guidance and support.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {showAddForm ? 'Cancel' : '+ Add Challenge'}
            </button>
          </div>

          {/* Educational Banner */}
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <h3 className="font-semibold mb-2">Challenge Preparation & Risk Management Support</h3>
                <p className="text-sm text-muted">
                  This hub helps you track your prop firm challenges with proper risk management. 
                  Remember: passing a challenge requires discipline, patience, and strict adherence to risk limits. 
                  We provide education and guidance - we do not guarantee passes or funding.
                </p>
              </div>
            </div>
          </div>

          {/* Add Challenge Form */}
          {showAddForm && (
            <div className="bg-card p-8 rounded-xl border border-border mb-8">
              <h2 className="text-xl font-bold mb-6">Add New Challenge</h2>
              <AddChallengeForm 
                onSuccess={() => {
                  setShowAddForm(false)
                  window.location.reload()
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* Challenges List */}
          {challenges.length === 0 ? (
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">No active challenges</h3>
              <p className="text-muted mb-4">
                Start tracking your prop firm challenges to monitor progress and manage risk effectively.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Add Your First Challenge
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {challenges.map((challenge) => {
                const metrics = calculateProgress(challenge)
                return (
                  <div key={challenge.id} className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{challenge.firm_name}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            challenge.stage === 'PHASE1' ? 'bg-blue-500/10 text-blue-500' :
                            challenge.stage === 'PHASE2' ? 'bg-purple-500/10 text-purple-500' :
                            challenge.stage === 'FUNDED' ? 'bg-green-500/10 text-green-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {challenge.stage.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-muted">
                          ${challenge.account_size.toLocaleString()} Account • {challenge.profit_target}% Target
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${challenge.current_balance.toLocaleString()}</div>
                        <div className="text-sm text-muted">Current Balance</div>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Profit Target Progress</span>
                          <span className="font-medium">{metrics.profitProgress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all"
                            style={{ width: `${metrics.profitProgress}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted mt-1">
                          Target: ${metrics.targetProfit.toFixed(2)} • Current: ${(challenge.current_balance - challenge.account_size).toFixed(2)}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Overall Drawdown Used</span>
                          <span className={`font-medium ${metrics.drawdownUsed > 80 ? 'text-red-500' : ''}`}>
                            {metrics.drawdownUsed.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${metrics.drawdownUsed > 80 ? 'bg-red-500' : 'bg-yellow-500'}`}
                            style={{ width: `${metrics.drawdownUsed}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted mt-1">
                          Max Allowed: ${metrics.maxLossAllowed.toFixed(2)}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Daily Drawdown Used</span>
                          <span className={`font-medium ${metrics.dailyDrawdownUsed > 80 ? 'text-red-500' : ''}`}>
                            {metrics.dailyDrawdownUsed.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${metrics.dailyDrawdownUsed > 80 ? 'bg-red-500' : 'bg-orange-500'}`}
                            style={{ width: `${metrics.dailyDrawdownUsed}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted mt-1">
                          Daily Limit: ${metrics.dailyLossAllowed.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Risk Management Reminders */}
                    <div className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20 mb-4">
                      <h4 className="font-semibold text-yellow-500 mb-2">Risk Management Reminders</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Suggested risk per trade: ${(metrics.dailyLossAllowed * 0.3).toFixed(2)} (30% of daily limit)</li>
                        <li>• Current drawdown usage: {metrics.drawdownUsed.toFixed(1)}% of maximum allowed</li>
                        <li>• Stay within daily limits to avoid challenge failure</li>
                        <li>• Focus on consistency over aggressive profit targets</li>
                      </ul>
                    </div>

                    {/* Challenge Timeline */}
                    {challenge.started_at && (
                      <div className="text-sm text-muted">
                        <strong>Started:</strong> {new Date(challenge.started_at).toLocaleDateString()}
                        {challenge.target_completion_at && (
                          <span className="ml-4">
                            <strong>Target Completion:</strong> {new Date(challenge.target_completion_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Trading Plan Checklist */}
          <div className="mt-8 bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">Prop Firm Trading Plan Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Understand all challenge rules thoroughly',
                'Calculate maximum daily loss limit',
                'Set position size for 1% or less risk per trade',
                'Identify high-probability setups only',
                'Track daily equity and balance separately',
                'Stop trading if daily loss limit approached',
                'Review trades daily for improvement',
                'Maintain consistent risk management',
                'Avoid revenge trading after losses',
                'Focus on process, not just results',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Important:</strong> This hub provides challenge preparation and risk-management support only. 
              We do not guarantee that you will pass any prop firm evaluation or become funded. 
              Prop firm trading involves substantial risk, and many traders fail to pass challenges. 
              Always read and understand the specific rules of your chosen prop firm.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function AddChallengeForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firm_name: '',
    account_size: '',
    profit_target: '10',
    max_overall_drawdown: '10',
    max_daily_drawdown: '5',
    time_limit: '',
    current_balance: '',
    current_equity: '',
    stage: 'PHASE1',
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

      const startedAt = new Date().toISOString()
      const timeLimitDays = parseInt(formData.time_limit)
      const targetCompletionAt = timeLimitDays 
        ? new Date(Date.now() + timeLimitDays * 24 * 60 * 60 * 1000).toISOString()
        : null

      const { error } = await supabase.from('prop_challenges').insert({
        user_id: session.user.id,
        firm_name: formData.firm_name,
        account_size: parseFloat(formData.account_size),
        profit_target: parseFloat(formData.profit_target),
        max_overall_drawdown: parseFloat(formData.max_overall_drawdown),
        max_daily_drawdown: parseFloat(formData.max_daily_drawdown),
        time_limit: timeLimitDays || null,
        current_balance: parseFloat(formData.current_balance) || parseFloat(formData.account_size),
        current_equity: parseFloat(formData.current_equity) || parseFloat(formData.account_size),
        stage: formData.stage,
        started_at: startedAt,
        target_completion_at: targetCompletionAt,
      })

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error adding challenge:', error)
      alert('Failed to add challenge. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Prop Firm Name *</label>
          <input
            type="text"
            required
            placeholder="e.g., FTMO, MyForexFunds"
            value={formData.firm_name}
            onChange={(e) => setFormData({ ...formData, firm_name: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Account Size (USD) *</label>
          <input
            type="number"
            required
            placeholder="100000"
            value={formData.account_size}
            onChange={(e) => setFormData({ ...formData, account_size: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Profit Target (%) *</label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.profit_target}
            onChange={(e) => setFormData({ ...formData, profit_target: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max Overall Drawdown (%) *</label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.max_overall_drawdown}
            onChange={(e) => setFormData({ ...formData, max_overall_drawdown: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max Daily Drawdown (%) *</label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.max_daily_drawdown}
            onChange={(e) => setFormData({ ...formData, max_daily_drawdown: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time Limit (days)</label>
          <input
            type="number"
            placeholder="30"
            value={formData.time_limit}
            onChange={(e) => setFormData({ ...formData, time_limit: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Current Balance (USD)</label>
          <input
            type="number"
            placeholder="100000"
            value={formData.current_balance}
            onChange={(e) => setFormData({ ...formData, current_balance: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Current Equity (USD)</label>
          <input
            type="number"
            placeholder="100000"
            value={formData.current_equity}
            onChange={(e) => setFormData({ ...formData, current_equity: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Challenge Stage</label>
          <select
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="PHASE1">Phase 1</option>
            <option value="PHASE2">Phase 2</option>
            <option value="FUNDED">Funded</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Add Challenge'}
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
