export type UnionActionType = "ingredients" | "recipies"

export type SearchStateType = {
    searchInput: string
    selectedButton: UnionActionType
}

export type SearchInputProps = {
    setSearchSettings: React.Dispatch<React.SetStateAction<SearchStateType>>
    searchSettings?: {
        searchInput: string
        selectedButton: UnionActionType
    }
}
