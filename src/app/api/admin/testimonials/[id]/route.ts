import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// PUT update testimonial (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(['ADMIN'])

    const body = await request.json()
    const { name, content, rating, image, isApproved } = body

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(content && { content }),
        ...(rating && { rating: parseInt(rating) }),
        ...(image !== undefined && { image: image || null }),
        ...(isApproved !== undefined && { isApproved }),
      },
    })

    return NextResponse.json({ testimonial })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

// DELETE testimonial (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(['ADMIN'])

    await prisma.testimonial.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}