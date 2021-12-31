export type OptionRequestType = Pick<
    Request,
    "method" | "mode" | "cache" | "headers"
>
export type useFetchType<DataType> = {
    data: DataType | undefined
    isFetching: boolean
    isFetched: boolean
    error: string | null
}
