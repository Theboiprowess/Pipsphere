import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function createStripeCheckoutSession(
  planId: string,
  userEmail: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pipsphere Membership',
              description: `Plan ID: ${planId}`,
            },
            unit_amount: Math.round(parseFloat(planId) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        planId,
      },
    })

    return { sessionId: session.id, url: session.url }
  } catch (error) {
    console.error('Stripe checkout error:', error)
    throw error
  }
}

export async function verifyStripeWebhook(
  payload: string,
  signature: string
) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    return event
  } catch (error) {
    console.error('Webhook verification error:', error)
    throw error
  }
}

export default stripe