import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { getCryptoPaymentService, CryptoNetworkValues, CryptoNetwork } from '@/lib/crypto-payment'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    const { courseId, planId, network } = body

    if (!courseId && !planId) {
      return NextResponse.json(
        { error: 'Course or plan ID required' },
        { status: 400 }
      )
    }

    if (!network || !Object.values(CryptoNetworkValues).includes(network)) {
      return NextResponse.json(
        { error: 'Valid network required' },
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

    // Create crypto payment
    const cryptoService = getCryptoPaymentService()
    const payment = await cryptoService.createPayment({
      amount,
      currency: 'USDT',
      network: network, // Pass string directly
      orderId: `order_${Date.now()}`,
      customerEmail: user.email,
    })

    // Convert string network to Prisma enum
    const prismaNetwork = network === 'TRC20' ? CryptoNetwork.TRC20 : CryptoNetwork.ERC20

    // Create pending order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        courseId: courseId || null,
        planId: planId || null,
        amount,
        currency: 'USD',
        paymentMethod: 'CRYPTO',
        paymentStatus: 'PENDING',
        transactionId: payment.paymentId,
        cryptoNetwork: prismaNetwork,
        walletAddress: payment.address,
        expiresAt: payment.expiresAt,
      },
    })

    return NextResponse.json({
      ...payment,
      orderId: order.id,
    })
  } catch (error) {
    console.error('Crypto payment error:', error)
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
