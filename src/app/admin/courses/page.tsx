'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Course {
  id: string
  title: string
  description: string
  level: string
  price: number
  duration: string
  image: string | null
  trader: {
    id: string
    name: string
  }
  modules: {
    _count: {
      lessons: number
    }
  }[]
  _count: {
    enrollments: number
  }
}

interface Trader {
  id: string
  name: string
  _count: {
    courses: number
  }
}

export default function AdminCoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [traders, setTraders] = useState<Trader[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'BEGINNER',
    price: '',
    duration: '',
    image: '',
    traderId: '',
  })

  useEffect(() => {
    fetchCourses()
    fetchTraders()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses')
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch courses')
      }
      const data = await response.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTraders = async () => {
    try {
      const response = await fetch('/api/admin/traders')
      if (response.ok) {
        const data = await response.json()
        setTraders(data.traders || [])
      }
    } catch (error) {
      console.error('Failed to fetch traders:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingCourse
        ? `/api/admin/courses/${editingCourse.id}`
        : '/api/admin/courses'
      const method = editingCourse ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowModal(false)
        setEditingCourse(null)
        setFormData({
          title: '',
          description: '',
          level: 'BEGINNER',
          price: '',
          duration: '',
          image: '',
          traderId: '',
        })
        fetchCourses()
      }
    } catch (error) {
      console.error('Failed to save course:', error)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      price: course.price.toString(),
      duration: course.duration,
      image: course.image || '',
      traderId: course.trader.id,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? This will also delete all modules and lessons.')) return

    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchCourses()
      }
    } catch (error) {
      console.error('Failed to delete course:', error)
    }
  }

  const openModal = () => {
    setEditingCourse(null)
    setFormData({
      title: '',
      description: '',
      level: 'BEGINNER',
      price: '',
      duration: '',
      image: '',
      traderId: '',
    })
    setShowModal(true)
  }

  const getTotalLessons = (course: Course) => {
    return course.modules.reduce((acc, module) => acc + module._count.lessons, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading courses...</p>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/admin"
                className="text-primary hover:text-accent transition-colors text-sm font-medium mb-2 inline-block"
              >
                ← Back to Admin Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Courses Management</h1>
              <p className="text-muted">Create and manage forex education courses.</p>
            </div>
            <button
              onClick={openModal}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              + Create Course
            </button>
          </div>

          {/* Courses List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {courses.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                <p className="text-muted mb-4">
                  Create your first course to start building your curriculum.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {courses.map((course) => (
                  <div key={course.id} className="p-6 hover:bg-card/80 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full uppercase">
                            {course.level}
                          </span>
                          <span className="text-sm text-muted">
                            By {course.trader.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-muted mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted">
                          <span>💰 ${course.price}</span>
                          <span>⏱️ {course.duration}</span>
                          <span>📚 {course.modules.length} modules</span>
                          <span>📝 {getTotalLessons(course)} lessons</span>
                          <span>👥 {course._count.enrollments} enrolled</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/admin/courses/${course.id}/modules`}
                          className="p-2 text-muted hover:text-primary transition-colors"
                          title="Manage Modules"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleEdit(course)}
                          className="p-2 text-muted hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 text-muted hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">
                {editingCourse ? 'Edit Course' : 'Create Course'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 8 weeks, 10 weeks"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/course-image.jpg"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Instructor</label>
                <select
                  required
                  value={formData.traderId}
                  onChange={(e) => setFormData({ ...formData, traderId: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select an instructor</option>
                  {traders.map((trader) => (
                    <option key={trader.id} value={trader.id}>
                      {trader.name} ({trader._count.courses} courses)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {editingCourse ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}