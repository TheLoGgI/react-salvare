import { Box, Heading, List, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { useParams } from "react-router-dom"

import { MetricListItem } from "../../components/MetricListItem"
import { FoodDataContext } from "../../context/DataContext"
import { FoodDataHintsType } from "../../types/ingredients"

function Ingredients() {
    const { id } = useParams()
    const ingredientData = useContext<Array<FoodDataHintsType>>(FoodDataContext)

    const currentIngredient = ingredientData?.find(
        (ingredient) => ingredient.food.foodId === id
    )

    const label = currentIngredient?.food.label
    const energi = currentIngredient?.food.nutrients.ENERC_KCAL
    const protein = currentIngredient?.food.nutrients.PROCNT
    const fat = currentIngredient?.food.nutrients.FAT
    const fibers = currentIngredient?.food.nutrients.FIBTG
    const carbohydrate = currentIngredient?.food.nutrients.CHOCDF

    return (
        <Box as="section" p="4">
            <Heading>{label}</Heading>

            <Text my="5" fontWeight="bold">
                Per 100 g
            </Text>
            <List maxW="60">
                <MetricListItem type="Energi" metric={energi} unit="kcal" />
                <MetricListItem type="Protein" metric={protein} unit="g" />
                <MetricListItem type="Fat" metric={fat} unit="g" />
                <MetricListItem type="Fibers" metric={fibers} unit="g" />
                <MetricListItem
                    type="Carbohydrate"
                    metric={carbohydrate}
                    unit="g"
                />
            </List>
        </Box>
    )
}

export default Ingredients
