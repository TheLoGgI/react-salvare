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
    next: () => void
}
