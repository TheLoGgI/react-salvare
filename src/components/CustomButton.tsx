import { Button, ButtonProps } from "@chakra-ui/react"

const CustomChakraButton: React.FC<ButtonProps> = ({
    children,
    isActive,
    ...props
}) => {
    return (
        <Button
            bg={isActive ? "buttonBgSelected" : "buttonBg"}
            color="text"
            fontWeight={isActive ? "bold" : "normal"}
            _hover={{ bg: "buttonBgHover" }}
            {...props}
        >
            {children}
        </Button>
    )
}

export default CustomChakraButton
