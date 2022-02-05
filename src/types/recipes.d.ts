import { Url } from "url"

export type RecipeImagesObjectType = {
    url: Url
    width: number
    height: number
}

export type RecipesImages = {
    THUMBNAIL: RecipeImagesObjectType
    SMALL: RecipeImagesObjectType
    REGULAR: RecipeImagesObjectType
    LARGE?: RecipeImagesObjectType
}

export type Nutrients = {
    label: string
    tag: string
    schemaOrgTag: string
    total: number
    hasRDI: boolean
    daily: number
    unit: string
    sub?: Nutrients[]
}

export type RecipiesIngredients = {
    text: string
    quantity: number
    food: string
    weight: number
    measure: string | number
    foodCategory: string
    foodId: string
    image: Url
}

export type RecipesDataHints = {
    recipe: {
        id?: string
        uri: string
        label: string
        image: Url
        totalTime: number
        images: {
            THUMBNAIL: {
                url: Url
                width: number
                height: number
            }
            SMALL: {
                url: Url
                width: number
                height: number
            }
            REGULAR: {
                url: Url
                width: number
                height: number
            }
            LARGE?: {
                url: Url
                width: number
                height: number
            }
        }
        source: string
        url: Url
        yield: number
        dietLabels: []
        healthLabels: string[]
        totalNutrients: {
            [Nutrient: string]: {
                label: string
                quantity: number
                unit: string
            }
        }
        ingredientLines: string[]
        ingredients: RecipiesIngredients[]
        calories: number
        digest: Nutrients
    }
    _links: {
        self: {
            href: Url
            title: "Self" | string
        }
    }
}

export type RecipesData = {
    from: number
    to: number
    count: number
    _links: {
        next: {
            href: string
            title: "Next page" | string
        }
    }
    hits: RecipesDataHints[]
}
