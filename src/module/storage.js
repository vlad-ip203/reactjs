import {LANGUAGE_FALLBACK, LANGUAGES} from "./const"


const KEYS = {
    LANGUAGE: "lang"
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