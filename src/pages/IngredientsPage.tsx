import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import imageCompression from 'browser-image-compression'
import { Plus, ArrowRight, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useIngredients } from '../contexts/IngredientsContext'
import { useNavigate } from 'react-router-dom'
import { TextInput, Loading } from '../components/UI'
import { useQuery } from '@tanstack/react-query'
import { Lang } from '../types'

const API_URL = import.meta.env.VITE_BACKEND_API
// const API_URL = 'http://localhost:5000'

const compressImage = async (file: File) => {
  // Configure compression options
  const options = {
    maxSizeMB: 1, // Target maximum size in MB (adjust as needed)
    maxWidthOrHeight: 1024, // Limit the width/height (e.g., 1024px)
    useWebWorker: true, // Use a web worker for performance
  }

  try {
    // Compress the file
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    console.error('Image compression error:', error)
    // Fallback to the original file if compression fails
    return file
  }
}

const fetchIngredients = async ({
  imagePath,
  language,
}: {
  imagePath: File
  language: Lang
}) => {
  const compressedFile = await compressImage(imagePath)
  const formData = new FormData()
  formData.append('image', compressedFile)
  formData.append('language', language)

  const response = await fetch(`${API_URL}/get-ingredients`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || 'Failed to get ingredients')
  }

  return response.json()
}

const IngredientsPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    imagePath,
    addIngredient,
    setIngredients,
    ingredients,
    removeIngredient,
  } = useIngredients()

  const language = useMemo<Lang>(
    () =>
      i18n.language === 'zh'
        ? '中文'
        : i18n.language === 'ja'
          ? '日本語'
          : 'English',
    [i18n.language]
  )

  const shouldFetch = useMemo(
    () =>
      !!imagePath &&
      ingredients.filter((ingredient) => ingredient.fromImage).length === 0,
    [imagePath, ingredients]
  )

  const {
    data: fetchedIngredients,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['ingredients', imagePath?.name, language],
    queryFn: () =>
      fetchIngredients({
        imagePath: imagePath!,
        language,
      }),
    enabled: shouldFetch,
    retry: false,
  })

  const handleToggleIngredient = (id: string) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id
        ? { ...ingredient, selected: !ingredient.selected }
        : ingredient
    )
    setIngredients(updatedIngredients)
  }

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      const newIngredient = {
        id: Date.now().toString(),
        name: inputValue.trim(),
      }
      addIngredient(newIngredient)
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
    const nonSelectedImageIngredients = ingredients.filter(
      (ingredient) => !ingredient.selected && ingredient.fromImage
    )
    if (nonSelectedImageIngredients.length < ingredients.length) {
      navigate('/preferences')
    } else {
      setError(t('ingredients.noIngredientsSelected'))
    }
  }

  useEffect(() => {
    if (fetchedIngredients && fetchedIngredients.length > 0) {
      setIngredients([...ingredients, ...fetchedIngredients])
    } else if (fetchedIngredients && fetchedIngredients.length === 0) {
      setError(t('ingredients.noFoodDetected'))
    }
  }, [fetchedIngredients])

  useEffect(() => {
    if (imagePath) {
      const url = URL.createObjectURL(imagePath)
      setPreviewUrl(url)

      return () => URL.revokeObjectURL(url)
    }
  }, [imagePath])

  if (isLoading) {
    return <Loading type="upload" />
  }

  if (isError) {
    return (
      <p className="text-red-500 ml-20">
        {t('ingredients.fetchIngredientsError')}
      </p>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="flex flex-row items-center gap-2 justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
          >
            {t('ingredients.title')}
          </motion.h1>
        </div>
        {imagePath ? (
          <p className="text-gray-600">{t('ingredients.subtitle')}</p>
        ) : (
          <div className="flex flex-col justify-center gap-2 mt-10">
            <p className="text-gray-600">{t('ingredients.noImage')}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex flex-row w-auto self-center gap-2 items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
            >
              {t('ingredients.gobackToUpload')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {previewUrl && (
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={previewUrl}
            alt="Uploaded ingredients"
            className="w-auto h-60 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {ingredients
            .filter((ingredient) => ingredient.fromImage)
            .map((ingredient) => (
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
                      {/* Title row: ingredient name + small badge for "per 100g" */}
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">
                          {ingredient.name}
                        </span>
                        <span className="bg-gray-100 text-xs text-gray-500 px-2 py-0.5 rounded">
                          {t('ingredients.nutrients.per100g')}
                        </span>
                      </div>

                      {/* Nutrients grid */}
                      <div className="grid grid-cols-5 gap-1 text-sm">
                        <div className="col-span-2">
                          <div className="text-gray-600">
                            {t('ingredients.nutrients.calories')}:{' '}
                            {ingredient.nutrients?.calories || 0}
                          </div>
                          <div className="text-gray-600">
                            {t('ingredients.nutrients.fat')}:{' '}
                            {ingredient.nutrients?.fat || 0}g
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="text-gray-600">
                            {t('ingredients.nutrients.protein')}:{' '}
                            {ingredient.nutrients?.protein || 0}g
                          </div>
                          <div className="text-gray-600">
                            {t('ingredients.nutrients.carbs')}:{' '}
                            {ingredient.nutrients?.carbs || 0}g
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {imagePath && (
        <div className="flex flex-col sm:flex-row justify-between items-start pt-6">
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
                {t('input.add')}
              </motion.button>
            </div>
            <div className="space-y-2 mb-5">
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
      )}
    </motion.div>
  )
}

export default IngredientsPage
