import React from 'react'
import { WiStars } from 'react-icons/wi'

const HeroSubTitleGradient = ({content}:{content:string}) => {
  return (
    <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full py-2 text-sm font-medium px-4">
    <WiStars size={20} />
    <span className="hero-subtitle-text">
      {content}
    </span>
  </span>
  )
}

export default HeroSubTitleGradient