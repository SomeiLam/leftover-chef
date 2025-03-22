import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, ChefHat, Flame, Microwave, Utensils } from 'lucide-react'
import { Cuisine, useIngredients } from '../contexts/IngredientsContext'
import { TextInput, PreferenceCard } from '../components/UI'
import { useNavigate } from 'react-router-dom'

const PreferencesPage = () => {
  const { t } = useTranslation()
  const { ingredients, preferences, updatePreferences } = useIngredients()
  const navigate = useNavigate()

  const selectedIngredients = ingredients.filter(
    (ingredient) => ingredient.selected || !ingredient.fromImage
  )

  const handlePreferenceClick = (
    type: 'traditional' | 'quickCook' | 'beginner' | 'microwaveOnly'
  ) => {
    updatePreferences({
      ...preferences,
      [type]: !preferences[type],
    })
  }

  const getSpiceLevelColor = (level: number) => {
    if (level <= 0) return 'rgb(34, 197, 94)' // green
    if (level <= 25) return 'rgb(234, 179, 8)' // light yellow
    if (level <= 50) return 'rgb(249, 115, 22)' // orange
    if (level <= 75) return 'rgb(239, 68, 68)' // red
    return 'rgb(185, 28, 28)' // dark red
  }

  const getSpiceLevelText = (level: number) => {
    if (level <= 0) return t('preferences.spiceLevel.notSpicy')
    if (level <= 25) return t('preferences.spiceLevel.mild')
    if (level <= 50) return t('preferences.spiceLevel.medium')
    if (level <= 75) return t('preferences.spiceLevel.spicy')
    return t('preferences.spiceLevel.verySpicy')
  }

  const cuisines: { id: Cuisine; flag: string }[] = [
    { id: 'any', flag: '🍽️' },
    { id: 'italian', flag: '🇮🇹' },
    { id: 'chinese', flag: '🇨🇳' },
    { id: 'japanese', flag: '🇯🇵' },
    { id: 'indian', flag: '🇮🇳' },
    { id: 'mexican', flag: '🇲🇽' },
    { id: 'french', flag: '🇫🇷' },
    { id: 'thai', flag: '🇹🇭' },
    { id: 'korean', flag: '🇰🇷' },
  ]

  return (
    <div className="pb-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
          >
            {t('preferences.title')}
          </motion.h1>
          <p className="text-gray-600">{t('preferences.subtitle')}</p>
        </div>

        {/* Ingredients Summary */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedIngredients.length > 0
              ? t('preferences.selectedIngredients')
              : t('preferences.noIngredients')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.length > 0 ? (
              selectedIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                >
                  {ingredient.name}{' '}
                </div>
              ))
            ) : (
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/ingredients')}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {t('preferences.goBackToInput')}
                </motion.button>
              </div>
            )}
          </div>
        </section>

        {selectedIngredients.length > 0 && (
          <div className="space-y-6">
            {/* Cooking Preferences */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {t('preferences.cooking.title')}
              </h2>
              <div className="grid gap-4">
                <PreferenceCard
                  id="traditional"
                  icon={Utensils}
                  label={t('preferences.cooking.traditional')}
                  description={t('preferences.cooking.traditionalDesc')}
                  enabled={preferences.traditional}
                  handlePreferenceClick={() =>
                    handlePreferenceClick('traditional')
                  }
                />
                <PreferenceCard
                  id="quickCook"
                  icon={Clock}
                  label={t('preferences.cooking.quickCook')}
                  description={t('preferences.cooking.quickCookDesc')}
                  enabled={preferences.quickCook}
                  handlePreferenceClick={() =>
                    handlePreferenceClick('quickCook')
                  }
                />
                <PreferenceCard
                  id="beginner"
                  icon={ChefHat}
                  label={t('preferences.cooking.beginner')}
                  description={t('preferences.cooking.beginnerDesc')}
                  enabled={preferences.beginner}
                  handlePreferenceClick={() =>
                    handlePreferenceClick('beginner')
                  }
                />
                <PreferenceCard
                  id="microwaveOnly"
                  icon={Microwave}
                  label={t('preferences.cooking.microwaveOnly')}
                  description={t('preferences.cooking.microwaveOnlyDesc')}
                  enabled={preferences.microwaveOnly}
                  handlePreferenceClick={() =>
                    handlePreferenceClick('microwaveOnly')
                  }
                />
              </div>
            </section>

            {/* Spice Level & Servings */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {t('preferences.spiceAndServings')}
              </h2>

              {/* Spice Level */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('preferences.spiceLevel.title')}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {t('preferences.spiceLevel.description')}
                        </p>
                      </div>
                      <Flame
                        className="w-5 h-5"
                        style={{
                          color: getSpiceLevelColor(
                            preferences.spiceLevel as number
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.spiceLevel}
                      onChange={(e) =>
                        updatePreferences({
                          ...preferences,
                          spiceLevel: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, rgb(34, 197, 94), rgb(234, 179, 8), rgb(249, 115, 22), rgb(239, 68, 68), rgb(185, 28, 28))`,
                      }}
                    />
                    <div
                      className="text-sm font-medium text-center"
                      style={{
                        color: getSpiceLevelColor(
                          preferences.spiceLevel as number
                        ),
                      }}
                    >
                      {getSpiceLevelText(preferences.spiceLevel as number)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cuisine Preferences */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {t('preferences.dietary.title')}
              </h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {cuisines.map((cuisine) => (
                      <motion.button
                        key={cuisine.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updatePreferences({
                            ...preferences,
                            cuisine: cuisine.id,
                          })
                        }
                        className={`p-2 rounded-lg text-center hover:cursor-pointer ${
                          preferences.cuisine === cuisine.id &&
                          !preferences.customCuisine
                            ? 'bg-purple-50 border-2 border-purple-500'
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-4xl mb-1">{cuisine.flag}</div>
                        <div className="font-medium">
                          {t(`preferences.dietary.cuisines.${cuisine.id}`)}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <div>
                    <TextInput
                      placeholder={t('preferences.dietary.customCuisine')}
                      value={preferences.customCuisine}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        updatePreferences({
                          ...preferences,
                          customCuisine: e.target.value,
                        })
                      }}
                      full
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Ready to Go Button */}

        {selectedIngredients.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/recipes')}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            {t('preferences.generateRecipe')}
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

export default PreferencesPage
