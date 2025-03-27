import { useMemo } from 'react'
import TabsContainer from '../components/Recipe/TabsContainer'
import { Preferences, useIngredients } from '../contexts/IngredientsContext'
import { Lang, type Recipe as RecipeType } from '../types'
import Header from '../components/Recipe/Header'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../components/UI'

const API_URL = import.meta.env.VITE_BACKEND_API

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
  const json = await response.json()
  return Object.values(json.recipe).flat() as RecipeType[]
}

const RecipesPage = () => {
  const { ingredients, preferences } = useIngredients()
  const { i18n } = useTranslation()

  const selectedIngredients = useMemo(
    () => ingredients.filter((ing) => ing.selected || !ing.fromImage),
    [ingredients]
  )

  const queryData = useMemo(
    () => ({
      ingredients: selectedIngredients.map((i) => i.name),
      preferences,
      language:
        i18n.language === 'zh'
          ? '中文'
          : i18n.language === 'ja'
            ? '日本語'
            : ('English' as Lang),
    }),
    [selectedIngredients, preferences, i18n.language]
  )

  const {
    data: recipes,
    isLoading,
    isError,
    refetch,
  } = useQuery<RecipeType[]>({
    queryKey: ['recipes', queryData],
    queryFn: () => fetchRecipe(queryData),
    enabled: selectedIngredients.length > 0,
  })

  // const selectedInggredients = ingredients.filter(
  //   (ingredient) => ingredient.selected || !ingredient.fromImage
  // )

  // // // Fetch the recipe only once when the component mounts.
  // useEffect(() => {
  //   // If ingredients array is empty, don't fetch and mark loading as false.
  //   if (selectedInggredients.length === 0) {
  //     setLoading(false)
  //     return
  //   }
  //   const data = {
  //     ingredients: selectedInggredients.map((i) => i.name),
  //     preferences,
  //     language:
  //       i18n.language === 'zh'
  //         ? '中文'
  //         : i18n.language === 'ja'
  //           ? '日本語'
  //           : ('English' as Lang),
  //   }
  //   if (!hasFetched) {
  //     fetchRecipe(data)
  //       .then((json) => {
  //         if (!hasFetched) {
  //           const { recipe } = json
  //           const flattened = Object.values(recipe) as RecipeType[]
  //           setRecipes(flattened)
  //           setHasFetched(true)
  //         }

  //         setLoading(false)
  //       })
  //       .catch((err) => {
  //         console.log('error', err)
  //         setError(err)
  //         setLoading(false)
  //       })
  //   }
  // }, [ingredients, preferences]) // empty dependency array ensures one-time fetch

  // If there are no ingredients, show a message to return to the ingredients page.
  if (selectedIngredients.length === 0) {
    return (
      <p className="ml-10">
        No ingredients available. Please return to the ingredients page to add
        some ingredients.
      </p>
    )
  }

  if (isLoading) {
    return <Loading type="generate" />
  }

  if (isError) {
    return (
      <div className="">
        <p>Could not generate recipe</p>
        <button
          onClick={() => refetch()}
          className="mt-5 px-4 py-1 rounded-lg text-center hover:cursor-pointer border border-gray-200 hover:bg-gray-100"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <Header />
      {recipes && <TabsContainer recipes={recipes} />}
    </div>
  )
}

export default RecipesPage
