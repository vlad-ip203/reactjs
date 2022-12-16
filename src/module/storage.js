import {LANGUAGE_FALLBACK, LANGUAGES} from "./lang"
import {THEMES, THEME_SYSTEM} from "./theme"
import {User} from "./db/user"


const KEYS = {
    LANGUAGE: "lang",
    THEME: "theme",
    USER: "userID",
}


export function readLanguage(): string {
    const lang = window.localStorage.getItem(KEYS.LANGUAGE)
    return LANGUAGES.some(value => value === lang) ?
        lang :
        LANGUAGE_FALLBACK
}
export function putLanguage(value: string) {
    window.localStorage.setItem(KEYS.LANGUAGE, value)
}

export function readTheme(): string {
    const theme = window.localStorage.getItem(KEYS.THEME)
    return THEMES.some(value => value === theme) ?
        theme :
        THEME_SYSTEM
}
export function putTheme(value: string) {
    window.localStorage.setItem(KEYS.THEME, value)
}

export function readUser(): User {
    const id = window.localStorage.getItem(KEYS.USER)
    return new User(id)
}
export function putUser(value: User) {
    window.localStorage.setItem(KEYS.USER, value.userID)
}