import { theme } from "@chakra-ui/react"

const CustomInput = {
    // ...theme.components.Input,

    baseStyle: ({ colorMode, isActive, ...props }: any) => {
        console.log("props: ", props)
        return {
            bg: colorMode === "dark" ? "red" : "#C8E9F6",
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
    // Two variants: outline and solid
    variants: {
        outline: {
            border: "2px solid",
            borderColor: "purple.500",
            color: "purple.500",
        },
        solid: {
            background: "green",
            color: "red",
        },
    },

    // The default size and variant values
    defaultProps: {
        size: "md",
        variant: "solid",
    },
}

export default CustomInput
