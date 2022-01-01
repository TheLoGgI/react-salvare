import {
    FoodDataHintsType,
    FoodDataType,
    useFoodRequest,
} from "../types/ingredients"
import { RecipesData } from "../types/recipes"
import useFetch from "./useFetch"

export function useRecipies(search: string) {
    const RECIPES_API_ID = process.env.REACT_APP_API_RECIPES_ID
    const RECIPES_API_KEY = process.env.REACT_APP_API_RECIPES_KEY
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${RECIPES_API_ID}&app_key=${RECIPES_API_KEY}`
    const { data: recipiesData, ...rest } = useFetch<RecipesData>(url)

    if (recipiesData === null) {
        return { data: [], ...rest }
    }

    // const filterRegex = new RegExp(search, "gi")
    // const searchItems = foodData?.hints.filter((item) =>
    //     filterRegex.test(item.food.label)
    // )
    // console.log("searchItems: ", searchItems)

    return { data: recipiesData, ...rest }
}

export function useFood(search: string): useFoodRequest<FoodDataHintsType[]> {
    const FOOD_API_ID = process.env.REACT_APP_API_FOOD_DATABASE_ID
    const FOOD_API_KEY = process.env.REACT_APP_API_FOOD_DATABASE_KEY

    const url = `https://api.edamam.com/api/food-database/parser?ingr=${search}&app_id=${FOOD_API_ID}&app_key=${FOOD_API_KEY}`
    const { data: foodData, ...rest } = useFetch<FoodDataType>(url)

    if (foodData === undefined || foodData === null) {
        return { data: [], ...rest }
    }

    // const filterRegex = new RegExp(search, "gi")
    // const searchItems = foodData?.hints.filter((item) =>
    //     filterRegex.test(item.food.label)
    // )
    // console.log("searchItems: ", searchItems)

    return { data: foodData.hints, ...rest }
}

// https://api.edamam.com/api/food-database/parser?ingr=beans&app_id=7a6b01ff&app_key=c9cab2012ffacc8a812f6746ac47a614
