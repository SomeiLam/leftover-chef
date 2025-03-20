import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useState } from 'react'
import { Lang, useIngredients } from '../contexts/IngredientsContext'

const languages: { code: string; name: Lang }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
]

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const { updateLanguage } = useIngredients()

  const handleChangeLanguage = (lang: { code: string; name: Lang }) => {
    i18n.changeLanguage(lang.code)
    updateLanguage(lang.name)
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={{
          width: isHovered ? 250 : 40,
          backgroundColor: isHovered
            ? 'rgb(255, 255, 255)'
            : 'rgb(255, 255, 255)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative h-10 rounded-full shadow-lg flex items-center justify-start overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-2"
            >
              <Globe className="w-6 h-6 text-gray-600" />
            </motion.div>
          ) : (
            <motion.div
              key="languages"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center gap-2 px-2 w-full"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleChangeLanguage(lang)
                  }}
                  className={`px-3 py-1 text-nowrap rounded-full text-sm font-medium transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default LanguageSelector
