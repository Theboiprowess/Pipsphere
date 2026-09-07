'use client'

import { useState, useEffect } from 'react'

const phrases = [
  'Learn Forex with us',
  'Trade Forex with us',
  'Grow Capital with us'
]

export default function TypewriterText() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setCurrentText(phrases[0])
      return
    }

    const typingSpeed = 50
    const pauseDuration = 2000

    const interval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex]

      if (!isDeleting) {
        // Typing
        if (charIndex < currentPhrase.length) {
          setCurrentText(prev => prev + currentPhrase[charIndex])
          setCharIndex(prev => prev + 1)
        } else {
          // Finished typing, pause then start deleting
          clearInterval(interval)
          setTimeout(() => {
            setIsDeleting(true)
            setCharIndex(prev => prev - 1)
          }, pauseDuration)
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setCurrentText(prev => prev.slice(0, -1))
          setCharIndex(prev => prev - 1)
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false)
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length)
          setCharIndex(0)
        }
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [currentPhraseIndex, isDeleting, charIndex, reducedMotion])

  // Split text into two parts: before "with us" and "with us"
  const parts = currentText.split('with us')
  const firstPart = parts[0] || ''
  const secondPart = parts.length > 1 ? 'with us' : ''

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
      <span className="text-foreground">{firstPart}</span>
      {secondPart && (
        <span className="text-accent">{secondPart}</span>
      )}
    </h1>
  )
}
