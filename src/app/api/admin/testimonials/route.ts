import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET all testimonials (admin only)
export async function GET() {
  try {
    await requireAuth(['ADMIN'])

    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ testimonials })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

// POST create new testimonial (admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAuth(['ADMIN'])

    const body = await request.json()
    const { name, content, rating, image } = body

    if (!name || !content || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content,
        rating: parseInt(rating),
        image: image || null,
        isApproved: true, // Admin-created testimonials are auto-approved
      },
    })

    return NextResponse.json({ testimonial }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}