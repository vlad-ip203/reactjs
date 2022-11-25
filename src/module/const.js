import {Context} from "react"

import {Log} from "./log"
import {getLanguage} from "./context"


//Languages
const LANGUAGE_EN_US = "en-US"
const LANGUAGE_UK_UA = "uk-UA"
export const LANGUAGES = [
    LANGUAGE_EN_US,
    LANGUAGE_UK_UA
]

//Language properties
const LANGUAGE_DEFAULT = "default"
export const LANGUAGE_FALLBACK = LANGUAGE_EN_US


//String keys
export const STRINGS = {
}

//String translations and default values
const TRANSLATIONS = {
    "default": [
    ],
    "en-US": [
    ],
    "uk-UA": [
    ]
}


function getLanguageStack(state: Context) {
    const language = getLanguage(state)

    let stack = [
        LANGUAGE_DEFAULT, //Look for a default value
        language //Look for a translation
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