import { ChefHat, Clock, Gauge, Heart, Users } from 'lucide-react'
import React, { useState } from 'react'
import { type Recipe as RecipeType } from '../../contexts/types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useRecipe from '../../hooks/useRecipe'
import useAuth from '../../hooks/useAuth'

interface RecipeProps {
  recipe: RecipeType
  servingMultiplier: number
  setServingMultiplier: React.Dispatch<React.SetStateAction<number>>
}

const Recipe: React.FC<RecipeProps> = ({
  recipe,
  servingMultiplier,
  setServingMultiplier,
}) => {
  const { t } = useTranslation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [notLoginMsg, setNotLoginMsg] = useState(false)
  const { saveRecipe, removeRecipe, savedRecipes } = useRecipe()
  const user = useAuth()

  // Check if the recipe is already saved
  const isSaved = savedRecipes.some((r) => r.id === recipe.id)

  // Toggle the recipe's saved state
  const handleToggleSave = () => {
    setIsAnimating(true)
    if (!user) {
      setNotLoginMsg(true)
    }
    if (isSaved) {
      const saved = savedRecipes.find(
        (savedRecipe) => savedRecipe.id === recipe.id
      )
      if (saved) {
        removeRecipe(saved.docId as string)
      }
    } else {
      saveRecipe(recipe)
    }
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Calculate adjusted portion based on serving multiplier
  const calculatePortion = (portion: string) => {
    const numericValue = parseFloat(portion)
    if (!isNaN(numericValue)) {
      return (numericValue * servingMultiplier).toFixed(0)
    }
    return portion
  }

  const ServingSelector = (
    <div className="flex items-center gap-2">
      <label
        htmlFor="servings"
        className="text-sm text-gray-600 hidden sm:flex"
      >
        Servings:
      </label>
      <select
        id="servings"
        value={servingMultiplier}
        onChange={(e) => setServingMultiplier(Number(e.target.value))}
        className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  )

  const SaveButton = (
    <button
      onClick={handleToggleSave}
      className={classNames(
        'p-2 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none relative',
        {
          'animate-[wiggle_0.3s_ease-in-out]': isAnimating,
        }
      )}
      style={{
        transformOrigin: 'center',
      }}
    >
      <Heart
        className={classNames('w-6 h-6 transition-all duration-300', {
          'text-red-500 scale-110': isSaved,
          'text-gray-500': !isSaved,
          'scale-150': isAnimating,
        })}
        fill={isSaved ? 'currentColor' : 'none'}
      />
      {isAnimating && isSaved && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-10 h-10 bg-red-500/20 rounded-full animate-ping" />
        </div>
      )}
    </button>
  )

  return (
    <div className="bg-white h-full rounded-tl-lg rounded-b-lg pt-6 pb-12 sm:px-10">
      <div className="sm:flex flex-row justify-end items-center gap-4 hidden">
        {ServingSelector}
        {SaveButton}
      </div>
      <div className="sm:px-6 px-4">
        <div className="flex items-center gap-3 mb-2 justify-between">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            {recipe?.title}
          </h1>
          <div className="flex sm:hidden">
            {ServingSelector}
            {SaveButton}
          </div>
        </div>
        {notLoginMsg && (
          <p className="text-gray-700 text-sm text-end">
            {t('recipes.loginMessage')}
          </p>
        )}
        <div className="flex items-center mb-4 py-4 border-b">
          <h4 className="text-gray-700">{recipe?.description}</h4>
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="flex items-center gap-1">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>{recipe?.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-5 h-5 text-gray-500" />
            <span>
              {parseInt(recipe?.servings) * servingMultiplier}{' '}
              {t('recipes.serving')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-5 h-5 text-gray-500" />
            <span>
              {recipe?.calories} {t('recipes.calories')}
            </span>
          </div>
          {recipe?.cuisine && recipe?.cuisine !== 'none' && (
            <div className="flex items-center gap-1">
              <ChefHat className="w-5 h-5 text-gray-500" />
              <span>{recipe?.cuisine}</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
              {t('recipes.yourIngredients')}
            </h2>
            <ul className="space-y-2">
              {recipe?.ingredients?.map(
                (
                  ingredient: { name: string; portion: string; unit: string },
                  index: number
                ) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {ingredient.name} - {calculatePortion(ingredient.portion)}{' '}
                    {ingredient.unit}
                  </li>
                )
              )}
            </ul>

            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              {t('recipes.additionalIngredients')}
            </h2>
            <ul className="space-y-2">
              {recipe?.additionalIngredients?.map(
                (
                  ingredient: { name: string; portion: string; unit: string },
                  index
                ) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {ingredient.name} - {calculatePortion(ingredient.portion)}{' '}
                    {ingredient.unit}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
              {t('recipes.instructions')}
            </h2>
            <ol className="space-y-4">
              {recipe?.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe
