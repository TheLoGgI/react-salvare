import { Url } from "url"

import useFetch, { useFetchType } from "./useFetch"

export type FoodDatabseHintsFoodType = {
    foodId: string
    label: string
    nutrients: {
        ENERC_KCAL: number
        PROCNT: number
        FAT: number
        CHOCDF: number
        FIBTG: number
    }
    category: string
    categoryLabel: string
    image: Url
}

export type FoodDataHintsType = {
    food: FoodDatabseHintsFoodType
    measures: []
}

export type FoodDataType = {
    text: string
    parsed: []
    hints: FoodDataHintsType[]
    _links: {}
}

export type useFoodRequest<T> = Omit<
    useFetchType<FoodDataHintsType[]>,
    "data"
> & {
    data: T
}

export function useRecipies(search: string) {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=a925abe5&app_key=54dc6200ceb063b6dc6a39a8454d0a36`
    return useFetch(url)
}

export function useFood(search: string): useFoodRequest<FoodDataHintsType[]> {
    const APP_ID = "7a6b01ff"
    const APP_KEY = "c9cab2012ffacc8a812f6746ac47a614"

    const url = `https://api.edamam.com/api/food-database/parser?ingr=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
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
