import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      experience_level,
      forex_knowledge,
      main_goal,
      available_time,
      learning_style,
      risk_knowledge,
    } = body

    // Get user from session
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Determine recommended path based on assessment
    let recommendedPath = 'beginner_forex_foundation'

    if (main_goal === 'learn_forex') {
      if (experience_level === 'complete_beginner' || experience_level === 'some_knowledge') {
        recommendedPath = 'beginner_forex_foundation'
      } else if (experience_level === 'active_trader') {
        recommendedPath = 'full_mentorship'
      } else {
        recommendedPath = 'full_mentorship'
      }
    } else if (main_goal === 'market_analysis') {
      recommendedPath = 'signals_membership'
    } else if (main_goal === 'prop_firm') {
      recommendedPath = 'prop_firm_challenge_support'
    } else if (main_goal === 'community') {
      recommendedPath = 'full_mentorship'
    }

    // Save assessment results if user is logged in
    if (user) {
      const { error: insertError } = await supabaseAdmin
        .from('assessment_results')
        .insert({
          user_id: user.id,
          experience_level,
          forex_knowledge,
          main_goal,
          available_time,
          learning_style,
          risk_knowledge,
          recommended_path: recommendedPath,
        })

      if (insertError) {
        console.error('Error saving assessment:', insertError)
      }
    }

    return NextResponse.json({ recommended_path: recommendedPath })
  } catch (error) {
    console.error('Error processing assessment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
