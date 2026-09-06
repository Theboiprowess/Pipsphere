import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase-db'
import { requireAuth } from '@/lib/auth-supabase'

export async function GET() {
  try {
    const user = await requireAuth()

    const enrollments = await db.getUserEnrollments(user.id)

    const courses = enrollments.map((enrollment: any) => {
      const totalLessons = enrollment.course.modules.reduce(
        (acc: number, module: any) => acc + module.lessons.length,
        0
      )

      const completedLessons = enrollment.course.modules.reduce(
        (acc: number, module: any) =>
          acc +
          module.lessons.filter(
            (lesson: any) =>
              lesson.lesson_progress && lesson.lesson_progress.length > 0 && lesson.lesson_progress[0].completed
          ).length,
        0
      )

      const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

      return {
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        level: enrollment.course.level,
        progress: Math.round(progress),
        image: enrollment.course.image,
      }
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Get student courses error:', error)
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