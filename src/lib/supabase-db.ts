import { supabase, supabaseAdmin } from './supabase'
import { Database } from '@/types/supabase'

// User operations
export const db = {
  // Users
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateUser(userId: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Traders
  async getTraders() {
    const { data, error } = await supabase
      .from('traders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getTrader(traderId: string) {
    const { data, error } = await supabase
      .from('traders')
      .select('*')
      .eq('id', traderId)
      .single()
    
    if (error) throw error
    return data
  },

  async createTrader(trader: Database['public']['Tables']['traders']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('traders')
      .insert(trader)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        trader:traders(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getCourse(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        trader:traders(*),
        modules(
          *,
          lessons(*, resources(*))
        )
      `)
      .eq('id', courseId)
      .single()
    
    if (error) throw error
    return data
  },

  async createCourse(course: Database['public']['Tables']['courses']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .insert(course)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Enrollments
  async enrollUser(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ user_id: userId, course_id: courseId })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserEnrollments(userId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*, modules(*, lessons(*, resources(*))))
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  async checkEnrollment(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Lesson Progress
  async getLessonProgress(userId: string, lessonId: string) {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateLessonProgress(
    userId: string,
    lessonId: string,
    completed: boolean
  ) {
    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Plans
  async getPlans() {
    const { data, error } = await supabase
      .from('plans')
      .select(`
        *,
        plan_courses(
          *,
          course:courses(*)
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getPlan(planId: string) {
    const { data, error } = await supabase
      .from('plans')
      .select(`
        *,
        plan_courses(
          *,
          course:courses(*)
        )
      `)
      .eq('id', planId)
      .single()
    
    if (error) throw error
    return data
  },

  // Orders
  async createOrder(order: Database['public']['Tables']['orders']['Insert']) {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateOrder(orderId: string, updates: Database['public']['Tables']['orders']['Update']) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getOrder(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()
    
    if (error) throw error
    return data
  },

  // Testimonials
  async getApprovedTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createTestimonial(testimonial: Database['public']['Tables']['testimonials']['Insert']) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Live Sessions
  async getUpcomingLiveSessions() {
    const { data, error } = await supabase
      .from('live_sessions')
      .select('*')
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true })
      .limit(5)
    
    if (error) throw error
    return data
  },

  async createLiveSession(session: Database['public']['Tables']['live_sessions']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('live_sessions')
      .insert(session)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Admin Stats
  async getAdminStats() {
    const [users, courses, orders, pendingPayments] = await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('courses').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'PENDING'),
    ])

    return {
      totalUsers: users.count || 0,
      totalCourses: courses.count || 0,
      totalOrders: orders.count || 0,
      pendingPayments: pendingPayments.count || 0,
    }
  },
}