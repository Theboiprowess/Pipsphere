import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted">
                By accessing or using Pipsphere Forex Academy services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Educational Nature of Services</h2>
              <p className="text-muted mb-4">
                Pipsphere Forex Academy provides educational content and training materials for informational purposes only. The content, courses, and materials offered by Pipsphere Forex Academy:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Do not constitute financial advice, investment advice, or trading advice</li>
                <li>Are not guarantees of future performance or results</li>
                <li>Should not be considered as personalized investment recommendations</li>
                <li>Do not take into account your individual financial situation or risk tolerance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Risk Disclaimer</h2>
              <p className="text-muted mb-4">
                Trading forex, CFDs, and other leveraged products involves substantial risk of loss and may not be suitable for all investors. You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>The high degree of leverage can work against you as well as for you</li>
                <li>You may sustain a loss of some or all of your initial investment</li>
                <li>You should not invest money that you cannot afford to lose</li>
                <li>Past performance is not indicative of future results</li>
                <li>You are solely responsible for your trading decisions and outcomes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. User Accounts</h2>
              <p className="text-muted mb-4">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
              <p className="text-muted mb-4">
                Payments for courses and memberships are processed through third-party payment providers. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Provide accurate payment information</li>
                <li>Pay all fees associated with your purchases</li>
                <li>Comply with payment provider terms</li>
                <li>Understand that crypto payments are irreversible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Refund Policy</h2>
              <p className="text-muted">
                Refunds are handled on a case-by-case basis. Please refer to our Refund Policy for detailed information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-muted">
                All content, materials, and intellectual property on Pipsphere Forex Academy are owned by us or our licensors and are protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted">
                Pipsphere Forex Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className="text-muted">
                We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-muted">
                We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
              <p className="text-muted">
                For questions about these Terms of Service, please contact us at legal@pipsphere.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}