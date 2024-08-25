import { Spinner } from '@nextui-org/react'
import React from 'react'


function LoadingScreen() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen flex align-middle items-center justify-center bg-white/5 backdrop-blur z-50">
          <Spinner size="lg" />
      </div>
    </>
  )
}

export default LoadingScreen