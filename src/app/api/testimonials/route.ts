import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET approved testimonials (public)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        isApproved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    return NextResponse.json({ testimonials })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

// POST submit testimonial (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, content, rating } = body

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
        isApproved: false, // User-submitted testimonials require approval
      },
    })

    return NextResponse.json({ 
      testimonial,
      message: 'Testimonial submitted successfully. It will be visible after approval.' 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 })
  }
}