import { supabase } from './supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

export type RealtimeEvent = {
  type: 'live_session_start' | 'live_session_end' | 'new_enrollment' | 'lesson_completed' | 'payment_completed'
  data: any
  timestamp: string
}

export const realtime = {
  // Subscribe to live session updates
  subscribeToLiveSessions(callback: (session: any) => void) {
    const channel = supabase
      .channel('live_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_sessions',
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()

    return channel
  },

  // Subscribe to user's enrollments
  subscribeToUserEnrollments(userId: string, callback: (enrollment: any) => void) {
    const channel = supabase
      .channel(`user_enrollments_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()

    return channel
  },

  // Subscribe to lesson progress updates
  subscribeToLessonProgress(userId: string, callback: (progress: any) => void) {
    const channel = supabase
      .channel(`lesson_progress_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'lesson_progress',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()

    return channel
  },

  // Subscribe to payment status updates
  subscribeToPaymentUpdates(userId: string, callback: (order: any) => void) {
    const channel = supabase
      .channel(`payment_updates_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()

    return channel
  },

  // Subscribe to new testimonials (for admin)
  subscribeToNewTestimonials(callback: (testimonial: any) => void) {
    const channel = supabase
      .channel('new_testimonials')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'testimonials',
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()

    return channel
  },

  // Unsubscribe from a channel
  unsubscribe(channel: RealtimeChannel) {
    supabase.removeChannel(channel)
  },

  // Broadcast custom events (for live sessions, notifications, etc.)
  async broadcastEvent(event: RealtimeEvent) {
    const { error } = await supabase
      .channel('events')
      .send({
        type: 'broadcast',
        event: 'custom_event',
        payload: event,
      })

    if (error) throw error
  },

  // Listen to custom events
  listenToEvents(callback: (event: RealtimeEvent) => void) {
    const channel = supabase
      .channel('events')
      .on('broadcast', { event: 'custom_event' }, (payload) => {
        callback(payload.payload as RealtimeEvent)
      })
      .subscribe()

    return channel
  },
}