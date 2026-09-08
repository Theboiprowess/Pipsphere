'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function HowWeTradePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">How We Trade</h1>
            <p className="text-muted text-lg">
              Our educational philosophy, markets covered, trading sessions, risk principles, and methods.
            </p>
          </div>

          {/* Educational Philosophy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Educational Philosophy</h2>
            <div className="bg-card p-6 rounded-xl border border-border">
              <p className="text-muted mb-4">
                At Pipsphere Forex Academy, we believe that successful trading is built on education, discipline, and risk management—not shortcuts or guaranteed profits. Our approach emphasizes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span><strong>Process Over Results:</strong> Teaching traders to focus on executing their trading plan consistently rather than chasing profits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span><strong>Risk-First Approach:</strong> Capital preservation is the priority. We teach position sizing, stop losses, and risk-reward ratios before profit strategies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span><strong>Realistic Expectations:</strong> Trading is challenging. We prepare students for the psychological and emotional demands of real trading.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span><strong>Continuous Learning:</strong> Markets evolve, and so should traders. We encourage ongoing education and adaptation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span><strong>Transparency:</strong> We share both wins and losses to provide a realistic view of trading performance.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Markets Covered */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Markets We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Major Currency Pairs</h3>
                <p className="text-sm text-muted mb-2">EUR/USD, GBP/USD, USD/JPY, USD/CHF</p>
                <p className="text-sm text-muted">High liquidity, tight spreads, ideal for beginners and experienced traders alike.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Minor Currency Pairs</h3>
                <p className="text-sm text-muted mb-2">EUR/GBP, EUR/JPY, GBP/JPY, AUD/USD</p>
                <p className="text-sm text-muted">Additional opportunities with slightly higher volatility and spread costs.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Commodity Pairs</h3>
                <p className="text-sm text-muted mb-2">AUD/USD, NZD/USD, USD/CAD, USD/SGD</p>
                <p className="text-sm text-muted">Influenced by commodity prices and economic factors from resource-rich nations.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Cross Pairs</h3>
                <p className="text-sm text-muted mb-2">EUR/GBP, GBP/JPY, EUR/CHF, AUD/JPY</p>
                <p className="text-sm text-muted">Pairs that don't involve the USD, offering diversification and unique opportunities.</p>
              </div>
            </div>
          </section>

          {/* Trading Sessions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Trading Sessions We Focus On</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">London Session (08:00 - 16:00 UTC)</h3>
                <p className="text-sm text-muted">
                  The most active trading session with high volatility and liquidity. We focus on major pairs during this overlap with the US session for the best opportunities.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">New York Session (13:00 - 21:00 UTC)</h3>
                <p className="text-sm text-muted">
                  Overlaps with London for peak volatility (13:00-16:00 UTC). We analyze USD pairs and economic news releases during this session.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-2">Asian Session (00:00 - 08:00 UTC)</h3>
                <p className="text-sm text-muted">
                  Lower volatility but offers opportunities in JPY pairs and AUD/USD. We use this session for analysis and preparation for London open.
                </p>
              </div>
            </div>
          </section>

          {/* Risk Principles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Risk Management Principles</h2>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">1% Rule</h3>
                  <p className="text-sm text-muted">
                    Never risk more than 1-2% of your account on any single trade. This ensures that a series of losses won't significantly impact your capital.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Positive Risk-Reward Ratios</h3>
                  <p className="text-sm text-muted">
                    We only take trades with at least 1:2 risk-reward ratios, meaning the potential profit is at least twice the potential loss.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Stop Loss Placement</h3>
                  <p className="text-sm text-muted">
                    Stop losses are placed at logical technical levels, not arbitrary points. They represent the point where our trade thesis is invalid.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Position Sizing</h3>
                  <p className="text-sm text-muted">
                    Position size is calculated based on the stop loss distance and risk percentage, ensuring consistent risk across all trades.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Daily Loss Limits</h3>
                  <p className="text-sm text-muted">
                    We stop trading if daily losses exceed a set threshold (typically 3-5% of account) to prevent emotional decision-making.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Trading Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Trading Methods We Teach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Price Action Trading</h3>
                <p className="text-sm text-muted">
                  Reading raw market data without indicators. We teach candlestick patterns, support/resistance, trend analysis, and market structure.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Trend Following</h3>
                <p className="text-sm text-muted">
                  Identifying and trading with the dominant trend using moving averages, trend lines, and momentum indicators for confirmation.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Breakout Trading</h3>
                <p className="text-sm text-muted">
                  Trading breakouts from consolidation ranges with proper entry timing, stop loss placement, and profit targets.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-3">Swing Trading</h3>
                <p className="text-sm text-muted">
                  Capturing medium-term moves over days to weeks, focusing on higher timeframes for analysis and lower timeframes for entry.
                </p>
              </div>
            </div>
          </section>

          {/* Important Notice */}
          <section className="mb-12">
            <div className="bg-yellow-500/5 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="font-semibold text-yellow-500 mb-4">Important Notice</h3>
              <p className="text-sm text-muted mb-4">
                The methods and principles described above are for educational purposes only. They do not constitute financial advice, 
                and past performance does not guarantee future results. Trading involves substantial risk of loss, and you should 
                only trade with capital you can afford to lose.
              </p>
              <p className="text-sm text-muted">
                Every trader has different risk tolerance, capital, and psychological makeup. What works for our traders may not 
                work for you. Always test strategies on demo accounts before risking real capital.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
