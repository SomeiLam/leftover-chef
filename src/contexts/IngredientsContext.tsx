// contexts/IngredientsContext.tsx

import React, { createContext, useState, useContext } from 'react'
import { Ingredient, Recipe } from './types' // Import Ingredient type

// Define the state shape
interface IngredientsState {
  ingredients: Ingredient[]
  imageIngredients: Ingredient[]
  isImage: boolean
  imagePath: File | null
  preferences: Preferences
  language: Lang
  recipes: Recipe[]
}

export type Cuisine =
  | 'any'
  | 'italian'
  | 'chinese'
  | 'japanese'
  | 'indian'
  | 'mexican'
  | 'french'
  | 'thai'
  | 'korean'

export type Lang = 'English' | '日本語' | '中文'

export interface Preferences {
  traditional: boolean
  quickCook: boolean
  beginner: boolean
  microwaveOnly: boolean
  spiceLevel: number
  cuisine: Cuisine
  customCuisine: string
}

// Initial state
const initialState: IngredientsState = {
  ingredients: [],
  imageIngredients: [],
  isImage: true,
  imagePath: null,
  preferences: {
    traditional: false,
    quickCook: false,
    beginner: false,
    microwaveOnly: false,
    spiceLevel: 0,
    cuisine: 'any',
    customCuisine: '',
  },
  language: 'English',
  recipes: [],
}

// Define the context type
interface IngredientsContextType {
  ingredients: Ingredient[]
  isImage: boolean
  imagePath: File | null
  imageIngredients: Ingredient[]
  preferences: Preferences
  language: Lang
  recipes: Recipe[]
  addIngredient: (ingredient: Ingredient) => void
  toggleIngredient: (id: string) => void
  removeIngredient: (id: string) => void
  setIngredients: (ingredients: Ingredient[]) => void
  setIsImage: (isImage: boolean) => void
  setImagePath: (path: File) => void
  setImageIngredients: (ingredients: Ingredient[]) => void
  updatePreferences: (preferences: Preferences) => void
  updateLanguage: (lang: Lang) => void
  addRecipe: (recipe: Recipe) => void
  removeRecipe: (id: string) => void
}

// Create the context
const IngredientsContext = createContext<IngredientsContextType | undefined>(
  undefined
)

const IngredientsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<IngredientsState>(initialState)

  const addIngredient = (ingredient: Ingredient) => {
    setState((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient],
    }))
  }

  const toggleIngredient = (id: string) => {
    setState((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      ),
    }))
  }

  const removeIngredient = (id: string) => {
    setState((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    }))
  }

  const setIngredients = (ingredients: Ingredient[]) => {
    setState((prev) => ({
      ...prev,
      ingredients: ingredients,
    }))
  }

  const setIsImage = (isImage: boolean) => {
    setState((prev) => ({
      ...prev,
      isImage,
    }))
  }

  const setImagePath = (path: File) => {
    if (path) {
      setState((prev) => ({
        ...prev,
        imagePath: path,
      }))
    }
  }

  const setImageIngredients = (ingredients: Ingredient[]) => {
    setState((prev) => ({
      ...prev,
      imageIngredients: ingredients,
    }))
  }

  const updatePreferences = (preferences: Preferences) => {
    setState((prev) => ({
      ...prev,
      preferences,
    }))
  }

  const updateLanguage = (lang: Lang) => {
    setState((prev) => ({
      ...prev,
      language: lang,
    }))
  }

  const addRecipe = (recipe: Recipe) => {
    setState((prev) => ({
      ...prev,
      recipes: [...prev.recipes, recipe],
    }))
  }

  const removeRecipe = (id: string) => {
    setState((prev) => ({
      ...prev,
      recipes: prev.recipes.filter((recipe) => recipe.id !== id),
    }))
  }

  return (
    <IngredientsContext.Provider
      value={{
        ingredients: state.ingredients,
        isImage: state.isImage,
        imagePath: state.imagePath,
        imageIngredients: state.imageIngredients,
        preferences: state.preferences,
        language: state.language,
        recipes: state.recipes,
        addIngredient,
        toggleIngredient,
        removeIngredient,
        setIngredients,
        setIsImage,
        setImagePath,
        setImageIngredients,
        updatePreferences,
        updateLanguage,
        addRecipe,
        removeRecipe,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  )
}

// Custom hook to use the ingredients context
export const useIngredients = (): IngredientsContextType => {
  const context = useContext(IngredientsContext)
  if (!context) {
    throw new Error('useIngredients must be used within an IngredientsProvider')
  }
  return context
}

export { IngredientsProvider }
