'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface LiveSession {
  id: string
  title: string
  description: string
  scheduled_at: string
  duration: number
  meeting_url: string
  recording_url: string
  category: string
  speaker_id: string
  speaker_name?: string
}

interface EventRSVP {
  id: string
  user_id: string
  session_id: string
  status: string
}

export default function LiveSessionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sessions, setSessions] = useState<LiveSession[]>([])
  const [rsvps, setRsvps] = useState<EventRSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('upcoming') // 'upcoming' or 'recordings'

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

        // Fetch live sessions
        const { data: sessionsData } = await supabase
          .from('live_sessions')
          .select(`
            *,
            trader:traders(name)
          `)
          .order('scheduled_at', { ascending: false })

        if (sessionsData) {
          setSessions(sessionsData)
        }

        // Fetch user's RSVPs
        const { data: rsvpData } = await supabase
          .from('event_rsvps')
          .select('*')
          .eq('user_id', session.user.id)

        if (rsvpData) {
          setRsvps(rsvpData)
        }
      } catch (error) {
        console.error('Failed to fetch sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const upcomingSessions = sessions.filter(s => new Date(s.scheduled_at) > new Date())
  const pastSessions = sessions.filter(s => new Date(s.scheduled_at) <= new Date())

  const handleRSVP = async (sessionId: string) => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const existingRSVP = rsvps.find(r => r.session_id === sessionId)

      if (existingRSVP) {
        // Remove RSVP
        await supabase
          .from('event_rsvps')
          .delete()
          .eq('id', existingRSVP.id)
        
        setRsvps(rsvps.filter(r => r.id !== existingRSVP.id))
      } else {
        // Add RSVP
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const { error } = await supabase.from('event_rsvps').insert({
          user_id: session.user.id,
          session_id: sessionId,
          status: 'GOING',
        })

        if (error) throw error

        setRsvps([...rsvps, {
          id: Math.random().toString(),
          user_id: session.user.id,
          session_id: sessionId,
          status: 'GOING',
        }])
      }
    } catch (error) {
      console.error('Error handling RSVP:', error)
      alert('Failed to update RSVP. Please try again.')
    }
  }

  const addToCalendar = (session: LiveSession) => {
    const startDate = new Date(session.scheduled_at)
    const endDate = new Date(startDate.getTime() + session.duration * 60000)
    
    const title = encodeURIComponent(session.title)
    const details = encodeURIComponent(session.description)
    const location = encodeURIComponent(session.meeting_url || 'Online')
    const dates = `${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}`
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`
    window.open(calendarUrl, '_blank')
  }

  const isRSVPed = (sessionId: string) => rsvps.some(r => r.session_id === sessionId)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading live sessions...</p>
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
            <h1 className="text-3xl font-bold mb-2">Live Sessions</h1>
            <p className="text-muted">
              Join our professional traders for live market analysis, mentorship, and Q&A sessions.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setView('upcoming')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                view === 'upcoming'
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border hover:bg-card/80'
              }`}
            >
              Upcoming Sessions
            </button>
            <button
              onClick={() => setView('recordings')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                view === 'recordings'
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border hover:bg-card/80'
              }`}
            >
              Recording Library
            </button>
          </div>

          {view === 'upcoming' ? (
            <>
              {upcomingSessions.length === 0 ? (
                <div className="bg-card p-8 rounded-xl border border-border text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold mb-2">No upcoming sessions</h3>
                  <p className="text-muted">
                    Check back later for scheduled live trading sessions and Q&A.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="bg-card p-6 rounded-xl border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              session.category === 'MARKET_ANALYSIS' ? 'bg-blue-500/10 text-blue-500' :
                              session.category === 'MENTORSHIP' ? 'bg-purple-500/10 text-purple-500' :
                              session.category === 'PROP_FIRM' ? 'bg-green-500/10 text-green-500' :
                              session.category === 'Q_AND_A' ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-gray-500/10 text-gray-500'
                            }`}>
                              {session.category?.replace('_', ' ') || 'General'}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{session.title}</h3>
                          <p className="text-sm text-muted mb-2">{session.description}</p>
                          <div className="text-sm text-muted">
                            📅 {new Date(session.scheduled_at).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="text-sm text-muted">
                            ⏰ {new Date(session.scheduled_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZoneName: 'short',
                            })}
                          </div>
                          <div className="text-sm text-muted">
                            ⏱️ {session.duration} minutes
                          </div>
                          {session.speaker_name && (
                            <div className="text-sm text-muted">
                              👤 {session.speaker_name}
                            </div>
                          )}
                        </div>
                        <div className="text-4xl">🎥</div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRSVP(session.id)}
                          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                            isRSVPed(session.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-primary text-white hover:bg-primary/90'
                          }`}
                        >
                          {isRSVPed(session.id) ? '✓ Going' : 'RSVP'}
                        </button>
                        <button
                          onClick={() => addToCalendar(session)}
                          className="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors"
                        >
                          📅 Add to Calendar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {pastSessions.length === 0 ? (
                <div className="bg-card p-8 rounded-xl border border-border text-center">
                  <div className="text-4xl mb-4">📼</div>
                  <h3 className="text-xl font-semibold mb-2">No recordings available</h3>
                  <p className="text-muted">
                    Recordings will appear here after live sessions are completed.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="bg-card p-6 rounded-xl border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              session.category === 'MARKET_ANALYSIS' ? 'bg-blue-500/10 text-blue-500' :
                              session.category === 'MENTORSHIP' ? 'bg-purple-500/10 text-purple-500' :
                              session.category === 'PROP_FIRM' ? 'bg-green-500/10 text-green-500' :
                              session.category === 'Q_AND_A' ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-gray-500/10 text-gray-500'
                            }`}>
                              {session.category?.replace('_', ' ') || 'General'}
                            </span>
                            <span className="text-xs text-muted">
                              {new Date(session.scheduled_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{session.title}</h3>
                          <p className="text-sm text-muted mb-2">{session.description}</p>
                          {session.speaker_name && (
                            <div className="text-sm text-muted">
                              👤 {session.speaker_name}
                            </div>
                          )}
                        </div>
                        <div className="text-4xl">📼</div>
                      </div>

                      {session.recording_url ? (
                        <a
                          href={session.recording_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                          Watch Recording
                        </a>
                      ) : (
                        <span className="text-sm text-muted">Recording not yet available</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Session Categories Info */}
          <div className="mt-8 bg-card p-6 rounded-xl border border-border">
            <h3 className="font-semibold mb-4">Session Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-medium">Market Analysis</h4>
                  <p className="text-sm text-muted">Weekly market breakdown and trade opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">👨‍🏫</div>
                <div>
                  <h4 className="font-medium">Mentorship</h4>
                  <p className="text-sm text-muted">Personal guidance and strategy development</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-medium">Prop Firm Workshops</h4>
                  <p className="text-sm text-muted">Challenge preparation and risk management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">❓</div>
                <div>
                  <h4 className="font-medium">Q&A Sessions</h4>
                  <p className="text-sm text-muted">Open forum for your trading questions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎓</div>
                <div>
                  <h4 className="font-medium">Beginner Onboarding</h4>
                  <p className="text-sm text-muted">Getting started with forex trading</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timezone Notice */}
          <div className="mt-8 bg-card/50 p-6 rounded-xl border border-border">
            <p className="text-sm text-muted text-center">
              <strong>Timezone Note:</strong> All session times are displayed in your local timezone. 
              Session reminders are sent based on your account settings.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
