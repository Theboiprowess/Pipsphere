'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const courseId = searchParams.get('courseId')
  const planId = searchParams.get('planId')

  useEffect(() => {
    if (!courseId && !planId) {
      setError('No course or plan selected')
    }
  }, [courseId, planId])

  const handleStripeCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, planId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCryptoPayment = async (network: 'TRC20' | 'ERC20') => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/crypto/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, planId, network }),
      })

      if (!response.ok) {
        throw new Error('Failed to create crypto payment')
      }

      const payment = await response.json()
      // Redirect to payment confirmation page or show QR code
      window.location.href = `/payment/${payment.orderId}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Checkout Error</h1>
          <p className="text-muted mb-6">{error}</p>
          <Link
            href="/programs"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Return to Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-card border border-border rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

        <div className="space-y-6">
          {/* Stripe Payment */}
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pay with Card</h2>
            <p className="text-muted mb-4">
              Secure payment powered by Stripe. Accepts Visa, Mastercard, and more.
            </p>
            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Continue to Stripe'}
            </button>
          </div>

          {/* Crypto Payment */}
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pay with Cryptocurrency</h2>
            <p className="text-muted mb-4">
              Pay using USDT (Tether) on TRC20 or ERC20 networks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleCryptoPayment('TRC20')}
                disabled={loading}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'USDT TRC20'}
              </button>
              <button
                onClick={() => handleCryptoPayment('ERC20')}
                disabled={loading}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'USDT ERC20'}
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-muted">
            <Link href="/programs" className="hover:text-primary transition-colors">
              Cancel and return to programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
