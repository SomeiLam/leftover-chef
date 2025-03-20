type Ingredient = {
  id: string
  name: string
  nutrients?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  selected?: boolean
}

type Step = 'input' | 'ingredients' | 'preferences' | 'recipes' | 'saved'

type Preferences =
  | 'Traditional'
  | 'Quick cook'
  | 'beginner friendly'
  | 'Microwave only'
  | 'Spicy'

type Recipe = {
  id: string
  title: string
  time: string
  servings: string
  cuisine: string
  ingredients: { name: string; portion: string }[]
  additionalIngredients: string[]
  instructions: string[]
  description: string
  preference: Preferences[]
  calories: string
}

export { type Ingredient, type Step, type Recipe }
