import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET all courses (admin only)
export async function GET() {
  try {
    await requireAuth(['ADMIN'])

    const courses = await prisma.course.findMany({
      include: {
        trader: true,
        modules: {
          include: {
            _count: {
              select: {
                lessons: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ courses })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

// POST create new course (admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAuth(['ADMIN'])

    const body = await request.json()
    const { title, description, level, price, duration, image, traderId } = body

    if (!title || !description || !level || !price || !duration || !traderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify trader exists
    const trader = await prisma.trader.findUnique({
      where: { id: traderId },
    })

    if (!trader) {
      return NextResponse.json({ error: 'Trader not found' }, { status: 404 })
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        level,
        price: parseFloat(price),
        duration,
        image: image || null,
        traderId,
      },
      include: {
        trader: true,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}