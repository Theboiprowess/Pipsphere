import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function RiskDisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">⚠️</div>
              <h1 className="text-3xl font-bold text-red-500">Risk Disclaimer</h1>
            </div>
            <p className="text-red-500 font-semibold">
              Please read this disclaimer carefully before using Pipsphere services.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Trading Involves Substantial Risk</h2>
              <p className="text-muted mb-4">
                Trading forex, contracts for differences (CFDs), and other leveraged financial instruments carries a high level of risk and may not be suitable for all investors. Before deciding to trade these instruments, you should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Risks to Understand</h2>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li><strong>Leverage Risk:</strong> The high degree of leverage can work against you as well as for you. Leverage can amplify both gains and losses.</li>
                <li><strong>Market Volatility:</strong> Financial markets can be highly volatile and unpredictable. Prices can change rapidly.</li>
                <li><strong>Capital Loss:</strong> You may sustain a loss of some or all of your initial investment. Never trade with money you cannot afford to lose.</li>
                <li><strong>Technical Issues:</strong> Internet connectivity, platform failures, or other technical issues may affect your ability to trade.</li>
                <li><strong>Psychological Factors:</strong> Emotional decision-making can lead to poor trading decisions and substantial losses.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Educational Content Only</h2>
              <p className="text-muted mb-4">
                Pipsphere provides educational content and training materials for informational purposes only. By using our services, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>All content is for educational purposes and does not constitute financial advice</li>
                <li>We do not provide personalized investment recommendations</li>
                <li>Past performance of any trading strategy or system is not indicative of future results</li>
                <li>We do not guarantee profits or promise specific returns</li>
                <li>You are solely responsible for your trading decisions and their outcomes</li>
                <li>You should consult with a qualified financial advisor before making investment decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No Warranties</h2>
              <p className="text-muted">
                Pipsphere makes no warranties, express or implied, regarding the accuracy, completeness, reliability, or suitability of any information provided. We are not responsible for any errors or omissions, or for any results obtained from the use of this information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted">
                In no event shall Pipsphere, its trainers, employees, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of our services or your trading activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Seek Professional Advice</h2>
              <p className="text-muted">
                If you are unsure about any aspect of trading or the risks involved, we strongly recommend that you seek advice from an independent financial advisor. Only trade with funds that you can afford to lose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Regulatory Information</h2>
              <p className="text-muted">
                Pipsphere is an educational platform and is not registered as a financial advisor or broker-dealer. We do not provide investment advice or manage client funds. Trading activities should be conducted through regulated brokers and financial institutions.
              </p>
            </section>

            <section className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4">Acknowledgment</h2>
              <p className="text-muted">
                By using Pipsphere services, you acknowledge that you have read, understood, and agreed to this Risk Disclaimer. You understand the risks involved in trading and agree that you are solely responsible for your trading decisions and outcomes.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}