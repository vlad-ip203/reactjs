import {Context} from "react"
import {getLanguage} from "./context"
import {Log} from "./log"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "./theme"


//Available languages
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
    NAV_ACCOUNT: 25,

    AUTH_LOGIN: 31,
    AUTH_LOGGING: 311,
    AUTH_REGISTER: 32,
    AUTH_REGISTRATION: 321,
    AUTH_LOGOUT: 33,
    AUTH_NICK: 35,
    AUTH_NAME_HINT: 351,
    AUTH_NAME_TIP: 352,
    AUTH_EMAIL: 36,
    AUTH_EMAIL_HINT: 361,
    AUTH_EMAIL_TIP: 362,
    AUTH_PASSWORD: 37,
    AUTH_PASSWORD_HINT: 371,
    AUTH_PASSWORD_CONFIRM: 372,
    AUTH_PASSWORD_CONFIRM_HINT: 3721,
    AUTH_ERROR_DATA: 391,
    AUTH_ERROR_NAME: 392,
    AUTH_ERROR_EMAIL: 393,

    PROFILE: 4,

    SEARCH: 5,
    SEARCH_HINT: 51,
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

        {key: STRINGS.NAV_HELP, value: "Help"},
        {key: STRINGS.NAV_HELP_HELP, value: "Help"},
        {key: STRINGS.NAV_HELP_ABOUT, value: "About"},
        {key: STRINGS.NAV_LANGUAGE, value: "Language"},
        {key: STRINGS.NAV_THEME, value: "Theme"},
        {key: STRINGS.NAV_ACCOUNT, value: "Account"},
        {key: STRINGS.NAV_BOOKMARKS, value: "Bookmarks"},

        {key: STRINGS.AUTH_LOGIN, value: "Login"},
        {key: STRINGS.AUTH_LOGGING, value: "Login"},
        {key: STRINGS.AUTH_REGISTER, value: "Register"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Registration"},
        {key: STRINGS.AUTH_LOGOUT, value: "Logout"},
        {key: STRINGS.AUTH_NICK, value: "Nickname"},
        {key: STRINGS.AUTH_NAME_HINT, value: "How should we call you?"},
        {
            key: STRINGS.AUTH_NAME_TIP,
            value: "Nickname must have 3 to 16 characters and can contain letters, numbers, and underscores",
        },
        {key: STRINGS.AUTH_EMAIL, value: "Email address"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Enter your email"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "We'll never share your email with anyone else"},
        {key: STRINGS.AUTH_PASSWORD, value: "Password"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Enter your password"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Password confirmation"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Enter your password again"},
        {key: STRINGS.AUTH_ERROR_DATA, value: "Wrong email and/or password"},
        {key: STRINGS.AUTH_ERROR_NAME, value: "This nickname is wrong or already taken"},
        {key: STRINGS.AUTH_ERROR_EMAIL, value: "This email is wrong or already registered"},

        {key: STRINGS.PROFILE, value: "Profile"},

        {key: STRINGS.SEARCH, value: "Search"},
        {key: STRINGS.SEARCH_HINT, value: "Enter email to search for"},
    ],
    "uk-UA": [
        {key: THEME_SYSTEM, value: "За вибором системи"},
        {key: THEME_LIGHT, value: "Світла"},
        {key: THEME_DARK, value: "Темна"},

        {key: STRINGS.NAV_HELP, value: "Допомога"},
        {key: STRINGS.NAV_HELP_HELP, value: "Допомога"},
        {key: STRINGS.NAV_HELP_ABOUT, value: "Про нас"},
        {key: STRINGS.NAV_LANGUAGE, value: "Мова"},
        {key: STRINGS.NAV_THEME, value: "Тема"},
        {key: STRINGS.NAV_ACCOUNT, value: "Акаунт"},
        {key: STRINGS.NAV_BOOKMARKS, value: "Закладки"},

        {key: STRINGS.AUTH_LOGIN, value: "Увійти"},
        {key: STRINGS.AUTH_LOGGING, value: "Вхід"},
        {key: STRINGS.AUTH_REGISTER, value: "Зареєструватися"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Реєстрація"},
        {key: STRINGS.AUTH_LOGOUT, value: "Вийти"},
        {key: STRINGS.AUTH_NICK, value: "Нікнейм"},
        {key: STRINGS.AUTH_NAME_HINT, value: "Як нам звертатися до Вас?"},
        {
            key: STRINGS.AUTH_NAME_TIP,
            value: "Нікнейм повинен мати від 3 до 16 символів та може містити букви, цифри й підкреслення",
        },
        {key: STRINGS.AUTH_EMAIL, value: "Електронна пошта"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Введіть Вашу електронну пошту"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "Ми ніколи не поділимося Вашою електронною адресою з кимось іншим"},
        {key: STRINGS.AUTH_PASSWORD, value: "Пароль"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Введіть Ваш пароль"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Підтвердження паролю"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Введіть Ваш пароль ще раз"},
        {key: STRINGS.AUTH_ERROR_DATA, value: "Неправильні електронна пошта та/або пароль"},
        {key: STRINGS.AUTH_ERROR_NAME, value: "Нікнейм неправильний або вже зайнятий"},
        {key: STRINGS.AUTH_ERROR_EMAIL, value: "Пошта неправильна або вже зареєстрована"},

        {key: STRINGS.PROFILE, value: "Профіль"},

        {key: STRINGS.SEARCH, value: "Пошук"},
        {key: STRINGS.SEARCH_HINT, value: "Введіть електронну пошту, яку бажаєте знайти"},
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