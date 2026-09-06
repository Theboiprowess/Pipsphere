'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  isPinned: boolean
  isLocked: boolean
  views: number
  createdAt: string
  user: {
    name: string | null
    email: string
  }
  _count: {
    comments: number
  }
}

export default function CommunityPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' })

  const categories = ['all', 'general', 'trading-strategies', 'technical-analysis', 'fundamental-analysis', 'risk-management', 'market-news']

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  const fetchPosts = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? '/api/community/posts' 
        : `/api/community/posts?category=${selectedCategory}`
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })

      if (response.ok) {
        setShowNewPostModal(false)
        setNewPost({ title: '', content: '', category: 'general' })
        fetchPosts()
      }
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
              <p className="text-muted">Connect with fellow traders, share insights, and learn together.</p>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              + New Post
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border text-foreground hover:bg-card/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted mb-4">
                  Be the first to start a discussion in this category!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {posts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-card/80 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.isPinned && (
                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-medium rounded-full">
                              📌 Pinned
                            </span>
                          )}
                          {post.isLocked && (
                            <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full">
                              🔒 Locked
                            </span>
                          )}
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full uppercase">
                            {post.category}
                          </span>
                        </div>
                        <Link
                          href={`/community/posts/${post.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                        <p className="text-muted mt-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-muted">
                          <span>👤 {post.user.name || post.user.email}</span>
                          <span>💬 {post._count.comments} comments</span>
                          <span>👁️ {post.views} views</span>
                          <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-2xl">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">Create New Post</h2>
            </div>
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.filter(c => c !== 'all').map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Create Post
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