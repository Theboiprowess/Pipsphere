import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET all live sessions (admin only)
export async function GET() {
  try {
    await requireAuth(['ADMIN'])

    const sessions = await prisma.liveSession.findMany({
      orderBy: {
        scheduledAt: 'asc',
      },
    })

    return NextResponse.json({ sessions })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch live sessions' }, { status: 500 })
  }
}

// POST create new live session (admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAuth(['ADMIN'])

    const body = await request.json()
    const { title, description, scheduledAt, duration, meetingUrl } = body

    if (!title || !description || !scheduledAt || !duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const session = await prisma.liveSession.create({
      data: {
        title,
        description,
        scheduledAt: new Date(scheduledAt),
        duration: parseInt(duration),
        meetingUrl: meetingUrl || null,
      },
    })

    return NextResponse.json({ session }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create live session' }, { status: 500 })
  }
}