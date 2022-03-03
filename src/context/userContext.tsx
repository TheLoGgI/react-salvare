import React, { createContext, useEffect, useState } from "react"
import { App } from "realm-web"

import { ContextProviderProps } from "./ThemeContext"

type UserGoal = {
    title: string
    description: string
}

type CurrentUser = {
    id: string
    uid: string
    username: string
    email: string
    bodyWeight: number
    goals: UserGoal[]
    favoriteRecipes: string[]
    functions: () => void
}

export const CurrentUserContext = createContext<any>({})
export const UpdateCurrentUserContext = createContext<any>({})

export default function UserMongoContext({ children }: ContextProviderProps) {
    const [currentUser, setCurrentUser] = useState()

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <UpdateCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </UpdateCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}

export function useRealmApp() {
    return App.getApp("salvare-foodapp-iwodd")
}

export function useCurrentUser(): CurrentUser {
    const [state, setState] = useState<CurrentUser>({
        id: "",
        uid: "",
        username: "",
        email: "",
        bodyWeight: 85,
        favoriteRecipes: [],
        goals: [],
        functions: () => {},
    })
    const app = new App({ id: "salvare-foodapp-iwodd" })

    const getCurrentUserData = async () => {
        const userData = await app.currentUser?.functions.getCurrentUser()
        if (userData) {
            setState({ ...app.currentUser, ...userData[0], goals: [] })
        }
    }
    useEffect(() => {
        getCurrentUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return state
}
