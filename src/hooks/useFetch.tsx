import { useEffect, useState } from "react"

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

export default function useFetch<T>(
    url: string,
    options?: RequestInit
): useFetchType<T> {
    const [data, setData] = useState<T | undefined>(undefined)
    const [isFetching, setIsFetching] = useState(false)
    const [isFetched, setIsFetched] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = (url: string, customOptions?: RequestInit) => {
        setIsFetching(true)
        const options: RequestInit = customOptions
            ? customOptions
            : {
                  method: "GET",
                  mode: "cors",
                  cache: "no-cache",
                  headers: new Headers({
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      "Access-Control-Allow-Headers": "Content-Type",
                  }),
              }

        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    setIsFetching(false)
                    return response.json()
                } else {
                    setError(response.statusText)
                    // throw Error('Something went wrong with the fetch')
                }
            })
            .then((data) => {
                setData(data)
            })
            .finally(() => {
                setIsFetched(true)
            })
    }

    useEffect(() => {
        fetchData(url, options)
    }, [options, url])

    return {
        data,
        isFetching,
        isFetched,
        error,
    }
}