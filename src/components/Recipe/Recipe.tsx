import { ChefHat, Clock, CookingPot, Gauge, Heart, Users } from 'lucide-react'
import React from 'react'
import { type Recipe as RecipeType } from '../../contexts/types'
import { useTranslation } from 'react-i18next'
import { useIngredients } from '../../contexts/IngredientsContext'
import classNames from 'classnames'

interface RecipeProps {
  recipe: RecipeType
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const { t } = useTranslation()
  const { recipes: savedRecipes, addRecipe, removeRecipe } = useIngredients()

  // Check if the recipe is already saved
  const isSaved = savedRecipes.some((r) => r.id === recipe.id)

  // Toggle the recipe's saved state
  const handleToggleSave = () => {
    if (isSaved) {
      removeRecipe(recipe.id)
    } else {
      addRecipe(recipe)
    }
  }

  const SaveButton = (
    <button
      onClick={handleToggleSave}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
    >
      {/* 
      If recipe is saved, show a red filled heart,
      else show an outlined heart.
    */}
      <Heart
        className={classNames('w-6 h-6', {
          'text-red-500': isSaved,
          'text-gray-500': !isSaved,
        })}
        fill={isSaved ? 'currentColor' : 'none'}
      />
    </button>
  )

  return (
    <div className="bg-white h-full rounded-tl-lg rounded-b-lg pt-6 pb-12 sm:px-10">
      <div className="sm:flex flex-row justify-end hidden">{SaveButton}</div>
      <div className="sm:px-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <CookingPot className="min-w-6 min-h-6 text-green-500" />
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            {recipe?.title}
          </h1>
          <div className="flex sm:hidden">{SaveButton}</div>
        </div>
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
              {recipe?.servings} {t('recipes.serving')}
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
              <span>
                {recipe?.cuisine}
                {t('recipes.cuisine')}
              </span>
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
                  ingredient: { name: string; portion: string },
                  index: number
                ) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {ingredient.name} - {ingredient.portion}
                  </li>
                )
              )}
            </ul>

            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              {t('recipes.additionalIngredients')}
            </h2>
            <ul className="space-y-2">
              {recipe?.additionalIngredients?.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {ingredient}
                </li>
              ))}
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
