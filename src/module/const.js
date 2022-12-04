import {Context} from "react"

import {Log} from "./log"
import {getLanguage} from "./context"


export const THEME_SYSTEM = "system"
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"
export const THEMES = [
    THEME_SYSTEM,
    THEME_LIGHT,
    THEME_DARK,
]


//Languages
const LANGUAGE_EN_US = "en-US"
const LANGUAGE_UK_UA = "uk-UA"
export const LANGUAGES = [
    LANGUAGE_EN_US,
    LANGUAGE_UK_UA,
]

//Language properties
const LANGUAGE_DEFAULT = "default"
export const LANGUAGE_FALLBACK = LANGUAGE_EN_US


//String keys
export const STRINGS = {
    APP_NAME: 11,

    NAV_BOOKMARKS: 21,
    NAV_HELP: 22,
    NAV_HELP_HELP: 221,
    NAV_HELP_ABOUT: 222,
    NAV_LANGUAGE: 23,
    NAV_THEME: 24,
}

//String translations and default values
const TRANSLATIONS = {
    "default": [
        {key: LANGUAGE_EN_US, value: "English"},
        {key: LANGUAGE_UK_UA, value: "Українська"},

        {key: STRINGS.APP_NAME, value: "cursenreact.js"},
    ],
    "en-US": [
        {key: THEME_SYSTEM, value: "System default"},
        {key: THEME_LIGHT, value: "Light"},
        {key: THEME_DARK, value: "Dark"},

        {key: STRINGS.NAV_BOOKMARKS, value: "Bookmarks"},
        {key: STRINGS.NAV_HELP, value: "Help"},
        {key: STRINGS.NAV_HELP_HELP, value: "Help"},
        {key: STRINGS.NAV_HELP_ABOUT, value: "About"},
        {key: STRINGS.NAV_LANGUAGE, value: "Language"},
        {key: STRINGS.NAV_THEME, value: "Theme"},
    ],
    "uk-UA": [
        {key: THEME_SYSTEM, value: "За вибором системи"},
        {key: THEME_LIGHT, value: "Світла"},
        {key: THEME_DARK, value: "Темна"},

        {key: STRINGS.NAV_BOOKMARKS, value: "Закладки"},
        {key: STRINGS.NAV_HELP, value: "Допомога"},
        {key: STRINGS.NAV_HELP_HELP, value: "Допомога"},
        {key: STRINGS.NAV_HELP_ABOUT, value: "Про нас"},
        {key: STRINGS.NAV_LANGUAGE, value: "Мова"},
        {key: STRINGS.NAV_THEME, value: "Тема"},
    ],
}


function getLanguageStack(state: Context) {
    const language = getLanguage(state)

    let stack = [
        LANGUAGE_DEFAULT, //Look for a default value
        language, //Look for a translation
    ]
    //Fallback language just in case
    if (language !== LANGUAGE_FALLBACK)
        stack.push(LANGUAGE_FALLBACK)

    return stack
}

export function getString(state: Context, key: string) {
    const langs = getLanguageStack(state)

    for (const l of langs)
        for (const s of TRANSLATIONS[l])
            if (s.key === key)
                return s.value

    //Translation doesn't exist
    Log.w("const::getString: string not found")
    Log.w("const::getString:   - lang stack = " + langs)
    Log.w("const::getString:   - key        = " + key)
}