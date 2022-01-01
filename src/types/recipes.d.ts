import { Url } from "url"

type Nutrients = {
    label: string
    tag: string
    schemaOrgTag: string
    total: number
    hasRDI: boolean
    daily: number
    unit: string
    sub?: Nutrients[]
}

type RecipesDataHints = {
    recipe: {
        uri: Url
        label: string
        image: Url
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
            LARGE: {
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
        ingredientLines: string[]
        ingredients: Array<{
            text: string
            quantity: number
            food: string
            weight: number
            foodCategory: string
            foodId: string
            image: Url
        }>
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

type RecipesData = {
    from: number
    to: number
    count: number
    _links: {
        next: {
            href: Url
            title: "Next page" | string
        }
    }
    hits: RecipesDataHints[]
}
