import {THEMES, THEME_SYSTEM} from "./const"
import {USER_GUEST} from "./db"
import {Log} from "./log"
import {LANGUAGE_FALLBACK, LANGUAGES} from "./lang"


const KEYS = {
    LANGUAGE: "lang",
    THEME: "theme",
    USER: "userID",
}

export const KEY_BOOKMARKS = "bookmarks"


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

export function readUser() {
    const raw = window.localStorage.getItem(KEYS.USER)
    if (!raw)
        return USER_GUEST

    try {
        const json = JSON.parse(raw)
        return {
            id: json.id,
            name: json.name,
        }
    } catch (e) {
        Log.e("storage::readUser: unable to parse user")
        Log.e("storage::readUser:   - raw = " + raw)
        Log.e("storage::readUser:   = catching: " + e)
        return USER_GUEST
    }
}

export function putUser(value) {
    window.localStorage.setItem(KEYS.USER, JSON.stringify(value))
}