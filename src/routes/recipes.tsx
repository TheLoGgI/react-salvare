import { Box, Heading, List, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { useParams } from "react-router-dom"

import { MetricListItem } from "../components/MetricListItem"
import { RecipesDataContext } from "../context/DataContext"
import { RecipesData } from "../types/recipes"

export default function Recipies() {
    const { id } = useParams()
    // const navigate = useNavigate()
    const recipesData = useContext<RecipesData>(RecipesDataContext)
    console.log("recipesData: ", recipesData)

    // useEffect(() => {
    //     if (ingredientData === null || ingredientData.length === 0) {
    //         navigate("/")
    //     }
    // }, [ingredientData, navigate])

    const currentIngredient = recipesData.hits?.find(
        (hit) => hit.recipe.id === id
    )
    console.log("currentIngredient: ", currentIngredient)

    if (currentIngredient === undefined) return <Heading>Error</Heading>

    const totalNutrients = Object.values(
        currentIngredient?.recipe.totalNutrients
    )
    console.log("totalNutrients: ", totalNutrients)

    return (
        <Box as="main" bg="#1A2C33" p="4">
            <Heading color="blue.50">Label</Heading>

            <Text color="blue.50" my="5" fontWeight="bold">
                Per 100 g
            </Text>
            <List color="blue.50" maxW="60">
                {totalNutrients.map((nutrient) => (
                    <MetricListItem
                        type={nutrient.label}
                        metric={nutrient.quantity}
                        unit={nutrient.unit}
                    />
                ))}
            </List>
        </Box>
    )
}
