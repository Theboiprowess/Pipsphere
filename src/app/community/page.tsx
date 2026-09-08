'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface CommunityLink {
  id: string
  platform: string
  url: string
  description: string
  is_active: boolean
}

export default function CommunityPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
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

        setUser(session.user)

        // Fetch community links
        const { data: linksData } = await supabase
          .from('community_links')
          .select('*')
          .eq('is_active', true)
          .order('platform', { ascending: true })

        if (linksData) {
          setCommunityLinks(linksData)
        }
      } catch (error) {
        console.error('Failed to fetch community links:', error)
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
            <p className="mt-4 text-muted">Loading community...</p>
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
            <h1 className="text-3xl font-bold mb-2">Trading Community</h1>
            <p className="text-muted">
              Connect with fellow traders, share insights, and grow together in our supportive community.
            </p>
          </div>

          {/* Community Guidelines */}
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
            <h3 className="font-semibold mb-4">Community Guidelines</h3>
            <ul className="space-y-2 text-sm">
              <li>• Be respectful and constructive in all interactions</li>
              <li>• Share educational content and analysis, not financial advice</li>
              <li>• Avoid spam, self-promotion, or soliciting investments</li>
              <li>• Protect your privacy - never share personal or account information</li>
              <li>• Report suspicious activity or potential scams to moderators</li>
              <li>• Focus on learning and helping others improve their trading</li>
            </ul>
          </div>

          {/* Anti-Scam Guidance */}
          <div className="bg-red-500/5 p-6 rounded-xl border border-red-500/20 mb-8">
            <h3 className="font-semibold text-red-500 mb-4">⚠️ Anti-Scam Guidance</h3>
            <div className="space-y-3 text-sm">
              <p><strong>Red Flags to Watch For:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted">
                <li>Guaranteed profits or "risk-free" trading opportunities</li>
                <li>Requests for personal information, passwords, or account access</li>
                <li>Pressure to send money or join paid services quickly</li>
                <li>Unverified or anonymous individuals claiming to be "experts"</li>
                <li>Promises of funded accounts or guaranteed challenge passes</li>
              </ul>
              <p className="mt-3"><strong>Protect Yourself:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted">
                <li>Never share your login credentials or 2FA codes</li>
                <li>Verify the identity of anyone claiming to represent Pipsphere</li>
                <li>Be suspicious of unsolicited investment opportunities</li>
                <li>Report any suspicious behavior to community moderators</li>
                <li>Remember: Pipsphere staff will never ask for your password or personal funds</li>
              </ul>
            </div>
          </div>

          {/* Community Platforms */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
            
            {communityLinks.length === 0 ? (
              <div className="bg-card p-8 rounded-xl border border-border text-center">
                <div className="text-4xl mb-4">�</div>
                <h3 className="text-xl font-semibold mb-2">Community Links Coming Soon</h3>
                <p className="text-muted">
                  We're setting up our community channels. Check back soon for Discord, Telegram, and other platforms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card p-6 rounded-xl border border-border card-hover block"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">
                        {link.platform.toLowerCase().includes('discord') && '💬'}
                        {link.platform.toLowerCase().includes('telegram') && '✈️'}
                        {link.platform.toLowerCase().includes('whatsapp') && '📱'}
                        {link.platform.toLowerCase().includes('twitter') && '🐦'}
                        {link.platform.toLowerCase().includes('instagram') && '📷'}
                        {link.platform.toLowerCase().includes('youtube') && '📺'}
                        {!link.platform.toLowerCase().includes('discord') && 
                         !link.platform.toLowerCase().includes('telegram') &&
                         !link.platform.toLowerCase().includes('whatsapp') &&
                         !link.platform.toLowerCase().includes('twitter') &&
                         !link.platform.toLowerCase().includes('instagram') &&
                         !link.platform.toLowerCase().includes('youtube') && '🔗'}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{link.platform}</h3>
                        <p className="text-sm text-muted">{link.description}</p>
                      </div>
                    </div>
                    <div className="text-primary font-medium text-sm">
                      Join Community →
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Community Benefits */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Community Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">💡</div>
                <h3 className="font-semibold mb-2">Knowledge Sharing</h3>
                <p className="text-sm text-muted">
                  Learn from experienced traders and share your own insights
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="font-semibold mb-2">Networking</h3>
                <p className="text-sm text-muted">
                  Connect with traders at similar experience levels
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-semibold mb-2">Market Analysis</h3>
                <p className="text-sm text-muted">
                  Daily market breakdowns and trade ideas from the community
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Accountability</h3>
                <p className="text-sm text-muted">
                  Stay disciplined with peer support and goal tracking
                </p>
              </div>
            </div>
          </div>

          {/* Moderation and Reporting */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="font-semibold mb-4">Moderation & Reporting</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Our Moderation Team</h4>
                <p className="text-muted">
                  Our community is moderated by experienced traders and Pipsphere staff to ensure a safe, educational environment. 
                  Moderators have full authority to remove content, issue warnings, or ban users who violate community guidelines.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">How to Report Issues</h4>
                <p className="text-muted">
                  If you encounter suspicious activity, harassment, or guideline violations, please report it immediately:
                </p>
                <ul className="list-disc list-inside mt-2 text-muted">
                  <li>Use the report function in the community platform</li>
                  <li>Contact our support team at support@pipsphere.com</li>
                  <li>Direct message a moderator with details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">What Happens After Reporting</h4>
                <p className="text-muted">
                  Our team reviews all reports within 24-48 hours. Serious safety issues are prioritized. 
                  We take appropriate action based on the severity of the violation, ranging from warnings to permanent bans.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Important:</strong> Pipsphere community channels are for educational purposes only. 
              Content shared by community members does not constitute financial advice. 
              Always conduct your own analysis and use proper risk management. 
              Pipsphere is not responsible for the actions or advice of community members.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
