import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0)
  }, [location])

  return null // This component doesn't render anything visually
}

export default ScrollToTop
