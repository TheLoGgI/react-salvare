import { ColorModeScript, useColorMode } from "@chakra-ui/react"
import React, { createContext } from "react"

import theme from "../theme"

export type ContextProviderProps = {
    children: JSX.Element
}

type ThemeType = "light" | "dark"
export const ThemeContextProvider = createContext<ThemeType>("dark")

export default function ThemeContext({ children }: ContextProviderProps) {
    const { colorMode } = useColorMode()

    return (
        <ThemeContextProvider.Provider value={colorMode}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
        </ThemeContextProvider.Provider>
    )
}
