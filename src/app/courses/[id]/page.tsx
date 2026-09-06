'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Module {
  id: string
  title: string
  description: string | null
  order: number
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  description: string | null
  videoUrl: string | null
  order: number
  completed: boolean
}

interface CourseData {
  id: string
  title: string
  description: string
  level: string
  modules: Module[]
}

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch course')
        }
        const data = await response.json()
        setCourse(data.course)
        
        // Expand first module by default
        if (data.course.modules.length > 0) {
          setExpandedModules(new Set([data.course.modules[0].id]))
        }
      } catch (error) {
        console.error('Failed to fetch course:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCourse()
    }
  }, [params.id, router])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId)
      } else {
        newSet.add(moduleId)
      }
      return newSet
    })
  }

  const markLessonComplete = async (lessonId: string) => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
      })

      if (response.ok) {
        // Refresh course data
        const courseResponse = await fetch(`/api/courses/${params.id}`)
        const courseData = await courseResponse.json()
        setCourse(courseData.course)
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
            <p className="mt-4 text-muted">Loading course...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!course) {
    return null
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0
  )
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-primary hover:text-accent transition-colors text-sm font-medium mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted mb-4">{course.description}</p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-full bg-background rounded-full h-2 w-48">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="ml-3 text-sm font-medium">{progress}% Complete</span>
              </div>
              <div className="text-sm text-muted">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="space-y-4">
            {course.modules.map((module) => (
              <div key={module.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">📁</div>
                    <div className="text-left">
                      <h3 className="font-semibold">{module.title}</h3>
                      {module.description && (
                        <p className="text-sm text-muted">{module.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted">
                      {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} lessons
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        expandedModules.has(module.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedModules.has(module.id) && (
                  <div className="border-t border-border">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 border-b border-border last:border-b-0 hover:bg-background transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => markLessonComplete(lesson.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                lesson.completed
                                  ? 'bg-primary border-primary text-white'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {lesson.completed && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              {lesson.description && (
                                <p className="text-sm text-muted">{lesson.description}</p>
                              )}
                            </div>
                          </div>
                          {lesson.videoUrl && (
                            <Link
                              href={`/courses/${course.id}/lessons/${lesson.id}`}
                              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                              Watch
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}