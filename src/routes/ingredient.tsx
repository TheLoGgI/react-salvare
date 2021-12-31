import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { MaterialContext } from "../context/DataContext"
import { FoodDataHintsType } from "../types/ingredients"

// import Search from '../components/Search';

type MetricItemType = {
    type: string
    unit?: string
    metric: number | undefined
}

function MetricListItem({ type, metric, unit }: MetricItemType) {
    return (
        <ListItem borderBottom="2px dashed lightgray">
            <Flex justify="space-between" py="2">
                <Text>{type}:</Text>
                {metric?.toFixed(2)} {unit}
            </Flex>
        </ListItem>
    )
}

function Ingredients() {
    const { id } = useParams()
    const navigate = useNavigate()
    const ingredientData = useContext<Array<FoodDataHintsType>>(MaterialContext)

    useEffect(() => {
        if (ingredientData === null || ingredientData.length === 0) {
            navigate("/")
        }
    }, [ingredientData, navigate])

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
        <Box as="main" bg="#1A2C33" p="4">
            <Heading color="blue.50">{label}</Heading>

            <Text color="blue.50" my="5" fontWeight="bold">
                Per 100 g
            </Text>
            <List color="blue.50" maxW="60">
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
