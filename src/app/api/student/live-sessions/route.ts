import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase-db'
import { requireAuth } from '@/lib/auth-supabase'

export async function GET() {
  try {
    const user = await requireAuth()

    const sessions = await db.getUpcomingLiveSessions()

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Get live sessions error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}