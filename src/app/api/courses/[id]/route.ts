import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase-db'
import { requireAuth } from '@/lib/auth-supabase'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth()
    const courseId = params.id

    // Check if user is enrolled
    const enrollment = await db.checkEnrollment(user.id, courseId)

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Not enrolled in this course' },
        { status: 403 }
      )
    }

    const course = await db.getCourse(courseId)

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    const formattedCourse = {
      ...course,
      modules: course.modules.map((module: any) => ({
        ...module,
        lessons: module.lessons.map((lesson: any) => ({
          ...lesson,
          completed: lesson.lesson_progress && lesson.lesson_progress.length > 0 && lesson.lesson_progress[0].completed,
        })),
      })),
    }

    return NextResponse.json({ course: formattedCourse })
  } catch (error) {
    console.error('Get course error:', error)
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