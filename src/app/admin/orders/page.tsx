'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Order {
  id: string
  amount: number
  currency: string
  paymentMethod: string
  paymentStatus: string
  transactionId: string | null
  cryptoNetwork: string | null
  walletAddress: string | null
  createdAt: string
  completedAt: string | null
  user: {
    id: string
    email: string
    name: string | null
  }
  plan: {
    id: string
    name: string
    price: number
    courses: {
      id: string
      title: string
    }[]
  } | null
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch orders')
      }
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true
    return order.paymentStatus === filter
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/10 text-green-500'
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'FAILED':
        return 'bg-red-500/10 text-red-500'
      case 'CANCELLED':
        return 'bg-gray-500/10 text-gray-500'
      case 'EXPIRED':
        return 'bg-orange-500/10 text-orange-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    return method === 'CARD' ? '💳' : '₿'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading orders...</p>
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
            <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
            <p className="text-muted">View and manage customer orders and payments.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-foreground hover:bg-card/80'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-card border border-border text-foreground hover:bg-card/80'
              }`}
            >
              Pending ({orders.filter((o) => o.paymentStatus === 'PENDING').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-card border border-border text-foreground hover:bg-card/80'
              }`}
            >
              Completed ({orders.filter((o) => o.paymentStatus === 'COMPLETED').length})
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'failed'
                  ? 'bg-red-500 text-white'
                  : 'bg-card border border-border text-foreground hover:bg-card/80'
              }`}
            >
              Failed ({orders.filter((o) => o.paymentStatus === 'FAILED').length})
            </button>
          </div>

          {/* Orders List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-muted">
                  {filter === 'all' 
                    ? 'No orders yet.' 
                    : `No ${filter} orders.`}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-card/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm">{order.id.slice(0, 8)}...</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{order.user.name || 'No name'}</div>
                            <div className="text-sm text-muted">{order.user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {order.plan ? (
                            <div>
                              <div className="font-medium">{order.plan.name}</div>
                              <div className="text-sm text-muted">
                                {order.plan.courses.length} course{order.plan.courses.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted">Individual course</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">
                            {order.currency === 'USD' ? '$' : ''}{order.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span>{getPaymentMethodIcon(order.paymentMethod)}</span>
                            <span className="text-sm">{order.paymentMethod}</span>
                            {order.cryptoNetwork && (
                              <span className="text-xs text-muted">({order.cryptoNetwork})</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}