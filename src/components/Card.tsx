import { Box, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { Url } from "url"


type CardPropsType = {
    image: Url | string,
    label: string, 
    alt: string,
    ingredientId: {}
}

export default function Card({ image, label, alt, ingredientId }: CardPropsType) {
    // '/ingredient/' + ingredientId
    return (
        <Link to={ingredientId} >
        <Box bg="cyan.800"  _hover={{bg: "cyan.500"}}>
            <Text fontSize='xl' p="4" color="white">{label.charAt(0).toUpperCase() + label.slice(1)}</Text>
            <Image 
                src={(image ? image : 'placeholder.png') as unknown as string} 
                w="100%" 
                maxH="250" 
                objectFit="cover" 
                alt={alt ?? 'food'}
                onError={(e) => {
                    console.log('e: ', e);
                }}
                />
        </Box>
        </Link>
    )
}
