import {Context} from "react"
import {format} from "react-string-format"

import {getLanguageStack} from "./context"
import {Log} from "./log"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "./theme"
import {DB} from "./db/db"


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
    APP_NAME: 101,

    GENERAL_NICK: 12,
    GENERAL_NICK_HINT: 121,
    GENERAL_NICK_TIP: 122,
    GENERAL_NICK_ERROR: 123,

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
    AUTH_EMAIL: 36,
    AUTH_EMAIL_HINT: 361,
    AUTH_EMAIL_TIP: 362,
    AUTH_PASSWORD: 37,
    AUTH_PASSWORD_HINT: 371,
    AUTH_PASSWORD_CONFIRM: 372,
    AUTH_PASSWORD_CONFIRM_HINT: 3721,
    AUTH_ERROR_DATA: 391,
    AUTH_ERROR_EMAIL: 393,

    PROFILE: 4,
    PROFILE_SAVE: 41,
    PROFILE_ROLE: 42,
    PROFILE_ROLE_HINT: 421,

    SEARCH: 5,
    SEARCH_HINT: 51,
    SEARCH_ERROR_EMAIL: 531,
    SEARCH_RESULTS_NOTHING: 551,
    SEARCH_RESULTS_COUNT: 552,

    LEAK_ID: 61,
    LEAK_EMAIL: 62,
    LEAK_LOGIN: 63,
    LEAK_NICKNAME: 65,
    LEAK_PASSWORD_HASH: 671,
    LEAK_TEL: 69,

    BOOKMARKS: 7,
    BOOKMARKS_RESULTS_NOTHING: 711,
    BOOKMARKS_HINT: 72,
}

//String translations and default values
const TRANSLATIONS = {
    "default": [
        {key: LANGUAGE_EN_US, value: "English"},
        {key: LANGUAGE_UK_UA, value: "Українська"},

        {key: STRINGS.APP_NAME, value: "cursenreact.js"},

        {key: STRINGS.LEAK_ID, value: "ID"},
    ],
    "en-US": [
        {key: THEME_SYSTEM, value: "System default"},
        {key: THEME_LIGHT, value: "Light"},
        {key: THEME_DARK, value: "Dark"},
        {key: DB.Roles.ADMIN, value: "Admin"},
        {key: DB.Roles.GUEST, value: "Guest"},
        {key: DB.Roles.MODERATOR, value: "Moderator"},
        {key: DB.Roles.USER, value: "User"},

        {key: STRINGS.GENERAL_NICK, value: "Nickname"},
        {key: STRINGS.GENERAL_NICK_HINT, value: "How should we call you?"},
        {
            key: STRINGS.GENERAL_NICK_TIP,
            value: "Nickname must have 3 to 16 characters and can contain letters, numbers, and underscores",
        },
        {key: STRINGS.GENERAL_NICK_ERROR, value: "This nickname is wrong or already taken"},

        {key: STRINGS.NAV_HELP, value: "Help"},
        {key: STRINGS.NAV_HELP_HELP, value: "Help"},
        {key: STRINGS.NAV_HELP_ABOUT, value: "About"},
        {key: STRINGS.NAV_LANGUAGE, value: "Language"},
        {key: STRINGS.NAV_THEME, value: "Theme"},
        {key: STRINGS.NAV_ACCOUNT, value: "Account"},

        {key: STRINGS.AUTH_LOGIN, value: "Login"},
        {key: STRINGS.AUTH_LOGGING, value: "Login"},
        {key: STRINGS.AUTH_REGISTER, value: "Register"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Registration"},
        {key: STRINGS.AUTH_LOGOUT, value: "Logout"},
        {key: STRINGS.AUTH_EMAIL, value: "Email address"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Enter your email"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "We'll never share your email with anyone else"},
        {key: STRINGS.AUTH_PASSWORD, value: "Password"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Enter your password"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Password confirmation"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Enter your password again"},
        {key: STRINGS.AUTH_ERROR_DATA, value: "Wrong email and/or password"},
        {key: STRINGS.AUTH_ERROR_EMAIL, value: "This email is wrong or already registered"},

        {key: STRINGS.PROFILE, value: "Profile"},
        {key: STRINGS.PROFILE_SAVE, value: "Save"},
        {key: STRINGS.PROFILE_ROLE, value: "Role"},
        {key: STRINGS.PROFILE_ROLE_HINT, value: "This is your permission level"},

        {key: STRINGS.SEARCH, value: "Search"},
        {key: STRINGS.SEARCH_HINT, value: "Enter email to search for"},
        {key: STRINGS.SEARCH_ERROR_EMAIL, value: "Check syntax of the email you've entered"},
        {key: STRINGS.SEARCH_RESULTS_NOTHING, value: "Seems like we don't have anything for email {0} yet"},
        {key: STRINGS.SEARCH_RESULTS_COUNT, value: "Found {0} results for email address {1}"},

        {key: STRINGS.LEAK_EMAIL, value: "Email"},
        {key: STRINGS.LEAK_LOGIN, value: "Login"},
        {key: STRINGS.LEAK_NICKNAME, value: "Nickname"},
        {key: STRINGS.LEAK_PASSWORD_HASH, value: "Password hash"},
        {key: STRINGS.LEAK_TEL, value: "Telephone"},

        {key: STRINGS.BOOKMARKS, value: "Bookmarks"},
        {key: STRINGS.BOOKMARKS_RESULTS_NOTHING, value: "No bookmarks yet"},
        {key: STRINGS.BOOKMARKS_HINT, value: "Wanna add some?"},
    ],
    "uk-UA": [
        {key: THEME_SYSTEM, value: "За вибором системи"},
        {key: THEME_LIGHT, value: "Світла"},
        {key: THEME_DARK, value: "Темна"},
        {key: DB.Roles.ADMIN, value: "Адміністратор"},
        {key: DB.Roles.GUEST, value: "Гость"},
        {key: DB.Roles.MODERATOR, value: "Модератор"},
        {key: DB.Roles.USER, value: "Користувач"},

        {key: STRINGS.GENERAL_NICK, value: "Нікнейм"},
        {key: STRINGS.GENERAL_NICK_HINT, value: "Як нам звертатися до Вас?"},
        {
            key: STRINGS.GENERAL_NICK_TIP,
            value: "Нікнейм повинен мати від 3 до 16 символів та може містити букви, цифри й підкреслення",
        },
        {key: STRINGS.GENERAL_NICK_ERROR, value: "Нікнейм неправильний або вже зайнятий"},

        {key: STRINGS.NAV_HELP, value: "Допомога"},
        {key: STRINGS.NAV_HELP_HELP, value: "Допомога"},
        {key: STRINGS.NAV_HELP_ABOUT, value: "Про нас"},
        {key: STRINGS.NAV_LANGUAGE, value: "Мова"},
        {key: STRINGS.NAV_THEME, value: "Тема"},
        {key: STRINGS.NAV_ACCOUNT, value: "Акаунт"},

        {key: STRINGS.AUTH_LOGIN, value: "Увійти"},
        {key: STRINGS.AUTH_LOGGING, value: "Вхід"},
        {key: STRINGS.AUTH_REGISTER, value: "Зареєструватися"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Реєстрація"},
        {key: STRINGS.AUTH_LOGOUT, value: "Вийти"},
        {key: STRINGS.AUTH_EMAIL, value: "Електронна пошта"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Введіть Вашу електронну пошту"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "Ми ніколи не поділимося Вашою електронною адресою з кимось іншим"},
        {key: STRINGS.AUTH_PASSWORD, value: "Пароль"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Введіть Ваш пароль"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Підтвердження паролю"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Введіть Ваш пароль ще раз"},
        {key: STRINGS.AUTH_ERROR_DATA, value: "Неправильні електронна пошта та/або пароль"},
        {key: STRINGS.AUTH_ERROR_EMAIL, value: "Пошта неправильна або вже зареєстрована"},

        {key: STRINGS.PROFILE, value: "Профіль"},
        {key: STRINGS.PROFILE_SAVE, value: "Зберегти"},
        {key: STRINGS.PROFILE_ROLE, value: "Роль"},
        {key: STRINGS.PROFILE_ROLE_HINT, value: "Це Ваш рівень доступу"},

        {key: STRINGS.SEARCH, value: "Пошук"},
        {key: STRINGS.SEARCH_HINT, value: "Введіть електронну пошту, яку бажаєте знайти"},
        {key: STRINGS.SEARCH_ERROR_EMAIL, value: "Перевірте правильність електронної пошти, яку Ви ввели"},
        {key: STRINGS.SEARCH_RESULTS_NOTHING, value: "Схоже, що в нас поки немає ніяких даних за адресою {0}"},
        {key: STRINGS.SEARCH_RESULTS_COUNT, value: "Знайдено {0} результатів за адресою {1}"},

        {key: STRINGS.LEAK_EMAIL, value: "Пошта"},
        {key: STRINGS.LEAK_LOGIN, value: "Логін"},
        {key: STRINGS.LEAK_NICKNAME, value: "Нікнейм"},
        {key: STRINGS.LEAK_PASSWORD_HASH, value: "Хеш паролю"},
        {key: STRINGS.LEAK_TEL, value: "Телефон"},

        {key: STRINGS.BOOKMARKS, value: "Закладки"},
        {key: STRINGS.BOOKMARKS_RESULTS_NOTHING, value: "Ще немає закладок"},
        {key: STRINGS.BOOKMARKS_HINT, value: "Може додати?"},
    ],
}


export function createLanguageStack(language: string): [] {
    const stack = [
        LANGUAGE_DEFAULT, //Look for a default value
        language, //Look for a translation
    ]

    //Fallback language just in case
    if (language !== LANGUAGE_FALLBACK)
        stack.push(LANGUAGE_FALLBACK)

    return stack
}

export function getString(state: Context, key: string, ...args) {
    const langs = getLanguageStack(state)

    for (const l of langs)
        for (const s of TRANSLATIONS[l])
            if (s.key === key)
                return args ?
                    format(s.value, ...args) : //Format strings with args
                    s.value //Return bare string

    //Translation doesn't exist
    Log.w("lang::getString: string not found")
    Log.w("lang::getString:   - lang stack = " + langs)
    Log.w("lang::getString:   - key        = " + key)
}