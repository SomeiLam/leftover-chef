import { LogIn, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const AppBar = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useAuth()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/signin')
        console.log('Signed out successfully')
      })
      .catch((error) => {
        console.error('Error signing out:', error)
      })
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src="favicon.png" alt="icon" className="h-7 w-7" />
            <span className="font-semibold text-white hidden sm:block">
              {t('appName')}
            </span>
          </motion.div>
          <div className="flex items-center gap-5 sm:gap-10 mr-2">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/saved')}
                  className="flex items-center gap-1 text-white hover:text-purple-200"
                >
                  <span>{t('nav.savedRecipes')}</span>
                  {/* <Heart className="w-5 h-5" /> */}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1 text-white hover:text-purple-200"
                >
                  <span>{t('nav.createRecipe')}</span>
                  {/* <Plus className="w-5 h-5" /> */}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-white hover:text-purple-200"
                >
                  <span className="hidden sm:flex">{t('nav.logout')}</span>
                  <LogOut className="sm:hidden w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/signin')}
                className="flex items-center gap-2 text-white hover:text-purple-200"
              >
                <LogIn className="w-5 h-5" />
                <span>{t('nav.login')}</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppBar
