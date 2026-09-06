import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET all resources (admin only)
export async function GET() {
  try {
    await requireAuth(['ADMIN'])

    const resources = await prisma.resource.findMany({
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ resources })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}

// POST create new resource (admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAuth(['ADMIN'])

    const body = await request.json()
    const { title, url, type, lessonId } = body

    if (!title || !url || !type || !lessonId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        url,
        type,
        lessonId,
      },
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 })
  }
}