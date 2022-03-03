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
    initialColorMode: "dark",
    useSystemColorMode: false,
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

const global = {
    "html, body": {
        boxSizing: "borderBox",
    },
}

const semanticTokens = {
    colors: {
        error: "red.500",
        bg: {
            default: "#D0DADE",
            _dark: "#1A2C33",
        },
        buttonBg: {
            default: "#6C919F",
            _dark: "#23414D",
        },
        buttonBgHover: {
            default: "#9CE3FF",
            _dark: "#1B5658",
        },
        buttonBgSelected: {
            default: "#8FC4D9",
            _dark: "#216078",
        },
        buttonSubmit: {
            default: "#FFA23D",
            _dark: "#F99323",
        },
        buttonSubmitHover: {
            default: "#FF8500",
            _dark: "#FF8500",
        },
        buttonIcon: {
            default: "#507482",
            _dark: "#B4DCEC",
        },
        textSubmit: {
            default: "white",
            _dark: "black",
        },
        text: {
            default: "black",
            _dark: "white",
        },
        cardBg: {
            default: "#6C919F",
            _dark: "#293B43",
        },
        // subheading: {
        //     default: "black",
        //     _dark: "#70C0DF",
        // },
        icons: {
            default: "#3B525B",
            _dark: "#859EA8",
        },
        muted: {
            default: "#24343A",
            _dark: "gray.300",
        },
    },
}

// 3. extend the theme
const customTheme = extendTheme(
    {
        semanticTokens,
        config,
        global,
        // components: {
        //     Button: CustomButtonStyles,

        //     Input: CustomInputStyles,
        // },
    },
    withDefaultColorScheme({ colorScheme: "teal" })
)

export default customTheme
