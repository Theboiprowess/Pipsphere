export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'STUDENT' | 'TRADER' | 'ADMIN'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'STUDENT' | 'TRADER' | 'ADMIN'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'STUDENT' | 'TRADER' | 'ADMIN'
          created_at?: string
          updated_at?: string
        }
      }
      traders: {
        Row: {
          id: string
          name: string
          specialty: string
          bio: string
          image: string | null
          linkedin: string | null
          twitter: string | null
          instagram: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          specialty: string
          bio: string
          image?: string | null
          linkedin?: string | null
          twitter?: string | null
          instagram?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          specialty?: string
          bio?: string
          image?: string | null
          linkedin?: string | null
          twitter?: string | null
          instagram?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
          price: number
          duration: string
          image: string | null
          trader_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
          price: number
          duration: string
          image?: string | null
          trader_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
          price?: number
          duration?: string
          image?: string | null
          trader_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          title: string
          description: string | null
          order: number
          course_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          order: number
          course_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          order?: number
          course_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string | null
          video_url: string | null
          order: number
          module_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          video_url?: string | null
          order: number
          module_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          video_url?: string | null
          order?: number
          module_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          url: string
          type: string
          lesson_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          url: string
          type: string
          lesson_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          url?: string
          type?: string
          lesson_id?: string
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          user_id: string
          course_id: string
          enrolled_at: string
        }
        Insert: {
          user_id: string
          course_id: string
          enrolled_at?: string
        }
        Update: {
          user_id?: string
          course_id?: string
          enrolled_at?: string
        }
      }
      lesson_progress: {
        Row: {
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          lesson_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          lesson_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          duration: string
          features: string[]
          is_monthly: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          duration: string
          features: string[]
          is_monthly?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          duration?: string
          features?: string[]
          is_monthly?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      plan_courses: {
        Row: {
          plan_id: string
          course_id: string
        }
        Insert: {
          plan_id: string
          course_id: string
        }
        Update: {
          plan_id?: string
          course_id?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          plan_id: string | null
          amount: number
          currency: string
          payment_method: 'CARD' | 'CRYPTO'
          payment_status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'EXPIRED'
          transaction_id: string | null
          crypto_network: 'TRC20' | 'ERC20' | null
          wallet_address: string | null
          expires_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id?: string | null
          amount: number
          currency?: string
          payment_method: 'CARD' | 'CRYPTO'
          payment_status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'EXPIRED'
          transaction_id?: string | null
          crypto_network?: 'TRC20' | 'ERC20' | null
          wallet_address?: string | null
          expires_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string | null
          amount?: number
          currency?: string
          payment_method?: 'CARD' | 'CRYPTO'
          payment_status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'EXPIRED'
          transaction_id?: string | null
          crypto_network?: 'TRC20' | 'ERC20' | null
          wallet_address?: string | null
          expires_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          content: string
          rating: number
          image: string | null
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          content: string
          rating: number
          image?: string | null
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          content?: string
          rating?: number
          image?: string | null
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      live_sessions: {
        Row: {
          id: string
          title: string
          description: string
          scheduled_at: string
          duration: number
          meeting_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          scheduled_at: string
          duration: number
          meeting_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          scheduled_at?: string
          duration?: number
          meeting_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}