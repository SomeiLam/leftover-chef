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
  fromImage?: boolean
}

type Step = 'input' | 'ingredients' | 'preferences' | 'recipes' | 'saved'

type Preferences =
  | 'Traditional'
  | 'Quick cook'
  | 'beginner friendly'
  | 'Microwave only'
  | 'Spicy'

type Recipe = {
  userId?: string
  docId?: string
  id: string
  title: string
  time: string
  servings: string
  cuisine: string
  ingredients: { name: string; portion: string; unit: string }[]
  additionalIngredients: { name: string; portion: string; unit: string }[]
  instructions: string[]
  description: string
  preference: Preferences[]
  calories: string
}

type Lang = 'English' | '日本語' | '中文'

export { type Ingredient, type Step, type Recipe, type Lang, type Preferences }
