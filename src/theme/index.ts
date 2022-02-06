// 1. import `extendTheme` function
import {
    ThemeConfig,
    extendTheme,
    theme,
    withDefaultColorScheme,
} from "@chakra-ui/react"
console.log("theme: ", theme)

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
}

const colors = {
    brand: {
        100: "#f7fafc",
        // ...
        900: "#1a202c",
    },
    light: {
        100: "#D0DADE",
    },
    whiteAlpha: {
        ...theme.colors.whiteAlpha,
        300: "#B4DCEC",
    },
    gray: {
        ...theme.colors.gray,
        200: "#B4DCEC",
    },
    teal: {
        50: "#E6FFFA",
        100: "#335563",
        200: "#335563",
        300: "#4FD1C5",
        400: "#38B2AC",
        500: "#319795",
        600: "#2C7A7B",
        700: "#285E61",
        800: "#234E52",
        900: "#1A2C33",
    },
}

// 3. extend the theme
const customTheme = extendTheme(
    { config },
    withDefaultColorScheme({ colorScheme: "teal" })
)

export default customTheme
