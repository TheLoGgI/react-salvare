import { Url } from "url"

import { Box, Image, Text } from "@chakra-ui/react"
import { useRef } from "react"
import { Link } from "react-router-dom"

type CardPropsType = {
    image: Url | string
    label: string
    alt: string
    pageLink: string
}

export default function Card({ image, label, alt, pageLink }: CardPropsType) {
    // const imgRef = useRef<HTMLImageElement>(null)
    // '/ingredient/' + ingredientId
    return (
        <Link to={pageLink}>
            <Box bg="cyan.800" _hover={{ bg: "cyan.500" }}>
                <Text fontSize="xl" p="4" color="white">
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                </Text>
                <Image
                    src={
                        (image ? image : "placeholder.png") as unknown as string
                    }
                    w="100%"
                    maxH="250"
                    objectFit="cover"
                    alt={alt ?? "food"}
                    fallbackSrc="placeholder.png"
                />
            </Box>
        </Link>
    )
}
