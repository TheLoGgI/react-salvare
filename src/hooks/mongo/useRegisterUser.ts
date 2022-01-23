import * as Realm from "realm-web"

export default function useRegisterUser(email: string, password: string) {
    return Realm.Credentials.emailPassword(email, password)
}

export {}
