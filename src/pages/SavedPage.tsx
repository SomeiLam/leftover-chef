import { useState } from 'react'
import { useIngredients } from '../contexts/IngredientsContext'
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
import { AnimatePresence, motion } from 'framer-motion'
import Recipe from '../components/Recipe/Recipe'

const SavedPage = () => {
  const { recipes } = useIngredients()
  const [openRecipeId, setOpenRecipeId] = useState<string | null>(null)

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
          <p className="text-sm">Traditional</p>
        </div>
      )
    } else if (pre === 'Microwave only') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-blue-800"
        >
          <Microwave className="h-4 w-4" />
          <p className="text-sm">Microwave</p>
        </div>
      )
    } else if (pre === 'Quick cook') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-orange-500"
        >
          <FastForward className="h-4 w-4" />
          <p className="text-sm">Quick</p>
        </div>
      )
    } else if (pre === 'Spicy') {
      return (
        <div
          key={pre}
          className="flex flex-row gap-1 items-center text-red-500"
        >
          <Flame className="h-4 w-4" />
          <p className="text-sm">Spicy</p>
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
          <p className="text-sm">Easy</p>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {recipes.map((recipe) => {
          const isOpen = openRecipeId === recipe.id
          return (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Accordion Header */}
              <motion.button
                onClick={() => toggleAccordion(recipe.id)}
                className={classNames(
                  'w-full text-left py-3 px-3 flex items-center justify-between border-purple-300',
                  'bg-purple-50 hover:bg-purple-100 border border-purple-100 rounded-lg',
                  { 'bg-purple-200': isOpen }
                )}
                initial={false}
                animate={{ scale: isOpen ? 1.01 : 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex flex-col gap-1 max-w-11/12">
                  <div className="flex flex-row gap-3 flex-wrap">
                    {recipe.preference?.map((pre) =>
                      renderPreferenceIcons(pre)
                    )}
                  </div>
                  <h3 className="font-medium truncate">{recipe.title}</h3>
                </div>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </motion.button>

              {/* Accordion Content with AnimatePresence */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key={recipe.id + '-content'}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="p-3" id={recipe.id}>
                      <Recipe recipe={recipe} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default SavedPage
