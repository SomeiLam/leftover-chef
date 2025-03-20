import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIngredients } from '../contexts/IngredientsContext'

const NavigateBack = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isImage } = useIngredients()

  const showPrevious =
    pathname === '/ingredients' ||
    pathname === '/preferences' ||
    pathname === '/recipes'

  const handlePrevious = () => {
    if (pathname === '/recipes') {
      navigate('/preferences')
    } else if (pathname === '/preferences') {
      if (isImage) {
        navigate('/ingredients')
      } else {
        navigate('/')
      }
    } else if (pathname === '/ingredients') {
      navigate('/')
    }
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          {showPrevious && (
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-purple-500 transition-colors pointer-events-auto"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavigateBack
