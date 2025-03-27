import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { type Recipe as RecipeType } from '../../types'
import Recipe from './Recipe'
import {
  Amphora,
  Baby,
  ChevronDown,
  ChevronUp,
  FastForward,
  Flame,
  Microwave,
} from 'lucide-react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface TabsContainerProps {
  recipes: RecipeType[]
}

const TabsContainer: React.FC<TabsContainerProps> = ({ recipes }) => {
  // For the desktop tab layout
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(
    recipes[0]?.id
  )
  const [openRecipeId, setOpenRecipeId] = useState<string | null>(null)
  const [servingMultiplier, setServingMultiplier] = useState(1)

  const { t } = useTranslation()

  const handleTabClick = (id: string) => {
    setSelectedRecipeId(id)
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  )

  // Toggle accordion on mobile
  const toggleAccordion = (id: string) => {
    setOpenRecipeId((prev) => (prev === id ? null : id))
  }

  // Helper to render preference icons
  const renderPreferenceIcons = (pre: string) => {
    if (pre === 'Traditional') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-red-800"
        >
          <Amphora className="h-4 w-4" />
          <p className="text-sm">{t('preferences.cooking.traditional')}</p>
        </div>
      )
    } else if (pre === 'Microwave only') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-blue-800"
        >
          <Microwave className="h-4 w-4" />
          <p className="text-sm">{t('preferences.cooking.microwaveOnly')}</p>
        </div>
      )
    } else if (pre === 'Quick cook') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-orange-500"
        >
          <FastForward className="h-4 w-4" />
          <p className="text-sm">{t('preferences.cooking.quickCook')}</p>
        </div>
      )
    } else if (pre === 'Spicy') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-red-500"
        >
          <Flame className="h-4 w-4" />
          <p className="text-sm">{t('preferences.spiceLevel.spicy')}</p>
        </div>
      )
    } else {
      // "beginner friendly"
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-green-700"
        >
          <Baby className="h-4 w-4" />
          <p className="text-sm">{t('preferences.cooking.beginner')}</p>
        </div>
      )
    }
  }

  useEffect(() => {
    setSelectedRecipeId(recipes[0].id)
    setOpenRecipeId(recipes[0].id)
  }, [recipes])

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      {/* DESKTOP/Tablet Layout (Tabs): Hidden on mobile with "hidden md:block" */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-5 sm:gap-0 w-full">
          {/* Tabs Row */}
          <div className="bg-gray-50 rounded-lg">
            <div className="flex md:grid grid-cols-3 md:h-20 gap-2">
              {recipes.length > 0 &&
                recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleTabClick(recipe.id)}
                    className={classNames(
                      'cursor-pointer py-3 rounded-x-lg rounded-t-lg relative transition-all text-gray-700',
                      {
                        'bg-purple-100 border-b-2 border-purple-500':
                          recipe.id === selectedRecipeId,
                        'bg-purple-50 hover:bg-purple-100':
                          recipe.id !== selectedRecipeId,
                      }
                    )}
                  >
                    <div className="flex flex-col gap-2 px-3">
                      <div className="flex flex-row gap-3 flex-wrap">
                        {recipe?.preference?.length > 0 ? (
                          recipe?.preference?.map((pre) =>
                            renderPreferenceIcons(pre)
                          )
                        ) : (
                          <div className="h-5" />
                        )}
                      </div>
                      <h3 className="font-medium truncate">{recipe.title}</h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recipe Details Column */}
          <div className="w-full rounded-tl-lg rounded-b-lg">
            {/* AnimatePresence for switching tab content */}
            <AnimatePresence mode="wait">
              {selectedRecipe && (
                <motion.div
                  key={selectedRecipe.id}
                  id={selectedRecipe.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Recipe
                    recipe={selectedRecipe}
                    setServingMultiplier={setServingMultiplier}
                    servingMultiplier={servingMultiplier}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MOBILE Layout (Accordion): block on mobile, hidden on md+ */}
      <div className="block md:hidden">
        {recipes.map((recipe) => {
          const isOpen = openRecipeId === recipe.id
          return (
            <div key={recipe.id} className="border-b last:border-b-0">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(recipe.id)}
                className={classNames(
                  'w-full text-left py-3 px-3 flex items-center justify-between',
                  'bg-purple-50 hover:bg-purple-100',
                  {
                    'bg-purple-100': isOpen,
                    'bg-purple-50': !isOpen,
                  }
                )}
              >
                <div className="flex flex-col gap-1 max-w-11/12">
                  <div className="flex flex-row gap-3 flex-wrap">
                    {recipe.preference?.map((pre) =>
                      renderPreferenceIcons(pre)
                    )}
                  </div>
                  <h3 className="font-medium truncate">{recipe.title}</h3>
                </div>
                {/* Icon or indicator for open/close */}
                <span className="text-sm text-gray-500">
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>

              {/* Accordion Content with AnimatePresence */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key={recipe.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="p-3" id={recipe.id}>
                      <Recipe
                        recipe={recipe}
                        setServingMultiplier={setServingMultiplier}
                        servingMultiplier={servingMultiplier}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Disclaimer or note */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <p className="text-gray-600 leading-relaxed">{t('recipes.note')}</p>
      </div>
    </div>
  )
}

export default TabsContainer
