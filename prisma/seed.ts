import { PrismaClient, UserRole, CourseLevel, CryptoNetwork } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pipsphere.com' },
    update: {},
    create: {
      email: 'admin@pipsphere.com',
      name: 'Admin User',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  })

  // Create traders
  const traders = await Promise.all([
    prisma.trader.create({
      data: {
        name: 'Alex Thompson',
        specialty: 'Technical Analysis & Price Action',
        bio: '8+ years in forex markets, specializing in swing trading and technical analysis patterns. Former prop firm trader with proven risk management strategies.',
        linkedin: 'https://linkedin.com/in/alexthompson',
        twitter: 'https://twitter.com/alexthompson',
        instagram: 'https://instagram.com/alexthompson',
      },
    }),
    prisma.trader.create({
      data: {
        name: 'Sarah Chen',
        specialty: 'Fundamental Analysis & Macro Trading',
        bio: '10+ years experience in global markets. Expert in central bank policies, economic indicators, and long-term trend following. Certified Financial Market Analyst.',
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen',
        instagram: 'https://instagram.com/sarahchen',
      },
    }),
    prisma.trader.create({
      data: {
        name: 'Marcus Williams',
        specialty: 'Algorithmic Trading & Risk Management',
        bio: 'Former quantitative analyst at a major investment bank. Specializes in automated trading systems, portfolio risk management, and statistical arbitrage strategies.',
        linkedin: 'https://linkedin.com/in/marcuswilliams',
        twitter: 'https://twitter.com/marcuswilliams',
        instagram: 'https://instagram.com/marcuswilliams',
      },
    }),
    prisma.trader.create({
      data: {
        name: 'Elena Rodriguez',
        specialty: 'Trading Psychology & Discipline',
        bio: 'Trading psychology coach with background in behavioral finance. Helps traders develop emotional discipline, decision-making frameworks, and sustainable trading habits.',
        linkedin: 'https://linkedin.com/in/elenarodriguez',
        twitter: 'https://twitter.com/elenarodriguez',
        instagram: 'https://instagram.com/elenarodriguez',
      },
    }),
  ])

  // Create courses
  const beginnerCourse = await prisma.course.create({
    data: {
      title: 'Forex Fundamentals: Zero to Hero',
      description: 'Complete beginner course covering market basics, terminology, reading charts, and placing your first trades with confidence.',
      level: CourseLevel.BEGINNER,
      price: 199,
      duration: '8 weeks',
      traderId: traders[0].id,
      image: '/images/courses/beginner-forex.jpg',
      modules: {
        create: [
          {
            title: 'Introduction to Forex Markets',
            description: 'Understanding how forex works, market participants, and trading sessions',
            order: 1,
            lessons: {
              create: [
                { title: 'What is Forex Trading?', description: 'Learn the basics of currency trading', order: 1 },
                { title: 'Market Sessions Explained', description: 'Understanding London, New York, Asian sessions', order: 2 },
                { title: 'Currency Pairs Overview', description: 'Major, minor, and exotic pairs', order: 3 },
              ],
            },
          },
          {
            title: 'Reading Charts & Price Action',
            description: 'Candlestick patterns, support/resistance, and trend analysis',
            order: 2,
            lessons: {
              create: [
                { title: 'Candlestick Patterns 101', description: 'Basic candlestick formations', order: 1 },
                { title: 'Support and Resistance', description: 'Key price levels and zones', order: 2 },
                { title: 'Trend Lines and Channels', description: 'Drawing and trading with trends', order: 3 },
              ],
            },
          },
          {
            title: 'Risk Management Essentials',
            description: 'Position sizing, stop losses, and risk-reward ratios',
            order: 3,
            lessons: {
              create: [
                { title: 'Position Sizing Basics', description: 'How much to risk per trade', order: 1 },
                { title: 'Stop Loss Strategies', description: 'Protecting your capital', order: 2 },
                { title: 'Risk-Reward Ratios', description: 'Calculating profitable trades', order: 3 },
              ],
            },
          },
        ],
      },
    },
  })

  const intermediateCourse = await prisma.course.create({
    data: {
      title: 'Advanced Technical Analysis',
      description: 'Deep dive into technical indicators, multi-timeframe analysis, and advanced chart patterns for experienced traders.',
      level: CourseLevel.INTERMEDIATE,
      price: 349,
      duration: '10 weeks',
      traderId: traders[0].id,
      image: '/images/courses/technical-analysis.jpg',
      modules: {
        create: [
          {
            title: 'Advanced Chart Patterns',
            description: 'Head and shoulders, triangles, wedges, and complex formations',
            order: 1,
            lessons: {
              create: [
                { title: 'Reversal Patterns', description: 'Identifying trend reversals', order: 1 },
                { title: 'Continuation Patterns', description: 'Trading trend continuations', order: 2 },
                { title: 'Multi-Timeframe Analysis', description: 'Aligning timeframes for better entries', order: 3 },
              ],
            },
          },
          {
            title: 'Technical Indicators Mastery',
            description: 'RSI, MACD, Bollinger Bands, and custom indicator combinations',
            order: 2,
            lessons: {
              create: [
                { title: 'Oscillators and Momentum', description: 'RSI, Stochastic, and CCI', order: 1 },
                { title: 'Trend Indicators', description: 'Moving averages and ADX', order: 2 },
                { title: 'Volume Analysis', description: 'Volume-based trading strategies', order: 3 },
              ],
            },
          },
        ],
      },
    },
  })

  const advancedCourse = await prisma.course.create({
    data: {
      title: 'Professional Trading Strategies',
      description: 'Institutional-level trading strategies, algorithmic concepts, and portfolio management for serious traders.',
      level: CourseLevel.ADVANCED,
      price: 599,
      duration: '12 weeks',
      traderId: traders[2].id,
      image: '/images/courses/professional-trading.jpg',
      modules: {
        create: [
          {
            title: 'Institutional Trading Concepts',
            description: 'Understanding order flow, market microstructure, and smart money concepts',
            order: 1,
            lessons: {
              create: [
                { title: 'Order Flow Analysis', description: 'Reading institutional order flow', order: 1 },
                { title: 'Market Microstructure', description: 'How markets really work', order: 2 },
                { title: 'Smart Money Concepts', description: 'Tracking institutional footprints', order: 3 },
              ],
            },
          },
          {
            title: 'Algorithmic Trading Basics',
            description: 'Introduction to automated trading systems and backtesting',
            order: 2,
            lessons: {
              create: [
                { title: 'Building Simple Strategies', description: 'Coding basic trading logic', order: 1 },
                { title: 'Backtesting Fundamentals', description: 'Testing your strategies historically', order: 2 },
                { title: 'Portfolio Optimization', description: 'Managing multiple strategies', order: 3 },
              ],
            },
          },
        ],
      },
    },
  })

  // Create membership plans
  const communityPlan = await prisma.plan.create({
    data: {
      name: 'Community Membership',
      description: 'Access to our exclusive trading community, live sessions, and daily market analysis.',
      price: 99,
      duration: 'monthly',
      isMonthly: true,
      features: [
        'Daily market analysis',
        'Weekly live trading sessions',
        'Private Discord community',
        'Trade breakdowns and reviews',
        'Q&A with professional traders',
      ],
      courses: {
        create: [
          { courseId: beginnerCourse.id },
          { courseId: intermediateCourse.id },
        ],
      },
    },
  })

  const proPlan = await prisma.plan.create({
    data: {
      name: 'Professional Plan',
      description: 'Complete access to all courses, mentoring sessions, and priority support.',
      price: 299,
      duration: 'quarterly',
      isMonthly: false,
      features: [
        'All courses included',
        'Monthly 1-on-1 mentoring',
        'Priority email support',
        'Advanced strategy access',
        'Proprietary indicators',
        'Risk management audit',
      ],
      courses: {
        create: [
          { courseId: beginnerCourse.id },
          { courseId: intermediateCourse.id },
          { courseId: advancedCourse.id },
        ],
      },
    },
  })

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'James Wilson',
        content: 'The structured approach at Pipsphere transformed my trading. I went from losing consistently to having a profitable strategy after completing the intermediate course.',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'Maria Garcia',
        content: 'The community membership is worth every penny. Daily analysis and live sessions have helped me understand market movements much better.',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'David Kim',
        content: 'Elena\'s psychology sessions changed everything. I was my own worst enemy, but now I have the discipline to follow my trading plan.',
        rating: 4,
        isApproved: true,
      },
    ],
  })

  // Create sample live sessions
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(15, 0, 0, 0)

  await prisma.liveSession.create({
    data: {
      title: 'Weekly Market Analysis & Trade Review',
      description: 'Join our senior traders for a comprehensive market analysis and review of the week\'s trading opportunities.',
      scheduledAt: tomorrow,
      duration: 90,
      meetingUrl: 'https://zoom.us/j/example',
    },
  })

  console.log('Database seeded successfully!')
  console.log('Admin user: admin@pipsphere.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })