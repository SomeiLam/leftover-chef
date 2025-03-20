import React, { useState } from 'react'
import UploadImage from '../components/UploadImage'
import ManualInput from '../components/ManualInput'
import { useIngredients } from '../contexts/IngredientsContext'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../components/LanguageSelector'

type InputMethod = 'image' | 'text'

const InputPage = () => {
  const { t } = useTranslation()
  const { isImage } = useIngredients()
  const [inputMethod, setInputMethod] = useState<InputMethod>(
    isImage ? 'image' : 'text'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 w-full max-w-lg mx-auto"
    >
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
        >
          {t('input.title')}
        </motion.h1>
        <p className="text-gray-600 text-lg">{t('input.subtitle')}</p>
      </div>

      {inputMethod === 'image' ? (
        <UploadImage onMethodChange={setInputMethod} />
      ) : (
        <ManualInput onMethodChange={setInputMethod} />
      )}
      <LanguageSelector />
    </motion.div>
  )
}

export default InputPage
