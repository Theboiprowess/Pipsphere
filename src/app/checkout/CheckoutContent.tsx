'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CryptoNetworkValues } from '@/lib/crypto-payment'

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card')
  const [cryptoNetwork, setCryptoNetwork] = useState<string>(CryptoNetworkValues.TRC20)
  const [cryptoPayment, setCryptoPayment] = useState<any>(null)
  const [orderCreated, setOrderCreated] = useState(false)

  const courseId = searchParams.get('course')
  const planId = searchParams.get('plan')

  const productDetails = {
    course: courseId ? {
      name: 'Forex Fundamentals Course',
      price: 199,
    } : null,
    plan: planId ? {
      name: planId === 'community' ? 'Community Membership' : 'Professional Plan',
      price: planId === 'community' ? 99 : 299,
    } : null,
  }

  const product = productDetails.course || productDetails.plan

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (paymentMethod === 'card') {
        // Stripe checkout logic here
        const response = await fetch('/api/payments/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, planId }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Payment initialization failed')
        }

        if (data.url) {
          window.location.href = data.url
        }
      } else {
        // Crypto payment logic here
        const response = await fetch('/api/payments/crypto/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, planId, network: cryptoNetwork }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Crypto payment initialization failed')
        }

        setCryptoPayment(data)
        setOrderCreated(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Product</h1>
          <p className="text-muted mb-6">Please select a valid course or plan.</p>
          <button
            onClick={() => router.push('/programs')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Programs
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (paymentMethod === 'card') {
        // Stripe checkout logic here
        const response = await fetch('/api/payments/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, planId }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Payment initialization failed')
        }

        if (data.url) {
          window.location.href = data.url
        }
      } else {
        // Crypto payment logic here
        const response = await fetch('/api/payments/crypto/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, planId, network: cryptoNetwork }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Crypto payment initialization failed')
        }

        setCryptoPayment(data)
        setOrderCreated(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-sm text-muted hover:text-foreground transition-colors mb-4 inline-block"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted">Complete your purchase to get started</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-card p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted">
                  {productDetails.course ? 'Course' : 'Membership Plan'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">${product.price}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted">Subtotal</span>
              <span>${product.price}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${product.price}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-border">
            <p className="text-xs text-muted leading-relaxed">
              <strong>Risk Warning:</strong> Trading forex and other leveraged products carries substantial risk of loss. Educational content is not financial advice. Never trade with money you cannot afford to lose.
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {!orderCreated ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'crypto')}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted">Pay securely with Stripe</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="crypto"
                    checked={paymentMethod === 'crypto'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'crypto')}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Cryptocurrency (USDT)</div>
                    <div className="text-sm text-muted">Pay with USDT on TRC20 or ERC20</div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'crypto' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium mb-2">
                    Select Network
                  </label>
                  <select
                    value={cryptoNetwork}
                    onChange={(e) => setCryptoNetwork(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={CryptoNetworkValues.TRC20}>TRC20 (Tron)</option>
                    <option value={CryptoNetworkValues.ERC20}>ERC20 (Ethereum)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay $${product.price}`}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-sm text-green-500 font-medium">Payment Order Created</p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Send Payment</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted mb-1">Network</p>
                    <p className="font-medium">{cryptoNetwork}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted mb-1">Amount</p>
                    <p className="font-medium text-xl">${product.price} USDT</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted mb-1">Wallet Address</p>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-3 py-2 bg-card rounded text-sm break-all">
                        {cryptoPayment?.address}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(cryptoPayment?.address)}
                        className="px-3 py-2 bg-primary text-white rounded text-sm hover:bg-primary/90"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {cryptoPayment?.qrCode && (
                    <div className="text-center">
                      <img
                        src={cryptoPayment.qrCode}
                        alt="Payment QR Code"
                        className="mx-auto w-48 h-48"
                      />
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-muted mb-1">Transaction Reference</p>
                    <code className="px-3 py-2 bg-card rounded text-sm">
                      {cryptoPayment?.paymentId}
                    </code>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                    <p className="text-sm text-yellow-500">
                      <strong>Important:</strong> Send only the exact amount of USDT on the selected network. Sending the wrong amount or using the wrong network may result in loss of funds.
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted mb-2">Payment expires in:</p>
                    <p className="text-lg font-medium">30:00</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-card/80 transition-colors"
              >
                Cancel & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}