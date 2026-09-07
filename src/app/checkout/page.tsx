import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CheckoutContent from './CheckoutContent'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <CheckoutContent />
      </main>
      <Footer />
    </div>
  )
}
