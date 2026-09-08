'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AdminArticlesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
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

        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (!userData || userData.role !== 'ADMIN') {
          router.push('/dashboard')
          return
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading...</p>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Manage Articles</h1>
            <p className="text-muted">Create, edit, and publish educational content for the Learning Centre.</p>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Articles Management</h3>
            <p className="text-muted mb-4">
              This page will allow administrators to create and manage educational articles 
              with SEO optimization, categories, and publication controls.
            </p>
            <p className="text-sm text-muted">
              Coming soon - Full articles management interface
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
