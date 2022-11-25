import {LANGUAGE_FALLBACK, LANGUAGES} from "./const"


const KEYS = {
    LANGUAGE: "lang"
}


export function readLanguage(): string {
    const lang = window.localStorage.getItem(KEYS.LANGUAGE)
    return lang in LANGUAGES ?
        lang :
        LANGUAGE_FALLBACK
}

export function putLanguage(value: string) {
    window.localStorage.setItem(KEYS.LANGUAGE, value)
}