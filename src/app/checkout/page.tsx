'use client'

import { Suspense } from 'react'
import CheckoutContent from './CheckoutContent'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading checkout...</p>
          </div>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  )
}