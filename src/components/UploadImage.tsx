import React, { useState } from 'react'
import { Camera, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useIngredients } from '../contexts/IngredientsContext'

type UploadImageProps = {
  onMethodChange: (method: 'image' | 'text') => void
}

const UploadImage: React.FC<UploadImageProps> = ({ onMethodChange }) => {
  const { t } = useTranslation()
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setImagePath } = useIngredients()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setImagePath(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {t('input.uploadTitle')}
        </h2>
        <p className="text-gray-600">{t('input.uploadDescription')}</p>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-xl p-8 text-center space-y-4 transition-colors cursor-pointer ${
          uploadedImage
            ? 'border-purple-500 bg-purple-50'
            : 'border-purple-200 hover:border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50'
        }`}
      >
        <AnimatePresence>
          {previewUrl ? (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={previewUrl}
              alt="Uploaded ingredients"
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Camera className="w-12 h-12 text-purple-400 mx-auto" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="block cursor-pointer">
                <div className="space-y-2">
                  <p className="text-gray-600">{t('input.dropzoneText')}</p>
                  <p className="text-sm text-gray-500">
                    {t('input.tips.title')}
                  </p>
                  <ul className="text-sm text-gray-500 ">
                    <li>💡 {t('input.tips.lighting')}</li>
                    <li>💡 {t('input.tips.spread')}</li>
                    <li>💡 {t('input.tips.labels')}</li>
                  </ul>
                </div>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => onMethodChange('text')}
          className="text-purple-500 hover:text-purple-600 font-medium"
        >
          {t('input.manualInput')}
        </motion.button>

        {uploadedImage && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/ingredients')}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
          >
            {t('common.next')}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default UploadImage
