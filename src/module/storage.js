import {LANGUAGES, LANGUAGE_FALLBACK, THEMES, THEME_SYSTEM} from "./const"


const KEYS = {
    LANGUAGE: "lang",
    THEME: "theme"
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

export function readTheme():string {
    const theme = window.localStorage.getItem(KEYS.THEME)
    return THEMES.some(value => value === theme) ?
        theme:
        THEME_SYSTEM
}

export function putTheme(value: string) {
    window.localStorage.setItem(KEYS.THEME, value)
}