'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('react-lottie-player/dist/LottiePlayerLight'), { ssr: false })

const HeroAnimation = ({ className = '' }) => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch('/hero-animation.json')
      .then((response) => response.json())
      .then(setAnimationData)
      .catch(() => {})
  }, [])

  if (!animationData) return null

  return <Lottie loop play animationData={animationData} className={className} />
}

export default HeroAnimation
