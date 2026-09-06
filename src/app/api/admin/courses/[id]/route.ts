import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// PUT update course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(['ADMIN'])
    const { id: courseId } = await params

    const body = await request.json()
    const { title, description, level, price, duration, image, traderId } = body

    // If traderId is provided, verify it exists
    if (traderId) {
      const trader = await prisma.trader.findUnique({
        where: { id: traderId },
      })

      if (!trader) {
        return NextResponse.json({ error: 'Trader not found' }, { status: 404 })
      }
    }

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(level && { level }),
        ...(price && { price: parseFloat(price) }),
        ...(duration && { duration }),
        ...(image !== undefined && { image: image || null }),
        ...(traderId && { traderId }),
      },
      include: {
        trader: true,
      },
    })

    return NextResponse.json({ course })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

// DELETE course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(['ADMIN'])
    const { id: courseId } = await params

    await prisma.course.delete({
      where: { id: courseId },
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}