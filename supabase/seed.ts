import { supabaseAdmin } from '../src/lib/supabase'

async function seedDatabase() {
  console.log('Starting database seed...')

  try {
    // Create admin user (via Supabase Auth)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@pipsphere.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        name: 'Admin User',
        role: 'ADMIN',
      },
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('Admin user already exists, skipping creation')
      } else {
        throw authError
      }
    } else {
      console.log('Admin user created:', authData.user.id)
    }

    // Get admin user ID
    const { data: adminUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', 'admin@pipsphere.com')
      .single()

    if (!adminUser) {
      throw new Error('Admin user not found in public.users table')
    }

    // Create traders
    const traders = await Promise.all([
      supabaseAdmin.from('traders').insert({
        name: 'Alex Thompson',
        specialty: 'Technical Analysis & Price Action',
        bio: '8+ years in forex markets, specializing in swing trading and technical analysis patterns. Former prop firm trader with proven risk management strategies.',
        linkedin: 'https://linkedin.com/in/alexthompson',
        twitter: 'https://twitter.com/alexthompson',
        instagram: 'https://instagram.com/alexthompson',
      }).select().single(),
      supabaseAdmin.from('traders').insert({
        name: 'Sarah Chen',
        specialty: 'Fundamental Analysis & Macro Trading',
        bio: '10+ years experience in global markets. Expert in central bank policies, economic indicators, and long-term trend following. Certified Financial Market Analyst.',
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen',
        instagram: 'https://instagram.com/sarahchen',
      }).select().single(),
      supabaseAdmin.from('traders').insert({
        name: 'Marcus Williams',
        specialty: 'Algorithmic Trading & Risk Management',
        bio: 'Former quantitative analyst at a major investment bank. Specializes in automated trading systems, portfolio risk management, and statistical arbitrage strategies.',
        linkedin: 'https://linkedin.com/in/marcuswilliams',
        twitter: 'https://twitter.com/marcuswilliams',
        instagram: 'https://instagram.com/marcuswilliams',
      }).select().single(),
      supabaseAdmin.from('traders').insert({
        name: 'Elena Rodriguez',
        specialty: 'Trading Psychology & Discipline',
        bio: 'Trading psychology coach with background in behavioral finance. Helps traders develop emotional discipline, decision-making frameworks, and sustainable trading habits.',
        linkedin: 'https://linkedin.com/in/elenarodriguez',
        twitter: 'https://twitter.com/elenarodriguez',
        instagram: 'https://instagram.com/elenarodriguez',
      }).select().single(),
    ])

    console.log('Traders created:', traders.length)

    // Create courses
    const courses = await Promise.all([
      supabaseAdmin.from('courses').insert({
        title: 'Forex Fundamentals: Zero to Hero',
        description: 'Complete beginner course covering market basics, terminology, reading charts, and placing your first trades with confidence.',
        level: 'BEGINNER',
        price: 199,
        duration: '8 weeks',
        trader_id: traders[0].data.id,
        image: '/images/courses/beginner-forex.jpg',
      }).select().single(),
      supabaseAdmin.from('courses').insert({
        title: 'Advanced Technical Analysis',
        description: 'Deep dive into technical indicators, multi-timeframe analysis, and advanced chart patterns for experienced traders.',
        level: 'INTERMEDIATE',
        price: 349,
        duration: '10 weeks',
        trader_id: traders[0].data.id,
        image: '/images/courses/technical-analysis.jpg',
      }).select().single(),
      supabaseAdmin.from('courses').insert({
        title: 'Professional Trading Strategies',
        description: 'Institutional-level trading strategies, algorithmic concepts, and portfolio management for serious traders.',
        level: 'ADVANCED',
        price: 599,
        duration: '12 weeks',
        trader_id: traders[2].data.id,
        image: '/images/courses/professional-trading.jpg',
      }).select().single(),
    ])

    console.log('Courses created:', courses.length)

    // Create modules and lessons for beginner course
    const beginnerModules = await Promise.all([
      supabaseAdmin.from('modules').insert({
        title: 'Introduction to Forex Markets',
        description: 'Understanding how forex works, market participants, and trading sessions',
        order: 1,
        course_id: courses[0].data.id,
      }).select().single(),
      supabaseAdmin.from('modules').insert({
        title: 'Reading Charts & Price Action',
        description: 'Candlestick patterns, support/resistance, and trend analysis',
        order: 2,
        course_id: courses[0].data.id,
      }).select().single(),
      supabaseAdmin.from('modules').insert({
        title: 'Risk Management Essentials',
        description: 'Position sizing, stop losses, and risk-reward ratios',
        order: 3,
        course_id: courses[0].data.id,
      }).select().single(),
    ])

    // Create lessons for first module
    await Promise.all([
      supabaseAdmin.from('lessons').insert({
        title: 'What is Forex Trading?',
        description: 'Learn the basics of currency trading',
        order: 1,
        module_id: beginnerModules[0].data.id,
      }),
      supabaseAdmin.from('lessons').insert({
        title: 'Market Sessions Explained',
        description: 'Understanding London, New York, Asian sessions',
        order: 2,
        module_id: beginnerModules[0].data.id,
      }),
      supabaseAdmin.from('lessons').insert({
        title: 'Currency Pairs Overview',
        description: 'Major, minor, and exotic pairs',
        order: 3,
        module_id: beginnerModules[0].data.id,
      }),
    ])

    // Create membership plans
    const plans = await Promise.all([
      supabaseAdmin.from('plans').insert({
        name: 'Community Membership',
        description: 'Access to our exclusive trading community, live sessions, and daily market analysis.',
        price: 99,
        duration: 'monthly',
        features: ['Daily market analysis', 'Weekly live trading sessions', 'Private Discord community', 'Trade breakdowns and reviews', 'Q&A with professional traders'],
        is_monthly: true,
      }).select().single(),
      supabaseAdmin.from('plans').insert({
        name: 'Professional Plan',
        description: 'Complete access to all courses, mentoring sessions, and priority support.',
        price: 299,
        duration: 'quarterly',
        features: ['All courses included', 'Monthly 1-on-1 mentoring', 'Priority email support', 'Advanced strategy access', 'Proprietary indicators', 'Risk management audit'],
        is_monthly: false,
      }).select().single(),
    ])

    console.log('Plans created:', plans.length)

    // Associate courses with plans
    await Promise.all([
      supabaseAdmin.from('plan_courses').insert({
        plan_id: plans[0].data.id,
        course_id: courses[0].data.id,
      }),
      supabaseAdmin.from('plan_courses').insert({
        plan_id: plans[0].data.id,
        course_id: courses[1].data.id,
      }),
      supabaseAdmin.from('plan_courses').insert({
        plan_id: plans[1].data.id,
        course_id: courses[0].data.id,
      }),
      supabaseAdmin.from('plan_courses').insert({
        plan_id: plans[1].data.id,
        course_id: courses[1].data.id,
      }),
      supabaseAdmin.from('plan_courses').insert({
        plan_id: plans[1].data.id,
        course_id: courses[2].data.id,
      }),
    ])

    // Create testimonials
    await Promise.all([
      supabaseAdmin.from('testimonials').insert({
        name: 'James Wilson',
        content: 'The structured approach at Pipsphere transformed my trading. I went from losing consistently to having a profitable strategy after completing the intermediate course.',
        rating: 5,
        is_approved: true,
      }),
      supabaseAdmin.from('testimonials').insert({
        name: 'Maria Garcia',
        content: 'The community membership is worth every penny. Daily analysis and live sessions have helped me understand market movements much better.',
        rating: 5,
        is_approved: true,
      }),
      supabaseAdmin.from('testimonials').insert({
        name: 'David Kim',
        content: 'Elena\'s psychology sessions changed everything. I was my own worst enemy, but now I have the discipline to follow my trading plan.',
        rating: 4,
        is_approved: true,
      }),
    ])

    // Create sample live session
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(15, 0, 0, 0)

    await supabaseAdmin.from('live_sessions').insert({
      title: 'Weekly Market Analysis & Trade Review',
      description: 'Join our senior traders for a comprehensive market analysis and review of the week\'s trading opportunities.',
      scheduled_at: tomorrow.toISOString(),
      duration: 90,
      meeting_url: 'https://zoom.us/j/example',
    })

    console.log('Database seeded successfully!')
    console.log('Admin user: admin@pipsphere.com / admin123')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()