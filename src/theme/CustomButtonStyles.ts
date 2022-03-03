import { theme } from "@chakra-ui/react"

const Button = {
    baseStyle: ({ colorMode, isActive }: any) => {
        return {
            bg: colorMode === "dark" ? "#23414D" : "#C8E9F6",
            color: colorMode === "dark" ? "white" : "black",
            fontWeight: isActive ? "bold" : "normal",
            _active: {
                bg: colorMode === "dark" ? "#216078" : "#8FC4D9",
            },
            _hover: {
                bg: colorMode === "dark" ? "#1B5658" : "#9CE3FF",
            },
        }
    },

    variants: () => ({}),
}

export default Button
