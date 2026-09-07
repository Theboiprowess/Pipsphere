import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase-db'
import { requireAuth } from '@/lib/auth-supabase'
import Stripe from 'stripe'

// Stripe initialization moved inside request handler to avoid build errors
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

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })

    // Get price from database
    let amount = 0
    let productName = ''

    if (courseId) {
      const course = await db.getCourse(courseId)
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
      amount = course.price
      productName = course.title
    } else if (planId) {
      const plan = await db.getPlan(planId)
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?payment=cancelled`,
      metadata: {
        userId: user.id,
        courseId: courseId || '',
        planId: planId || '',
      },
    })

    // Create pending order
    await db.createOrder({
      userId: user.id,
      courseId: courseId || null,
      planId: planId || null,
      amount,
      currency: 'USD',
      paymentMethod: 'STRIPE',
      paymentStatus: 'PENDING',
      transactionId: session.id,
    })

    return NextResponse.json({ url: session.url })
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
