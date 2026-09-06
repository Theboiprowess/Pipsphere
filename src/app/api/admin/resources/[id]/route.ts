import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// PUT update resource (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(['ADMIN'])
    const { id: resourceId } = await params

    const body = await request.json()
    const { title, url, type, lessonId } = body

    // If lessonId is provided, verify it exists
    if (lessonId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
      })

      if (!lesson) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
      }
    }

    const resource = await prisma.resource.update({
      where: { id: resourceId },
      data: {
        ...(title && { title }),
        ...(url && { url }),
        ...(type && { type }),
        ...(lessonId && { lessonId }),
      },
    })

    return NextResponse.json({ resource })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 })
  }
}

// DELETE resource (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(['ADMIN'])
    const { id: resourceId } = await params

    await prisma.resource.delete({
      where: { id: resourceId },
    })

    return NextResponse.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 })
  }
}