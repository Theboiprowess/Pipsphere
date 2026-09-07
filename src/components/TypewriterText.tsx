'use client'

import { useState, useEffect, useRef } from 'react'

const phrases = [
  'Learn Forex with us',
  'Trade Forex with us',
  'Grow Capital with us'
]

export default function TypewriterText() {
  const [currentText, setCurrentText] = useState('')
  const [reducedMotion, setReducedMotion] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

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

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    const typingSpeed = 50
    const pauseDuration = 2000

    const animate = () => {
      const currentPhrase = phrases[phraseIndex]

      if (!isDeleting) {
        // Typing
        if (charIndex < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, charIndex + 1))
          charIndex++
          timeoutRef.current = setTimeout(animate, typingSpeed)
        } else {
          // Finished typing, pause then start deleting
          isDeleting = true
          timeoutRef.current = setTimeout(animate, pauseDuration)
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setCurrentText(currentPhrase.slice(0, charIndex - 1))
          charIndex--
          timeoutRef.current = setTimeout(animate, typingSpeed)
        } else {
          // Finished deleting, move to next phrase
          isDeleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
          charIndex = 0
          timeoutRef.current = setTimeout(animate, typingSpeed)
        }
      }
    }

    // Start animation
    timeoutRef.current = setTimeout(animate, typingSpeed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [reducedMotion])

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
