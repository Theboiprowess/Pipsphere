'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState('position-size')

  const tools = [
    { id: 'position-size', name: 'Position Size Calculator', icon: '📊' },
    { id: 'pip-value', name: 'Pip Value Calculator', icon: '💰' },
    { id: 'lot-size', name: 'Lot Size Calculator', icon: '📈' },
    { id: 'risk-reward', name: 'Risk/Reward Calculator', icon: '⚖️' },
    { id: 'drawdown', name: 'Drawdown Calculator', icon: '📉' },
    { id: 'prop-firm', name: 'Prop Firm Calculator', icon: '🎯' },
    { id: 'sessions', name: 'Trading Sessions', icon: '🌍' },
    { id: 'checklist', name: 'Pre-Trade Checklist', icon: '✅' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Trader Toolkit</h1>
            <p className="text-muted">
              Professional calculators and tools to support your trading decisions.
            </p>
          </div>

          {/* Tool Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  activeTool === tool.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-semibold text-sm">{tool.name}</div>
              </button>
            ))}
          </div>

          {/* Tool Content */}
          <div className="bg-card p-8 rounded-xl border border-border">
            {activeTool === 'position-size' && <PositionSizeCalculator />}
            {activeTool === 'pip-value' && <PipValueCalculator />}
            {activeTool === 'lot-size' && <LotSizeCalculator />}
            {activeTool === 'risk-reward' && <RiskRewardCalculator />}
            {activeTool === 'drawdown' && <DrawdownCalculator />}
            {activeTool === 'prop-firm' && <PropFirmCalculator />}
            {activeTool === 'sessions' && <TradingSessions />}
            {activeTool === 'checklist' && <PreTradeChecklist />}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Important:</strong> These tools are for educational purposes only and do not constitute financial advice. Trading involves substantial risk of loss. Always use proper risk management and never risk more than you can afford to lose.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState('')
  const [riskPercentage, setRiskPercentage] = useState('1')
  const [stopLoss, setStopLoss] = useState('')
  const [pair, setPair] = useState('EUR/USD')

  const calculatePositionSize = () => {
    const balance = parseFloat(accountBalance)
    const risk = parseFloat(riskPercentage)
    const sl = parseFloat(stopLoss)

    if (!balance || !risk || !sl) return null

    const riskAmount = (balance * risk) / 100
    const positionSize = riskAmount / sl

    return {
      riskAmount: riskAmount.toFixed(2),
      positionSize: positionSize.toFixed(2),
      lots: (positionSize / 100000).toFixed(2),
    }
  }

  const result = calculatePositionSize()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Position Size Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Account Balance (USD)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Risk Percentage (%)</label>
          <input
            type="number"
            step="0.1"
            value={riskPercentage}
            onChange={(e) => setRiskPercentage(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stop Loss (pips)</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="20"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Currency Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="EUR/USD">EUR/USD</option>
            <option value="GBP/USD">GBP/USD</option>
            <option value="USD/JPY">USD/JPY</option>
            <option value="AUD/USD">AUD/USD</option>
            <option value="USD/CAD">USD/CAD</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted">Risk Amount</div>
              <div className="text-2xl font-bold">${result.riskAmount}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Position Size</div>
              <div className="text-2xl font-bold">{result.positionSize} units</div>
            </div>
            <div>
              <div className="text-sm text-muted">Lots</div>
              <div className="text-2xl font-bold">{result.lots}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PipValueCalculator() {
  const [lotSize, setLotSize] = useState('1')
  const [pair, setPair] = useState('EUR/USD')

  const calculatePipValue = () => {
    const lots = parseFloat(lotSize)
    if (!lots) return null

    // Standard pip value calculation (simplified)
    const pipValues: Record<string, number> = {
      'EUR/USD': 10,
      'GBP/USD': 10,
      'USD/JPY': 9.09,
      'AUD/USD': 10,
      'USD/CAD': 7.25,
    }

    const pipValue = (pipValues[pair] || 10) * lots

    return {
      perPip: pipValue.toFixed(2),
      per10Pips: (pipValue * 10).toFixed(2),
      per100Pips: (pipValue * 100).toFixed(2),
    }
  }

  const result = calculatePipValue()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pip Value Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Lot Size</label>
          <input
            type="number"
            step="0.01"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            placeholder="1.0"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Currency Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="EUR/USD">EUR/USD</option>
            <option value="GBP/USD">GBP/USD</option>
            <option value="USD/JPY">USD/JPY</option>
            <option value="AUD/USD">AUD/USD</option>
            <option value="USD/CAD">USD/CAD</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted">Per Pip</div>
              <div className="text-2xl font-bold">${result.perPip}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Per 10 Pips</div>
              <div className="text-2xl font-bold">${result.per10Pips}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Per 100 Pips</div>
              <div className="text-2xl font-bold">${result.per100Pips}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LotSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState('')
  const [riskPercentage, setRiskPercentage] = useState('1')
  const [stopLossPips, setStopLossPips] = useState('')
  const [pair, setPair] = useState('EUR/USD')

  const calculateLotSize = () => {
    const balance = parseFloat(accountBalance)
    const risk = parseFloat(riskPercentage)
    const sl = parseFloat(stopLossPips)

    if (!balance || !risk || !sl) return null

    const riskAmount = (balance * risk) / 100
    const pipValue = 10 // Standard pip value for major pairs
    const lotSize = riskAmount / (sl * pipValue)

    return {
      standardLots: lotSize.toFixed(2),
      miniLots: (lotSize * 10).toFixed(2),
      microLots: (lotSize * 100).toFixed(2),
    }
  }

  const result = calculateLotSize()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Lot Size Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Account Balance (USD)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Risk Percentage (%)</label>
          <input
            type="number"
            step="0.1"
            value={riskPercentage}
            onChange={(e) => setRiskPercentage(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stop Loss (pips)</label>
          <input
            type="number"
            value={stopLossPips}
            onChange={(e) => setStopLossPips(e.target.value)}
            placeholder="20"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Currency Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="EUR/USD">EUR/USD</option>
            <option value="GBP/USD">GBP/USD</option>
            <option value="USD/JPY">USD/JPY</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted">Standard Lots</div>
              <div className="text-2xl font-bold">{result.standardLots}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Mini Lots</div>
              <div className="text-2xl font-bold">{result.miniLots}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Micro Lots</div>
              <div className="text-2xl font-bold">{result.microLots}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')

  const calculateRiskReward = () => {
    const entry = parseFloat(entryPrice)
    const sl = parseFloat(stopLoss)
    const tp = parseFloat(takeProfit)

    if (!entry || !sl || !tp) return null

    const risk = Math.abs(entry - sl)
    const reward = Math.abs(tp - entry)
    const ratio = risk > 0 ? reward / risk : 0

    return {
      risk: risk.toFixed(5),
      reward: reward.toFixed(5),
      ratio: ratio.toFixed(2),
    }
  }

  const result = calculateRiskReward()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Risk/Reward Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Entry Price</label>
          <input
            type="number"
            step="0.00001"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder="1.08500"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stop Loss</label>
          <input
            type="number"
            step="0.00001"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="1.08300"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Take Profit</label>
          <input
            type="number"
            step="0.00001"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            placeholder="1.09000"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted">Risk</div>
              <div className="text-2xl font-bold">{result.risk}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Reward</div>
              <div className="text-2xl font-bold">{result.reward}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Risk/Reward Ratio</div>
              <div className="text-2xl font-bold">1:{result.ratio}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DrawdownCalculator() {
  const [startingBalance, setStartingBalance] = useState('')
  const [currentBalance, setCurrentBalance] = useState('')

  const calculateDrawdown = () => {
    const start = parseFloat(startingBalance)
    const current = parseFloat(currentBalance)

    if (!start || !current) return null

    const drawdown = ((start - current) / start) * 100
    const recoveryNeeded = (start / current - 1) * 100

    return {
      drawdown: Math.abs(drawdown).toFixed(2),
      recoveryNeeded: recoveryNeeded.toFixed(2),
    }
  }

  const result = calculateDrawdown()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Drawdown Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Starting Balance</label>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Current Balance</label>
          <input
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            placeholder="9500"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted">Drawdown</div>
              <div className="text-2xl font-bold text-red-500">-{result.drawdown}%</div>
            </div>
            <div>
              <div className="text-sm text-muted">Recovery Needed</div>
              <div className="text-2xl font-bold text-green-500">+{result.recoveryNeeded}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PropFirmCalculator() {
  const [accountSize, setAccountSize] = useState('')
  const [profitTarget, setProfitTarget] = useState('10')
  const [maxDrawdown, setMaxDrawdown] = useState('10')
  const [dailyDrawdown, setDailyDrawdown] = useState('5')

  const calculatePropMetrics = () => {
    const size = parseFloat(accountSize)
    const target = parseFloat(profitTarget)
    const maxDD = parseFloat(maxDrawdown)
    const dailyDD = parseFloat(dailyDrawdown)

    if (!size || !target || !maxDD || !dailyDD) return null

    const targetProfit = (size * target) / 100
    const maxLossAllowed = (size * maxDD) / 100
    const dailyLossAllowed = (size * dailyDD) / 100

    return {
      targetProfit: targetProfit.toFixed(2),
      maxLossAllowed: maxLossAllowed.toFixed(2),
      dailyLossAllowed: dailyLossAllowed.toFixed(2),
      riskPerTrade: (dailyLossAllowed * 0.3).toFixed(2), // 30% of daily loss
    }
  }

  const result = calculatePropMetrics()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Prop Firm Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Account Size (USD)</label>
          <input
            type="number"
            value={accountSize}
            onChange={(e) => setAccountSize(e.target.value)}
            placeholder="100000"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Profit Target (%)</label>
          <input
            type="number"
            value={profitTarget}
            onChange={(e) => setProfitTarget(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max Overall Drawdown (%)</label>
          <input
            type="number"
            value={maxDrawdown}
            onChange={(e) => setMaxDrawdown(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max Daily Drawdown (%)</label>
          <input
            type="number"
            value={dailyDrawdown}
            onChange={(e) => setDailyDrawdown(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted">Target Profit</div>
              <div className="text-2xl font-bold text-green-500">${result.targetProfit}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Max Loss Allowed</div>
              <div className="text-2xl font-bold text-red-500">${result.maxLossAllowed}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Daily Loss Allowed</div>
              <div className="text-2xl font-bold text-yellow-500">${result.dailyLossAllowed}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Suggested Risk/Trade</div>
              <div className="text-2xl font-bold">${result.riskPerTrade}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TradingSessions() {
  const sessions = [
    {
      name: 'Sydney',
      hours: '22:00 - 06:00 UTC',
      active: 'AUD/USD, NZD/USD',
      volatility: 'Low',
      icon: '🌏',
    },
    {
      name: 'Tokyo',
      hours: '00:00 - 08:00 UTC',
      active: 'USD/JPY, EUR/JPY',
      volatility: 'Low to Medium',
      icon: '🗼',
    },
    {
      name: 'London',
      hours: '08:00 - 16:00 UTC',
      active: 'EUR/USD, GBP/USD, USD/CHF',
      volatility: 'High',
      icon: '🇬🇧',
    },
    {
      name: 'New York',
      hours: '13:00 - 21:00 UTC',
      active: 'USD/CAD, USD/JPY, EUR/USD',
      volatility: 'High',
      icon: '🗽',
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Trading Sessions</h2>
      <div className="text-muted mb-6">
        Understanding when different markets are open can help you plan your trades and identify the most volatile periods.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div key={session.name} className="bg-background p-6 rounded-xl border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{session.icon}</div>
              <div>
                <h3 className="text-xl font-bold">{session.name}</h3>
                <p className="text-sm text-muted">{session.hours}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Active Pairs:</span>
                <span className="font-medium">{session.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Volatility:</span>
                <span className="font-medium">{session.volatility}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-primary/5 p-6 rounded-xl border border-primary/20">
        <h3 className="font-semibold mb-2">Session Overlaps</h3>
        <ul className="space-y-2 text-sm">
          <li>• <strong>London/Tokyo (02:00-04:00 UTC):</strong> Low volatility, good for careful analysis</li>
          <li>• <strong>London/New York (13:00-16:00 UTC):</strong> Highest volatility, most trading opportunities</li>
          <li>• <strong>Sydney/Tokyo (00:00-06:00 UTC):</strong> Moderate volatility, Asian market focus</li>
        </ul>
      </div>
    </div>
  )
}

function PreTradeChecklist() {
  const [items, setItems] = useState([
    { id: 1, text: 'Market analysis completed', checked: false },
    { id: 2, text: 'Trading plan defined', checked: false },
    { id: 3, text: 'Risk/reward ratio acceptable (1:2 or better)', checked: false },
    { id: 4, text: 'Position size calculated (1-2% risk)', checked: false },
    { id: 5, text: 'Stop loss set at logical level', checked: false },
    { id: 6, text: 'Take profit target identified', checked: false },
    { id: 7, text: 'No major news events scheduled', checked: false },
    { id: 8, text: 'Emotional state is calm and focused', checked: false },
    { id: 9, text: 'Trading journal ready for entry', checked: false },
    { id: 10, text: 'Accept potential loss before entry', checked: false },
  ])

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const allChecked = items.every(item => item.checked)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pre-Trade Checklist</h2>
      <div className="text-muted mb-6">
        Complete this checklist before every trade to ensure disciplined execution.
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              item.checked
                ? 'border-green-500 bg-green-500/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              className="w-5 h-5 rounded"
            />
            <span className={item.checked ? 'line-through text-muted' : ''}>
              {item.text}
            </span>
          </label>
        ))}
      </div>

      {allChecked && (
        <div className="mt-6 bg-green-500/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center gap-4">
            <div className="text-4xl">✅</div>
            <div>
              <h3 className="font-semibold text-green-500">Ready to Trade</h3>
              <p className="text-sm text-muted">
                All checklist items completed. You're prepared for disciplined execution.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
