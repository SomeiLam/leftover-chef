import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

const useAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user)
      setUser(user)
    })
    return () => unsubscribe()
  }, [])
  return user
}

export default useAuth
