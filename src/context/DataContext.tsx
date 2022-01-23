import React, { createContext, useContext, useEffect, useState } from "react"

import { useFood, useRecipies } from "../hooks/useRequests"
import { FoodDataHintsType, useFoodRequest } from "../types/ingredients"
import { RecipesData } from "../types/recipes"
import { ContextProviderProps } from "./ThemeContext"

type SetDataContext<T> = React.Dispatch<T>

export const FoodDataContext = createContext<FoodDataHintsType[]>([])
export const UpdateFoodDataContext = createContext<
    SetDataContext<FoodDataHintsType[]>
>(() => {})

export const RecipesDataContext = createContext<RecipesData>({} as RecipesData)
export const UpdateRecipesDataContext = createContext<
    SetDataContext<RecipesData>
>(() => {})

export default function DataContext({ children }: ContextProviderProps) {
    const [data, setData] = useState<FoodDataHintsType[]>([])
    const [recipes, setRecipesData] = useState<RecipesData>({} as RecipesData)

    return (
        <FoodDataContext.Provider value={data}>
            <UpdateFoodDataContext.Provider value={setData}>
                <RecipesDataContext.Provider value={recipes}>
                    <UpdateRecipesDataContext.Provider value={setRecipesData}>
                        {children}
                    </UpdateRecipesDataContext.Provider>
                </RecipesDataContext.Provider>
            </UpdateFoodDataContext.Provider>
        </FoodDataContext.Provider>
    )
}

export function useIngredientData(
    searchInput: string
): useFoodRequest<FoodDataHintsType[]> {
    const { data, ...rest } = useFood(searchInput)
    const setData = useContext(UpdateFoodDataContext)

    useEffect(() => {
        if (searchInput !== "") {
            setData(data)
        }
    }, [data, searchInput, setData])

    return { data, ...rest }
}

export function useRecipesData(
    searchInput: string
): useFoodRequest<RecipesData> {
    const { data, ...rest } = useRecipies(searchInput)
    console.log("data: ", data)
    const setData = useContext(UpdateRecipesDataContext)

    useEffect(() => {
        console.log("searchInput: ", searchInput)
        if (searchInput !== "") {
            setData(data)
        }
    }, [data, searchInput, setData])

    return { data, ...rest }
}

// export function useIngredientContext() {}
