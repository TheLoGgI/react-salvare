import React, { createContext, useContext, useEffect, useState } from "react"
import * as Realm from "realm-web"

import { ContextProviderProps } from "./ThemeContext"

export const CurrentUserContext = createContext<any>({})
export const UpdateCurrentUserContext = createContext<any>({})

// export const MongoAppContext = createContext<App>({})
// export const UpdateMongoAppContext = createContext<App>({})

export default function UserMongoContext({ children }: ContextProviderProps) {
    const [currentUser, setCurrentUser] = useState()
    // const [mongoApp, setMognoApp] = useState()

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <UpdateCurrentUserContext.Provider value={setCurrentUser}>
                {/* <MongoAppContext.Provider value={mongoApp}>
                    <UpdateMongoAppContext.Provider value={setMognoApp}> */}
                {children}
                {/* </UpdateMongoAppContext.Provider>
                </MongoAppContext.Provider> */}
            </UpdateCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}

export function useRealmApp() {
    return Realm.App.getApp("salvare-foodapp-iwodd")
}

export function useCurrentUser() {
    const app = new Realm.App({ id: "salvare-foodapp-iwodd" })
    return app.currentUser
}
