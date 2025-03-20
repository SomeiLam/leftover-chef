import React from 'react'
import { IngredientsProvider } from './IngredientsContext'

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <IngredientsProvider>{children}</IngredientsProvider>
}
