'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface LessonData {
  id: string
  title: string
  description: string | null
  videoUrl: string | null
  order: number
  completed: boolean
  module: {
    id: string
    title: string
  }
  course: {
    id: string
    title: string
  }
  resources: {
    id: string
    title: string
    url: string
    type: string
  }[]
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lessons/${params.lessonId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch lesson')
        }
        const data = await response.json()
        setLesson(data.lesson)
      } catch (error) {
        console.error('Failed to fetch lesson:', error)
        router.push(`/courses/${params.id}`)
      } finally {
        setLoading(false)
      }
    }

    if (params.lessonId) {
      fetchLesson()
    }
  }, [params.lessonId, params.id, router])

  const markComplete = async () => {
    try {
      const response = await fetch(`/api/lessons/${params.lessonId}/complete`, {
        method: 'POST',
      })

      if (response.ok) {
        setLesson((prev) => prev ? { ...prev, completed: true } : null)
      }
    } catch (error) {
      console.error('Failed to mark lesson complete:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading lesson...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!lesson) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href={`/courses/${params.id}`}
              className="text-primary hover:text-accent transition-colors text-sm font-medium"
            >
              ← Back to Course
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
                {/* Video Player */}
                {lesson.videoUrl ? (
                  <div className="aspect-video bg-black">
                    <video
                      controls
                      className="w-full h-full"
                      poster="/images/video-poster.jpg"
                    >
                      <source src={lesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-muted">Video content coming soon</p>
                    </div>
                  </div>
                )}

                {/* Lesson Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
                      {lesson.description && (
                        <p className="text-muted">{lesson.description}</p>
                      )}
                    </div>
                    <button
                      onClick={markComplete}
                      disabled={lesson.completed}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        lesson.completed
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {lesson.completed ? '✓ Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Resources */}
              {lesson.resources.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-bold mb-4">Lesson Resources</h2>
                  <div className="space-y-3">
                    {lesson.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-card/80 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {resource.type === 'pdf' ? '📄' : resource.type === 'link' ? '🔗' : '📁'}
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted capitalize">{resource.type}</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Course Progress</h2>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted">This Lesson</span>
                    <span className={lesson.completed ? 'text-green-500' : 'text-muted'}>
                      {lesson.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        lesson.completed ? 'bg-green-500' : 'bg-primary'
                      }`}
                      style={{ width: lesson.completed ? '100%' : '50%' }}
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-medium mb-3">Module: {lesson.module.title}</h3>
                  <p className="text-sm text-muted mb-4">
                    Lesson {lesson.order} of the module
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <Link
                    href={`/courses/${params.id}`}
                    className="block w-full py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
                  >
                    View All Lessons
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}