import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase-db'
import { requireAuth } from '@/lib/auth-supabase'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id: lessonId } = await params

    // Update lesson progress
    await db.updateLessonProgress(user.id, lessonId, true)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mark lesson complete error:', error)
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