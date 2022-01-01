export type OptionRequestType = Pick<
    Request,
    "method" | "mode" | "cache" | "headers"
>
export type useFetchType<DataType> = {
    data: DataType | null
    isFetching: boolean
    isFetched: boolean
    error: string | null
}
