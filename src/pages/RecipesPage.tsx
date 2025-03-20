import { useState, useEffect } from 'react'
import TabsContainer from '../components/Recipe/TabsContainer'
import {
  Lang,
  Preferences,
  useIngredients,
} from '../contexts/IngredientsContext'
import { type Recipe as RecipeType } from '../contexts/types'
import Header from '../components/Recipe/Header'
import { Loading } from '../components/Loading'
import { useTranslation } from 'react-i18next'

const API_URL = 'http://localhost:5000'

const fetchRecipe = async (data: {
  ingredients: string[]
  preferences: Preferences
  language: Lang
}) => {
  const response = await fetch(`${API_URL}/generate-recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }
  return response.json()
}

const RecipesPage = () => {
  const { ingredients, imageIngredients, preferences } = useIngredients()
  const [hasFetched, setHasFetched] = useState(false)
  const [recipes, setRecipes] = useState<RecipeType[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { i18n } = useTranslation()

  const allIngredients = imageIngredients
    .filter((i) => i.selected)
    .concat(ingredients)

  // // Fetch the recipe only once when the component mounts.
  useEffect(() => {
    // If ingredients array is empty, don't fetch and mark loading as false.
    if (allIngredients.length === 0) {
      setLoading(false)
      return
    }
    const data = {
      ingredients: allIngredients.map((i) => i.name),
      preferences,
      language:
        i18n.language === 'zh'
          ? '中文'
          : i18n.language === 'ja'
            ? '日本語'
            : ('English' as Lang),
    }
    if (!hasFetched) {
      fetchRecipe(data)
        .then((json) => {
          if (!hasFetched) {
            const { recipe } = json
            const flattened = Object.values(recipe) as RecipeType[]
            setRecipes(flattened)
            setHasFetched(true)
          }

          setLoading(false)
        })
        .catch((err) => {
          console.log('error', err)
          setError(err)
          setLoading(false)
        })
    }
  }, [ingredients, imageIngredients, preferences]) // empty dependency array ensures one-time fetch

  // If there are no ingredients, show a message to return to the ingredients page.
  if (allIngredients.length === 0) {
    return (
      <div className="ml-20">
        <p>
          No ingredients available. Please return to the ingredients page to add
          some ingredients.
        </p>
      </div>
    )
  }

  if (loading) {
    return <Loading type="generate" />
  }

  if (error) {
    return <div>Could not generate recipe</div>
  }

  return (
    <div className="flex flex-col gap-5">
      <Header />
      {recipes && <TabsContainer recipes={recipes} />}
    </div>
  )
}

export default RecipesPage
