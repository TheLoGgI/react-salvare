import { useEffect, useMemo, useRef, useState } from "react"

import {
    FoodDataHintsType,
    FoodDataType,
    useFoodRequest,
} from "../types/ingredients"
import { RecipesData, RecipesDataHints } from "../types/recipes"
import useFetch from "./useFetch"

type PaginationDetails = {
    pagesPerPage: number
    numberOfPages: number
    currentPage: number
}
const RECIPES_API_ID = process.env.REACT_APP_API_RECIPES_ID
const RECIPES_API_KEY = process.env.REACT_APP_API_RECIPES_KEY

export function useRecipies(
    search: string,
    accumaltivePagination: boolean
): useFoodRequest<RecipesData> {
    const [pagination, setPagination] = useState<
        Map<string, Array<RecipesDataHints[]>>
    >(new Map())
    const [recipieUrl, setRecipieUrl] = useState<string>("")

    const fetchOptions: RequestInit = useMemo(() => {
        return { method: "GET", mode: "cors" }
    }, [])

    const { data: recipiesData, ...rest } = useFetch<RecipesData>(
        recipieUrl,
        fetchOptions
    )

    const pages = useMemo<PaginationDetails>(() => {
        if (recipiesData === null || recipiesData.count === 0) {
            return { pagesPerPage: 0, numberOfPages: 0, currentPage: 0 }
        }

        const pagesPerPage = recipiesData.to - recipiesData.from + 1
        const numberOfPages = recipiesData.count / pagesPerPage
        const currentPage = recipiesData.from / pagesPerPage

        return {
            pagesPerPage,
            numberOfPages,
            currentPage,
        }
    }, [recipiesData])

    const next = () => {
        const nextRecipieLink = recipiesData?._links.next.href
        if (nextRecipieLink) {
            setRecipieUrl(nextRecipieLink)
        }
    }

    useEffect(() => {
        setRecipieUrl(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${RECIPES_API_ID}&app_key=${RECIPES_API_KEY}`
        )
    }, [search])

    useEffect(() => {
        const searchTerm = search.toLowerCase()

        if (recipiesData !== null && recipiesData.count > 0) {
            const tempPag = new Map(pagination)
            const tempValue = tempPag.get(searchTerm) || []
            tempValue.push(recipiesData.hits)
            tempPag.set(searchTerm, tempValue)
            setPagination(tempPag)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipiesData])

    if (recipiesData === null) {
        return {
            next,
            data: {
                from: 1,
                to: 1,
                count: 0,
                _links: {
                    next: {
                        href: "",
                        title: "Error",
                    },
                },
                hits: [],
            },
            ...rest,
        }
    }

    const paginatedData = pagination.get(search)?.flat() || []
    const mappedHits = paginatedData.map((hit: any) => {
        hit!.recipe.id = hit!.recipe.uri.split("#")[1]!
        return hit
    })
    // console.log("mappedHits: ", mappedHits)

    return {
        data: {
            ...recipiesData,
            hits: mappedHits as RecipesDataHints[],
        },
        next,
        ...pages,
        ...rest,
    }
}

export function useFood(search: string): useFoodRequest<FoodDataHintsType[]> {
    const FOOD_API_ID = process.env.REACT_APP_API_FOOD_DATABASE_ID
    const FOOD_API_KEY = process.env.REACT_APP_API_FOOD_DATABASE_KEY

    const url = `https://api.edamam.com/api/food-database/parser?ingr=${search}&app_id=${FOOD_API_ID}&app_key=${FOOD_API_KEY}`
    const { data: foodData, ...rest } = useFetch<FoodDataType>(url)

    const next = () => {
        // const nextRecipieLink = recipiesData?._links.next.href
        // if (nextRecipieLink) {
        //     // setRecipieUrl(nextRecipieLink)
        // }
    }

    if (foodData === undefined || foodData === null) {
        return { data: [], next, ...rest }
    }

    // const filterRegex = new RegExp(search, "gi")
    // const searchItems = foodData?.hints.filter((item) =>
    //     filterRegex.test(item.food.label)
    // )
    // console.log("searchItems: ", searchItems)

    return { data: foodData.hints, next, ...rest }
}

// https://api.edamam.com/api/food-database/parser?ingr=beans&app_id=7a6b01ff&app_key=c9cab2012ffacc8a812f6746ac47a614
