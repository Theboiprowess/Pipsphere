'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Resource {
  id: string
  title: string
  url: string
  type: string
  lesson: {
    id: string
    title: string
    module: {
      course: {
        id: string
        title: string
      }
    }
  }
}

interface Lesson {
  id: string
  title: string
  module: {
    course: {
      title: string
    }
  }
}

export default function AdminResourcesPage() {
  const router = useRouter()
  const [resources, setResources] = useState<Resource[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'pdf',
    lessonId: '',
  })

  useEffect(() => {
    fetchResources()
    fetchLessons()
  }, [])

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/admin/resources')
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch resources')
      }
      const data = await response.json()
      setResources(data.resources || [])
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async () => {
    try {
      const response = await fetch('/api/admin/lessons')
      if (response.ok) {
        const data = await response.json()
        setLessons(data.lessons || [])
      }
    } catch (error) {
      console.error('Failed to fetch lessons:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingResource
        ? `/api/admin/resources/${editingResource.id}`
        : '/api/admin/resources'
      const method = editingResource ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowModal(false)
        setEditingResource(null)
        setFormData({ title: '', url: '', type: 'pdf', lessonId: '' })
        fetchResources()
      }
    } catch (error) {
      console.error('Failed to save resource:', error)
    }
  }

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      url: resource.url,
      type: resource.type,
      lessonId: resource.lesson.id,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return

    try {
      const response = await fetch(`/api/admin/resources/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchResources()
      }
    } catch (error) {
      console.error('Failed to delete resource:', error)
    }
  }

  const openModal = () => {
    setEditingResource(null)
    setFormData({ title: '', url: '', type: 'pdf', lessonId: '' })
    setShowModal(true)
  }

  const getLessonLabel = (lesson: Lesson) => {
    return `${lesson.module.course.title} > ${lesson.title}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading resources...</p>
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
              <h1 className="text-3xl font-bold">Lesson Resources Management</h1>
              <p className="text-muted">Manage downloadable materials and resources for lessons.</p>
            </div>
            <button
              onClick={openModal}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              + Add Resource
            </button>
          </div>

          {/* Resources List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {resources.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-xl font-semibold mb-2">No resources yet</h3>
                <p className="text-muted mb-4">
                  Add downloadable materials like PDFs, links, and files to your lessons.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {resources.map((resource) => (
                  <div key={resource.id} className="p-6 hover:bg-card/80 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="text-2xl">
                            {resource.type === 'pdf' ? '📄' : resource.type === 'link' ? '🔗' : '📁'}
                          </div>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full uppercase">
                            {resource.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                        <p className="text-muted mb-3">{resource.url}</p>
                        <p className="text-sm text-muted">
                          Lesson: {resource.lesson.module.course.title} → {resource.lesson.title}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="p-2 text-muted hover:text-primary transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-2 text-muted hover:text-red-500 transition-colors"
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
          <div className="bg-card rounded-xl border border-border w-full max-w-lg">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">
                {editingResource ? 'Edit Resource' : 'Add Resource'}
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
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/resource.pdf"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="link">External Link</option>
                  <option value="file">File Download</option>
                  <option value="video">Video Resource</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Lesson</label>
                <select
                  required
                  value={formData.lessonId}
                  onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a lesson</option>
                  {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {getLessonLabel(lesson)}
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
                  {editingResource ? 'Update' : 'Add'}
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