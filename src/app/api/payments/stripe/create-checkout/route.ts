import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createStripeCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    const { courseId, planId } = body

    if (!courseId && !planId) {
      return NextResponse.json(
        { error: 'Course or plan ID required' },
        { status: 400 }
      )
    }

    // Get price from database
    let amount = 0
    let productName = ''

    if (courseId) {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      })
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
      amount = course.price
      productName = course.title
    } else if (planId) {
      const plan = await prisma.plan.findUnique({
        where: { id: planId },
      })
      if (!plan) {
        return NextResponse.json(
          { error: 'Plan not found' },
          { status: 404 }
        )
      }
      amount = plan.price
      productName = plan.name
    }

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const { url } = await createStripeCheckoutSession(
      courseId || planId,
      user.email,
      `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      `${baseUrl}/checkout/cancel`
    )

    // Create pending order
    await prisma.order.create({
      data: {
        userId: user.id,
        courseId: courseId || null,
        planId: planId || null,
        amount,
        currency: 'USD',
        paymentMethod: 'CARD',
        paymentStatus: 'PENDING',
      },
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
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