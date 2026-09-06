import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// PUT approve/reject crypto payment (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(['ADMIN'])
    const { id: paymentId } = await params

    const body = await request.json()
    const { action, transactionId } = body

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const updateData = {
      paymentStatus: action === 'approve' ? 'COMPLETED' : 'FAILED',
      completedAt: action === 'approve' ? new Date() : null,
      ...(transactionId && { transactionId }),
    }

    const payment = await prisma.order.update({
      where: { id: paymentId },
      data: updateData,
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
    })

    // If approved, create enrollments for the user
    if (action === 'approve' && payment.planId) {
      const planCourses = await prisma.planCourse.findMany({
        where: { planId: payment.planId },
        select: { courseId: true },
      })

      for (const planCourse of planCourses) {
        await prisma.enrollment.upsert({
          where: {
            userId_courseId: {
              userId: payment.userId,
              courseId: planCourse.courseId,
            },
          },
          update: {},
          create: {
            userId: payment.userId,
            courseId: planCourse.courseId,
          },
        })
      }
    }

    return NextResponse.json({ payment })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }
}