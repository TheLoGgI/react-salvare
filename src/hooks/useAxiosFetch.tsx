// import axios, { AxiosRequestConfig, Method } from "axios"
// import { useEffect, useState } from "react"

// import { useFetchType } from "../types/useFetch"
export {}
// export default function useAxiosFetch<T>(
//     url?: string,
//     options?: RequestInit
// ): useFetchType<T> {
//     const [data, setData] = useState<T | null>(null)
//     const [isFetching, setIsFetching] = useState(false)
//     const [isFetched, setIsFetched] = useState(false)
//     const [error, setError] = useState<string | null>(null)

//     const fetchData = (url: string, customOptions: RequestInit = {}) => {
//         setIsFetching(true)

//         const config: AxiosRequestConfig<RequestInit> = {
//             method: "GET",
//             mode: "cors",
//             cache: "no-cache",
//             url: url,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             ...customOptions,
//             // data: data,
//         }

//         axios(config)
//             .then(function (response) {
//                 console.log(JSON.stringify(response.data))
//                 setData(response)
//             })
//             .catch(function (error) {
//                 console.log(error)
//                 setError(error.statusText)
//             })
//             .finally(() => {
//                 setIsFetched(true)
//             })
//     }

//     useEffect(() => {
//         fetchData(url, options)
//     }, [options, url])

//     return {
//         data,
//         isFetching,
//         isFetched,
//         error,
//     }
// }
