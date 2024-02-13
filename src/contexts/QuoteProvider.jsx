import React, { createContext, useContext, useState } from 'react'

const QuoteContext = createContext()

export const QuoteProvider = ({ children }) => {

    const [isCloseIconNotClicked, setIsCloseIconNotClicked] = useState(true)

    const toggleCloseIcon = () => {
        setIsCloseIconNotClicked(!isCloseIconNotClicked)
      }

  return (
    <QuoteContext.Provider value={{ isCloseIconNotClicked, toggleCloseIcon }}>
        {children}
    </QuoteContext.Provider>
  )
}

export const useQuoteContext = () => {
  return useContext(QuoteContext)
}