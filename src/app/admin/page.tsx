'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalOrders: number
  pendingPayments: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalOrders: 0,
    pendingPayments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user session
        const userResponse = await fetch('/api/auth/me')
        if (!userResponse.ok) {
          router.push('/login')
          return
        }
        const userData = await userResponse.json()
        
        // Check if user is admin
        if (userData.user.role !== 'ADMIN') {
          router.push('/dashboard')
          return
        }
        
        setUser(userData.user)

        // Get admin stats
        const statsResponse = await fetch('/api/admin/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading admin dashboard...</p>
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
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted">Manage courses, users, orders, and platform content.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalUsers}</div>
              <div className="text-sm text-muted">Total Users</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalCourses}</div>
              <div className="text-sm text-muted">Total Courses</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalOrders}</div>
              <div className="text-sm text-muted">Total Orders</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-yellow-500 mb-2">{stats.pendingPayments}</div>
              <div className="text-sm text-muted">Pending Payments</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/admin/courses"
              className="bg-card p-6 rounded-xl border border-border card-hover"
            >
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-semibold mb-2">Manage Courses</h3>
              <p className="text-sm text-muted">Create and edit course content</p>
            </Link>
            <Link
              href="/admin/users"
              className="bg-card p-6 rounded-xl border border-border card-hover"
            >
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold mb-2">Manage Users</h3>
              <p className="text-sm text-muted">View and manage user accounts</p>
            </Link>
            <Link
              href="/admin/orders"
              className="bg-card p-6 rounded-xl border border-border card-hover"
            >
              <div className="text-3xl mb-4">💳</div>
              <h3 className="font-semibold mb-2">Manage Orders</h3>
              <p className="text-sm text-muted">Review and process orders</p>
            </Link>
            <Link
              href="/admin/payments"
              className="bg-card p-6 rounded-xl border border-border card-hover"
            >
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-semibold mb-2">Payment Review</h3>
              <p className="text-sm text-muted">Review crypto payments</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🆕</div>
                  <div>
                    <p className="font-medium">New user registration</p>
                    <p className="text-sm text-muted">2 minutes ago</p>
                  </div>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">User</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">💳</div>
                  <div>
                    <p className="font-medium">New order placed</p>
                    <p className="text-sm text-muted">15 minutes ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-500/10 text-green-500 px-3 py-1 rounded-full">Order</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">✅</div>
                  <div>
                    <p className="font-medium">Payment completed</p>
                    <p className="text-sm text-muted">1 hour ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-500/10 text-green-500 px-3 py-1 rounded-full">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}