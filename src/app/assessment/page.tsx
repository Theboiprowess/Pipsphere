'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface AssessmentData {
  experience_level: string
  forex_knowledge: string
  main_goal: string
  available_time: string
  learning_style: string
  risk_knowledge: string
}

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    experience_level: '',
    forex_knowledge: '',
    main_goal: '',
    available_time: '',
    learning_style: '',
    risk_knowledge: '',
  })
  const [loading, setLoading] = useState(false)

  const questions = [
    {
      id: 'experience_level',
      title: 'What is your current trading experience level?',
      subtitle: 'This helps us understand where you are in your trading journey',
      options: [
        { value: 'complete_beginner', label: 'Complete Beginner', description: 'I\'ve never traded before' },
        { value: 'some_knowledge', label: 'Some Knowledge', description: 'I understand basics but haven\'t traded much' },
        { value: 'active_trader', label: 'Active Trader', description: 'I trade regularly but want to improve' },
        { value: 'experienced', label: 'Experienced', description: 'I have 2+ years of trading experience' },
      ],
    },
    {
      id: 'forex_knowledge',
      title: 'How would you rate your forex market knowledge?',
      subtitle: 'This helps us tailor the educational content for you',
      options: [
        { value: 'very_limited', label: 'Very Limited', description: 'I know almost nothing about forex' },
        { value: 'basic', label: 'Basic', description: 'I understand currency pairs and market basics' },
        { value: 'intermediate', label: 'Intermediate', description: 'I know technical analysis and fundamentals' },
        { value: 'advanced', label: 'Advanced', description: 'I have deep market knowledge' },
      ],
    },
    {
      id: 'main_goal',
      title: 'What is your main goal with Pipsphere?',
      subtitle: 'This helps us recommend the right path for you',
      options: [
        { value: 'learn_forex', label: 'Learn Forex Trading', description: 'I want to become a confident trader' },
        { value: 'market_analysis', label: 'Receive Market Analysis', description: 'I want trade ideas and analysis' },
        { value: 'prop_firm', label: 'Prop Firm Challenge', description: 'I want to pass a prop firm evaluation' },
        { value: 'community', label: 'Join Community', description: 'I want to learn with other traders' },
      ],
    },
    {
      id: 'available_time',
      title: 'How much time can you dedicate to trading/learning?',
      subtitle: 'This helps us recommend an appropriate learning pace',
      options: [
        { value: 'less_than_5h', label: 'Less than 5 hours/week', description: 'I have very limited time' },
        { value: '5_10h', label: '5-10 hours/week', description: 'I can dedicate some time' },
        { value: '10_20h', label: '10-20 hours/week', description: 'I have moderate time available' },
        { value: 'more_than_20h', label: 'More than 20 hours/week', description: 'I can dedicate significant time' },
      ],
    },
    {
      id: 'learning_style',
      title: 'What is your preferred learning style?',
      subtitle: 'This helps us deliver content in the best format for you',
      options: [
        { value: 'video', label: 'Video Lessons', description: 'I prefer watching video tutorials' },
        { value: 'reading', label: 'Reading/Written Content', description: 'I prefer reading guides and articles' },
        { value: 'interactive', label: 'Interactive/Hands-on', description: 'I learn by doing and practicing' },
        { value: 'live', label: 'Live Sessions', description: 'I prefer live sessions and Q&A' },
      ],
    },
    {
      id: 'risk_knowledge',
      title: 'How would you rate your risk management knowledge?',
      subtitle: 'Risk management is crucial for successful trading',
      options: [
        { value: 'none', label: 'None', description: 'I don\'t understand risk management' },
        { value: 'basic', label: 'Basic', description: 'I know about stop losses and position sizing' },
        { value: 'good', label: 'Good', description: 'I apply risk management in my trading' },
        { value: 'excellent', label: 'Excellent', description: 'Risk management is my strength' },
      ],
    },
  ]

  const handleOptionSelect = (questionId: string, value: string) => {
    setAssessmentData(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/assessment/result?path=${data.recommended_path}`)
      } else {
        console.error('Failed to submit assessment')
      }
    } catch (error) {
      console.error('Error submitting assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentStep]
  const isLastStep = currentStep === questions.length - 1
  const canProceed = assessmentData[currentQuestion.id as keyof AssessmentData] !== ''

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted">Step {currentStep + 1} of {questions.length}</span>
              <span className="text-sm text-muted">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{currentQuestion.title}</h1>
            <p className="text-muted mb-8">{currentQuestion.subtitle}</p>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                    assessmentData[currentQuestion.id as keyof AssessmentData] === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-sm text-muted">{option.description}</div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card/80"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed || loading}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : isLastStep ? 'Get My Recommendation' : 'Next'}
              </button>
            </div>
          </div>

          {/* Quick Skip */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/programs')}
              className="text-muted hover:text-primary transition-colors text-sm"
            >
              Skip assessment and view all programs
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
