import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useIngredients } from '../contexts/IngredientsContext'
import { useNavigate } from 'react-router-dom'
import { TextInput } from './UI'

type ManualInputProps = {
  onMethodChange: (method: 'image' | 'text') => void
}

const ManualInput: React.FC<ManualInputProps> = ({ onMethodChange }) => {
  const { t } = useTranslation()
  const { ingredients, addIngredient, removeIngredient, setIsImage } =
    useIngredients() // Access ingredients and addIngredient from the context
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      const newIngredient = {
        id: Date.now().toString(),
        name: inputValue.trim(),
      }
      addIngredient(newIngredient) // Dispatches the action to add the ingredient
      setInputValue('')
    }
  }

  const handleRemoveIngredient = (id: string) => {
    removeIngredient(id)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIngredient()
    }
  }

  const handleSubmit = () => {
    navigate('/preferences')
    setIsImage(false)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {t('input.manualInputTitle')}
        </h2>
        <p className="text-gray-600">{t('input.manualInputDescription')}</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <TextInput
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyPress={handleKeyPress}
            placeholder={t('input.ingredientPlaceholder')}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddIngredient}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 hover:cursor-pointer transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:flex">{t('input.add')}</span>
          </motion.button>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {ingredients.map((ingredient) => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <span className="text-gray-800">{ingredient.name}</span>
                <button
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 hover:cursor-pointer transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {ingredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
          >
            {t('common.next')}
          </motion.button>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => onMethodChange('image')}
        className="text-purple-500 hover:text-purple-600 font-medium"
      >
        {t('input.switchToImage')}
      </motion.button>
    </motion.div>
  )
}

export default ManualInput
