import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  doc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'
import useAuth from './useAuth'
import { Recipe } from '../types'
import { useEffect, useState } from 'react'

const db = getFirestore()

const useRecipe = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([])
  const user = useAuth()

  const saveRecipe = async (recipe: Recipe) => {
    if (user) {
      await addDoc(collection(db, 'recipes'), {
        userId: user.uid,
        createdAt: serverTimestamp(),
        ...recipe,
      })
      getRecipe()
    }
  }

  const removeRecipe = async (recipeId: string) => {
    try {
      // Create a reference to the recipe document in the "recipes" collection
      const recipeRef = doc(db, 'recipes', recipeId)
      // Delete the document
      await deleteDoc(recipeRef)
      getRecipe()
    } catch (error) {
      console.error('Error removing recipe: ', error)
    }
  }

  const getRecipe = async () => {
    if (user) {
      const recipesRef = collection(db, 'recipes')
      const q = query(recipesRef, where('userId', '==', user.uid))
      try {
        const querySnapshot = await getDocs(q)
        const recipes: Recipe[] = []
        querySnapshot.forEach((docSnapshot) => {
          recipes.push({
            docId: docSnapshot.id,
            ...(docSnapshot.data() as Recipe),
          })
        })
        setSavedRecipes(recipes)
      } catch (error) {
        console.error('Error fetching recipes: ', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (user) {
      const recipesRef = collection(db, 'recipes')
      const q = query(recipesRef, where('userId', '==', user.uid))

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const recipes: Recipe[] = []
          querySnapshot.forEach((docSnapshot) => {
            recipes.push({
              // Include the real Firestore doc ID so you can use it for updates/deletes
              docId: docSnapshot.id,
              ...(docSnapshot.data() as Recipe),
            })
          })
          setSavedRecipes(recipes)
          setIsLoading(false)
        },
        (error) => {
          console.error('Error fetching recipes:', error)
          setIsLoading(false)
        }
      )

      // Clean up the subscription on unmount
      return () => unsubscribe()
    }
  }, [user])

  return { saveRecipe, savedRecipes, isLoading, removeRecipe }
}

export default useRecipe
