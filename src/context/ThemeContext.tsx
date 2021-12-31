import React, { createContext } from 'react'

export type ContextProviderProps = {
    children: JSX.Element
}

type ThemeType = 'light' | 'dark'
export const ThemeContextProvider = createContext<ThemeType>('dark')

export default function ThemeContext({children}: ContextProviderProps) {
    
    return (
        <ThemeContextProvider.Provider value="light">
            {children}
        </ThemeContextProvider.Provider>
    )
}
