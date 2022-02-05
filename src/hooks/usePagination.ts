import { useState } from "react"

export default function usePagination() {
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [next, setNext] = useState(null)
    const [pagination, setPagination] = useState(new Map())

    const updatePagination = (search: string, pageData: []): void => {
        const newPagination = new Map(pagination)
        const newPageData = newPagination.get(search) || []
        newPageData.push(...pageData)
        newPagination.set(search, newPageData)
        setPagination(newPagination)
    }

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        next,
        updatePagination,
    }
}
