import React, { createContext, useState, useContext } from 'react'
import { Ingredient } from '../types'

// Define the state shape
interface IngredientsState {
  ingredients: Ingredient[]
  isImage: boolean
  imagePath: File | null
  preferences: Preferences
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
}

// Define the context type
interface IngredientsContextType {
  ingredients: Ingredient[]
  isImage: boolean
  imagePath: File | null
  preferences: Preferences
  addIngredient: (ingredient: Ingredient) => void
  toggleIngredient: (id: string) => void
  removeIngredient: (id: string) => void
  setIngredients: (ingredients: Ingredient[]) => void
  setIsImage: (isImage: boolean) => void
  setImagePath: (path: File | null) => void
  updatePreferences: (preferences: Preferences) => void
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

  const setImagePath = (path: File | null) => {
    if (path) {
      setState((prev) => ({
        ...prev,
        imagePath: path,
      }))
    }
  }

  const updatePreferences = (preferences: Preferences) => {
    setState((prev) => ({
      ...prev,
      preferences,
    }))
  }

  return (
    <IngredientsContext.Provider
      value={{
        ingredients: state.ingredients,
        isImage: state.isImage,
        imagePath: state.imagePath,
        preferences: state.preferences,
        addIngredient,
        toggleIngredient,
        removeIngredient,
        setIngredients,
        setIsImage,
        setImagePath,
        updatePreferences,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  )
}

// Custom hook to use the ingredients context
const useIngredients = (): IngredientsContextType => {
  const context = useContext(IngredientsContext)
  if (!context) {
    throw new Error('useIngredients must be used within an IngredientsProvider')
  }
  return context
}

export { IngredientsProvider, useIngredients }
