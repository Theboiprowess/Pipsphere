import { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    default: 'Pipsphere Forex Academy - Master the Markets. Trade With Purpose.',
    template: '%s | Pipsphere Forex Academy'
  },
  description: 'Professional forex education academy with structured learning, mentorship, and community support. Learn from experienced traders without guaranteed promises.',
  keywords: ['forex education', 'trading academy', 'forex courses', 'trading mentorship', 'forex community', 'technical analysis', 'fundamental analysis'],
  authors: [{ name: 'Pipsphere Forex Academy' }],
  creator: 'Pipsphere Forex Academy',
  publisher: 'Pipsphere Forex Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Pipsphere Forex Academy',
    title: 'Pipsphere Forex Academy - Master the Markets. Trade With Purpose.',
    description: 'Professional forex education academy with structured learning, mentorship, and community support.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pipsphere Forex Academy - Forex Education Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipsphere Forex Academy - Master the Markets. Trade With Purpose.',
    description: 'Professional forex education academy with structured learning, mentorship, and community support.',
    images: ['/og-image.jpg'],
    creator: '@pipsphere',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}