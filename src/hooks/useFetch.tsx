import { useEffect, useState } from "react"

import { useFetchType } from "../types/useFetch"

export default function useFetch<T>(
    url: string,
    options?: RequestInit
): useFetchType<T> {
    const [data, setData] = useState<T | null>(null)
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
                setIsFetching(false)
                if (response.ok) {
                    return response.json()
                } else {
                    // setError(response.statusText)
                    throw Error("Something went wrong with the fetch")
                }
            })
            .then((data) => {
                setData(data)
            })
            .catch((error) => {
                setError(error.statusText)
            })
            .finally(() => {
                setIsFetched(true)
            })
    }

    useEffect(() => {
        if (url) {
            fetchData(url, options)
        }
    }, [options, url])

    return {
        data,
        isFetching,
        isFetched,
        error,
    }
}
