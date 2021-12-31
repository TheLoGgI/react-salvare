import React, { createContext, useContext, useEffect, useState } from "react"

import { useFoodRequest } from "../hooks/useRequests"
import { FoodDataHintsType, useFood } from "../hooks/useRequests"
import { ContextProviderProps } from "./ThemeContext"

type SetDataContext<T> = React.Dispatch<T>

export const MaterialContext = createContext<FoodDataHintsType[]>([])
export const DataUpdateContext = createContext<
    SetDataContext<FoodDataHintsType[]>
>(() => {})

export default function DataContext({ children }: ContextProviderProps) {
    const [data, setData] = useState<FoodDataHintsType[]>([])

    return (
        <MaterialContext.Provider value={data}>
            <DataUpdateContext.Provider value={setData}>
                {children}
            </DataUpdateContext.Provider>
        </MaterialContext.Provider>
    )
}

export function useIngredientData(
    searchInput: string
): useFoodRequest<FoodDataHintsType[]> {
    const { data, ...rest } = useFood(searchInput)
    const setData = useContext(DataUpdateContext)

    useEffect(() => {
        setData(data)
    }, [data, searchInput, setData])

    return { data, ...rest }
}

// export function useIngredientContext() {}
