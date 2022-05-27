import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    const bodyOverflow = document.getElementById('body-overflow')
    if(bodyOverflow) {
      bodyOverflow.scrollTo(0, 0)
    }
  }, [pathname])
  return <>{children}</>
}

export default ScrollToTop
