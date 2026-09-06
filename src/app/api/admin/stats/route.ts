import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const [totalUsers, totalCourses, totalOrders, pendingPayments] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.order.count(),
      prisma.order.count({
        where: { paymentStatus: 'PENDING' },
      }),
    ])

    return NextResponse.json({
      totalUsers,
      totalCourses,
      totalOrders,
      pendingPayments,
    })
  } catch (error) {
    console.error('Get admin stats error:', error)
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