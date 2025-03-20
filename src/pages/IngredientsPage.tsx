import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useIngredients } from '../contexts/IngredientsContext'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../components/UI'
import { Loading } from '../components/Loading'

const API_URL = 'http://localhost:5000'

const fetchIngredients = async (data: { imagePath: File }) => {
  const formData = new FormData()
  formData.append('image', data.imagePath)
  const response = await fetch(`${API_URL}/get-ingredients`, {
    method: 'POST',
    // Remove headers: { 'Content-Type': 'application/json' },
    body: formData,
  })
  if (!response.ok) {
    throw new Error('Failed to get ingredients')
  }
  return response.json()
}

const IngredientsPage: React.FC = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const {
    imagePath,
    addIngredient,
    ingredients,
    removeIngredient,
    setImageIngredients,
    imageIngredients,
  } = useIngredients()

  const handleToggleIngredient = (id: string) => {
    const updatedIngredients = imageIngredients.map((ingredient) =>
      ingredient.id === id
        ? { ...ingredient, selected: !ingredient.selected }
        : ingredient
    )
    setImageIngredients(updatedIngredients)
  }

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

  const handleNext = () => {
    const updatedIngredients = imageIngredients.filter(
      (ingredient) =>
        ingredient.selected !== false && !ingredients.includes(ingredient)
    )
    if (updatedIngredients.length > 0 || ingredients.length > 0) {
      navigate('/preferences')
    } else {
      setError(t('ingredients.noIngredientsSelected'))
    }
  }

  useEffect(() => {
    // Replace '/path/to/image.png' with your actual image path.
    if (imagePath && imageIngredients.length === 0) {
      const requestData = { imagePath }
      setLoading(true)

      fetchIngredients(requestData)
        .then((data) => {
          if (!hasFetched) {
            setHasFetched(true)
            if (data.length > 0) {
              setImageIngredients(data)
            } else {
              setError(t('ingredients.noFoodDetected'))
            }
          }
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    } else {
      setError(t('ingredients.noFoodDetected'))
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Loading type="upload" />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {t('ingredients.title')}
        </h1>
        <p className="text-gray-600">{t('ingredients.subtitle')}</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {imageIngredients.map((ingredient) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl shadow-sm border ${
                  ingredient.selected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ingredient.selected}
                    onChange={() => handleToggleIngredient(ingredient.id)}
                    className="cursor-pointer mt-1 h-5 w-5 text-purple-500 rounded focus:ring-purple-500"
                  />
                  <div className="flex-1 space-y-2">
                    <span className="font-medium text-gray-800">
                      {ingredient.name}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">
                        {t('ingredients.nutrients.calories')}:{' '}
                        {ingredient.nutrients?.calories}
                      </div>
                      <div className="text-gray-600">
                        {t('ingredients.nutrients.protein')}:{' '}
                        {ingredient.nutrients?.protein}g
                      </div>
                      <div className="text-gray-600">
                        {t('ingredients.nutrients.carbs')}:{' '}
                        {ingredient.nutrients?.carbs}g
                      </div>
                      <div className="text-gray-600">
                        {t('ingredients.nutrients.fat')}:{' '}
                        {ingredient.nutrients?.fat}g
                      </div>
                    </div>
                  </div>
                </label>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-row justify-between items-start pt-6">
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {} /* Open ingredient input modal */}
            className="flex items-center gap-2 px-6 py-2 text-purple-500 hover:text-purple-600 font-medium"
          >
            <Plus className="w-5 h-5" />
            {t('ingredients.addMore')}
          </motion.button>
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
              {t('input.add')}
            </motion.button>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {ingredients.map((ingredient) => {
                if (!ingredient.nutrients)
                  return (
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
                  )
              })}
            </AnimatePresence>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
        >
          {t('common.next')}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default IngredientsPage
