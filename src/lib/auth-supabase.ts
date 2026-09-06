import { getSupabase } from './supabase'
import { Database } from '@/types/supabase'

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: 'STUDENT' | 'TRADER' | 'ADMIN'
}

export async function signUp(email: string, password: string, name?: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || null,
        role: 'STUDENT',
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = getSupabase()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession(): Promise<SessionUser | null> {
  const supabase = getSupabase()
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) return null

  // Get user role from public.users table
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.user_metadata.name || null,
    role: userData?.role || 'STUDENT',
  }
}

export async function requireAuth(
  roles?: ('STUDENT' | 'TRADER' | 'ADMIN')[]
): Promise<SessionUser> {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  if (roles && !roles.includes(session.role)) {
    throw new Error('Forbidden')
  }
  
  return session
}

export async function getCurrentUser() {
  const supabase = getSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) return null

  // Get full user data from public.users table
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return userData
}

export async function resetPassword(email: string) {
  const supabase = getSupabase()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const supabase = getSupabase()
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) throw error
}