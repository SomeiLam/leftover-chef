import { ChefHat, Heart, Plus, LogIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AppBar = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useAuth()

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ChefHat className="w-6 h-6 text-white" />
            <span className="font-semibold text-white">{t('appName')}</span>
          </motion.div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/saved')}
                  className="flex items-center gap-2 text-white hover:text-purple-200"
                >
                  <Heart className="w-5 h-5" />
                  <span>{t('nav.savedRecipes')}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-white hover:text-purple-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('nav.createRecipe')}</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/signin')}
                className="flex items-center gap-2 text-white hover:text-purple-200"
              >
                <LogIn className="w-5 h-5" />
                <span>{t('auth.signIn')}</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppBar
