import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">General Policy</h2>
              <p className="text-muted mb-4">
                At Pipsphere, we strive to provide high-quality educational content and excellent customer service. Due to the nature of digital products and educational services, our refund policy is as follows:
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Digital Courses</h2>
              <p className="text-muted mb-4">
                For individual course purchases:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li><strong>14-Day Satisfaction Guarantee:</strong> You may request a refund within 14 days of purchase if you have not completed more than 20% of the course content.</li>
                <li><strong>After 14 Days:</strong> No refunds will be issued after the 14-day period, regardless of course completion.</li>
                <li><strong>Course Completion:</strong> If you have completed more than 20% of the course content, you are not eligible for a refund.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Membership Plans</h2>
              <p className="text-muted mb-4">
                For monthly and quarterly membership plans:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li><strong>Monthly Memberships:</strong> You may cancel at any time. No refunds for partial months. You will retain access until the end of your current billing period.</li>
                <li><strong>Quarterly Memberships:</strong> You may cancel at any time. No refunds for partial quarters. You will retain access until the end of your current billing period.</li>
                <li><strong>Annual Memberships:</strong> You may request a refund within 30 days of purchase. After 30 days, no refunds will be issued.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cryptocurrency Payments</h2>
              <p className="text-muted mb-4">
                Due to the irreversible nature of cryptocurrency transactions:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>All crypto payments are final and non-refundable</li>
                <li>Refunds for crypto payments may be considered only in cases of proven technical error or service failure on our part</li>
                <li>Crypto refund requests are subject to additional verification and processing time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
              <p className="text-muted mb-4">
                To request a refund, please contact our support team at refunds@pipsphere.com with the following information:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Your order number or transaction ID</li>
                <li>Email address associated with your account</li>
                <li>Reason for refund request</li>
                <li>Any relevant supporting documentation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Refund Processing</h2>
              <p className="text-muted mb-4">
                Refund processing details:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Approved refunds are typically processed within 5-10 business days</li>
                <li>Refunds will be credited to the original payment method</li>
                <li>For crypto refunds, processing time may vary depending on network conditions</li>
                <li>You will receive a confirmation email when your refund is processed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Exceptions</h2>
              <p className="text-muted mb-4">
                Refunds may be denied in the following cases:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Abuse of the refund policy (multiple refund requests)</li>
                <li>Violation of our Terms of Service</li>
                <li>Unauthorized account sharing or content distribution</li>
                <li>Course completion beyond the eligibility threshold</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Access During Review</h2>
              <p className="text-muted">
                Your access to course content will continue during the refund review period. If your refund is approved, your access will be revoked within 24 hours of refund processing.
              </p>
            </section>

            <section className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted">
                If you have questions about our Refund Policy, please contact us at refunds@pipsphere.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}