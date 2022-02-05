import axios, { AxiosRequestConfig, Method, Requ } from "axios"
import { useEffect, useState } from "react"

import { useFetchType } from "../types/useFetch"

export default function useAxiosFetch<T>(
    url: string,
    options?: RequestInit
): useFetchType<T> {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [isFetched, setIsFetched] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const axiosFetch = (url: string, customOptions = {}) => {
        setIsFetching(true)

        const config = customOptions
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

        axios(config)
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error)
                setError(error.statusText)
            })
            .finally(() => {
                setIsFetched(true)
            })
    }

    useEffect(() => {
        if (typeof url === "string" && url) {
            axiosFetch(url, options)
        } else if (Array.isArray(url)) {
        }
    }, [options, url])

    return {
        data,
        isFetching,
        isFetched,
        error,
    }
}
