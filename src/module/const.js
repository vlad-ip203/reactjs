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

    AUTH_LOGIN: 31,
    AUTH_LOGGING: 311,
    AUTH_REGISTER: 32,
    AUTH_REGISTRATION: 321,
    AUTH_NICK: 35,
    AUTH_NAME_HINT: 351,
    AUTH_EMAIL: 36,
    AUTH_EMAIL_HINT: 361,
    AUTH_EMAIL_TIP: 362,
    AUTH_PASSWORD: 37,
    AUTH_PASSWORD_HINT: 371,
    AUTH_PASSWORD_CONFIRM: 372,
    AUTH_PASSWORD_CONFIRM_HINT: 3721,
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

        {key: STRINGS.AUTH_LOGIN, value: "Login"},
        {key: STRINGS.AUTH_LOGGING, value: "Login"},
        {key: STRINGS.AUTH_REGISTER, value: "Register"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Registration"},
        {key: STRINGS.AUTH_NICK, value: "Nickname"},
        {key: STRINGS.AUTH_NAME_HINT, value: "How should we call you?"},
        {key: STRINGS.AUTH_EMAIL, value: "Email address"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Enter your email"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "We'll never share your email with anyone else"},
        {key: STRINGS.AUTH_PASSWORD, value: "Password"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Enter your password"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Password confirmation"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Enter your password again"},
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

        {key: STRINGS.AUTH_LOGIN, value: "Увійти"},
        {key: STRINGS.AUTH_LOGGING, value: "Вхід"},
        {key: STRINGS.AUTH_REGISTER, value: "Зареєструватися"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Реєстрація"},
        {key: STRINGS.AUTH_NICK, value: "Нікнейм"},
        {key: STRINGS.AUTH_NAME_HINT, value: "Як нам звертатися до Вас?"},
        {key: STRINGS.AUTH_EMAIL, value: "Електронна пошта"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Введіть Вашу електронну пошту"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "Ми ніколи не поділимося Вашою електронною адресою з кимось іншим"},
        {key: STRINGS.AUTH_PASSWORD, value: "Пароль"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Введіть Ваш пароль"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Підтвердження паролю"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Введіть Ваш пароль ще раз"},
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