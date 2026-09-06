'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface EnrolledCourse {
  id: string
  title: string
  description: string
  level: string
  progress: number
  image?: string
}

interface LiveSession {
  id: string
  title: string
  scheduledAt: string
  duration: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([])
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
        setUser(userData.user)

        // Get enrolled courses
        const coursesResponse = await fetch('/api/student/courses')
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json()
          setEnrolledCourses(coursesData.courses || [])
        }

        // Get live sessions
        const sessionsResponse = await fetch('/api/student/live-sessions')
        if (sessionsResponse.ok) {
          const sessionsData = await sessionsResponse.json()
          setLiveSessions(sessionsData.sessions || [])
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
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
            <p className="mt-4 text-muted">Loading your dashboard...</p>
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || 'Trader'}!
            </h1>
            <p className="text-muted">
              Continue your learning journey and stay updated with market insights.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">
                {enrolledCourses.length}
              </div>
              <div className="text-sm text-muted">Enrolled Courses</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">
                {enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / (enrolledCourses.length || 1)}%
              </div>
              <div className="text-sm text-muted">Average Progress</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">
                {liveSessions.length}
              </div>
              <div className="text-sm text-muted">Upcoming Sessions</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">0</div>
              <div className="text-sm text-muted">Completed Lessons</div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Link
                href="/programs"
                className="text-primary hover:text-accent transition-colors text-sm font-medium"
              >
                Browse All Courses →
              </Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="bg-card p-8 rounded-xl border border-border text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                <p className="text-muted mb-4">
                  Start your learning journey by enrolling in a course.
                </p>
                <Link
                  href="/programs"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden card-hover">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl">📊</span>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {course.level}
                      </span>
                      <h3 className="text-lg font-bold mt-2 mb-2">{course.title}</h3>
                      <p className="text-sm text-muted mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="block w-full py-2 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors text-sm"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Live Sessions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Live Sessions</h2>

            {liveSessions.length === 0 ? (
              <div className="bg-card p-8 rounded-xl border border-border text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">No upcoming sessions</h3>
                <p className="text-muted">
                  Check back later for scheduled live trading sessions and Q&A.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveSessions.map((session) => (
                  <div key={session.id} className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{session.title}</h3>
                        <p className="text-sm text-muted">
                          {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="text-2xl">🎥</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">
                        Duration: {session.duration} minutes
                      </span>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/programs"
                className="bg-card p-6 rounded-xl border border-border card-hover flex items-center space-x-4"
              >
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="font-semibold">Browse Courses</h3>
                  <p className="text-sm text-muted">Explore new learning opportunities</p>
                </div>
              </Link>
              <Link
                href="/community"
                className="bg-card p-6 rounded-xl border border-border card-hover flex items-center space-x-4"
              >
                <div className="text-3xl">👥</div>
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted">Connect with fellow traders</p>
                </div>
              </Link>
              <Link
                href="/settings"
                className="bg-card p-6 rounded-xl border border-border card-hover flex items-center space-x-4"
              >
                <div className="text-3xl">⚙️</div>
                <div>
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-muted">Manage your account preferences</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}