import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET all crypto payments needing review (admin only)
export async function GET() {
  try {
    await requireAuth(['ADMIN'])

    const payments = await prisma.order.findMany({
      where: {
        paymentMethod: 'CRYPTO',
        paymentStatus: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        plan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ payments })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}