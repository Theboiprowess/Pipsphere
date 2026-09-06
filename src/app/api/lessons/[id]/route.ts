import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase-db'
import { requireAuth } from '@/lib/auth-supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id: lessonId } = await params

    const lesson = await db.getLesson(lessonId, user.id)

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Check if user is enrolled in the course
    const enrollment = await db.checkEnrollment(user.id, lesson.module.course_id)

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Not enrolled in this course' },
        { status: 403 }
      )
    }

    // Get lesson progress
    const progress = await db.getLessonProgress(user.id, lessonId)

    const formattedLesson = {
      ...lesson,
      completed: progress && progress.completed,
    }

    return NextResponse.json({ lesson: formattedLesson })
  } catch (error) {
    console.error('Get lesson error:', error)
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