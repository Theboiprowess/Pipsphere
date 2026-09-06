'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Payment {
  id: string
  amount: number
  currency: string
  cryptoNetwork: string | null
  walletAddress: string | null
  transactionId: string | null
  expiresAt: string | null
  createdAt: string
  user: {
    id: string
    email: string
    name: string | null
  }
  plan: {
    id: string
    name: string
    price: number
  } | null
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/admin/payments')
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch payments')
      }
      const data = await response.json()
      setPayments(data.payments || [])
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedPayment) return

    try {
      const response = await fetch(`/api/admin/payments/${selectedPayment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          transactionId: transactionId || null,
        }),
      })

      if (response.ok) {
        setShowDetailsModal(false)
        setSelectedPayment(null)
        setTransactionId('')
        fetchPayments()
      }
    } catch (error) {
      console.error('Failed to approve payment:', error)
    }
  }

  const handleReject = async () => {
    if (!selectedPayment) return

    if (!confirm('Are you sure you want to reject this payment?')) return

    try {
      const response = await fetch(`/api/admin/payments/${selectedPayment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject' }),
      })

      if (response.ok) {
        setShowDetailsModal(false)
        setSelectedPayment(null)
        setTransactionId('')
        fetchPayments()
      }
    } catch (error) {
      console.error('Failed to reject payment:', error)
    }
  }

  const openDetailsModal = (payment: Payment) => {
    setSelectedPayment(payment)
    setTransactionId(payment.transactionId || '')
    setShowDetailsModal(true)
  }

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading payments...</p>
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
            <Link
              href="/admin"
              className="text-primary hover:text-accent transition-colors text-sm font-medium mb-2 inline-block"
            >
              ← Back to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Crypto Payment Review</h1>
            <p className="text-muted">Review and approve pending cryptocurrency payments.</p>
          </div>

          {/* Payments List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {payments.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">₿</div>
                <h3 className="text-xl font-semibold mb-2">No pending payments</h3>
                <p className="text-muted">
                  All crypto payments have been processed.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {payments.map((payment) => (
                  <div key={payment.id} className="p-6 hover:bg-card/80 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">₿</span>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full uppercase">
                            {payment.cryptoNetwork}
                          </span>
                          {isExpired(payment.expiresAt) && (
                            <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full">
                              Expired
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {payment.currency === 'USD' ? '$' : ''}{payment.amount.toFixed(2)}
                        </h3>
                        <div className="space-y-1 text-sm text-muted">
                          <p>👤 {payment.user.name || payment.user.email}</p>
                          <p>📦 {payment.plan?.name || 'Individual course'}</p>
                          <p>🔗 Wallet: {payment.walletAddress?.slice(0, 10)}...{payment.walletAddress?.slice(-4)}</p>
                          <p>📅 Created: {new Date(payment.createdAt).toLocaleString()}</p>
                          {payment.expiresAt && (
                            <p>⏰ Expires: {new Date(payment.expiresAt).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => openDetailsModal(payment)}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">Review Payment</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-background p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Amount:</span>
                    <span className="font-medium">
                      {selectedPayment.currency === 'USD' ? '$' : ''}{selectedPayment.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Network:</span>
                    <span className="font-medium">{selectedPayment.cryptoNetwork}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Wallet:</span>
                    <span className="font-medium text-xs">
                      {selectedPayment.walletAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Customer:</span>
                    <span className="font-medium">{selectedPayment.user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Plan:</span>
                    <span className="font-medium">{selectedPayment.plan?.name || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Transaction ID (optional)</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter blockchain transaction ID"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-500/90 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-500/90 transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}