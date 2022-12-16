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
    APP_NAME: 100.1,

    NAV_LANGUAGE: 101.2,
    NAV_THEME: 101.3,
    NAV_ACCOUNT: 101.4,

    LEAK_ID: 102.1,
    LEAK_EMAIL: 102.2,
    LEAK_LOGIN: 102.3,
    LEAK_NICKNAME: 102.4,
    LEAK_PASSWORD_HASH: 102.51,
    LEAK_TEL: 102.6,

    NICK: 103,
    NICK_HINT: 103.1,
    NICK_TIP: 103.2,
    NICK_ERROR: 103.3,


    HOME_INTRO1: 200.1,
    HOME_INTRO2: 200.2,

    AUTH_LOGIN: 201.11,
    AUTH_LOGGING: 201.12,
    AUTH_REGISTER: 201.13,
    AUTH_REGISTRATION: 201.14,
    AUTH_LOGOUT: 201.15,
    AUTH_EMAIL: 201.2,
    AUTH_EMAIL_HINT: 201.21,
    AUTH_EMAIL_TIP: 201.22,
    AUTH_EMAIL_ERROR: 201.23,
    AUTH_PASSWORD: 201.3,
    AUTH_PASSWORD_HINT: 201.31,
    AUTH_PASSWORD_CONFIRM: 201.32,
    AUTH_PASSWORD_CONFIRM_HINT: 201.321,
    AUTH_DATA_ERROR: 201.41,

    PROFILE: 202,
    PROFILE_SAVE: 202.1,
    PROFILE_ROLE: 202.2,
    PROFILE_ROLE_HINT: 202.21,

    SEARCH: 203,
    SEARCH_INTRO: 203.1,
    SEARCH_EMAIL_HINT: 203.21,
    SEARCH_EMAIL_ERROR: 203.22,
    SEARCH_RESULTS_NOTHING: 203.31,
    SEARCH_RESULTS_COUNT: 203.32,

    BOOKMARKS: 204,
    BOOKMARKS_HINT: 204.1,
    BOOKMARKS_RESULTS_NOTHING: 204.21,

    CONSOLE: 205,
    CONSOLE_INTRO: 205.1,
    CONSOLE_DATA: 205.2,
    CONSOLE_PUSH: 205.3,

    ABOUT: 206,
    ABOUT_INTRO: 206.1,
}

//String translations and default values
const TRANSLATIONS = {
    "default": [
        {key: LANGUAGE_EN_US, value: "English"},
        {key: LANGUAGE_UK_UA, value: "Українська"},

        {key: STRINGS.APP_NAME, value: "cLeakLook"},

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

        {key: STRINGS.NAV_LANGUAGE, value: "Language"},
        {key: STRINGS.NAV_THEME, value: "Theme"},
        {key: STRINGS.NAV_ACCOUNT, value: "Account"},

        {key: STRINGS.LEAK_EMAIL, value: "Email"},
        {key: STRINGS.LEAK_LOGIN, value: "Login"},
        {key: STRINGS.LEAK_NICKNAME, value: "Nickname"},
        {key: STRINGS.LEAK_PASSWORD_HASH, value: "Password hash"},
        {key: STRINGS.LEAK_TEL, value: "Telephone"},

        {key: STRINGS.NICK, value: "Nickname"},
        {key: STRINGS.NICK_HINT, value: "How should we call you?"},
        {
            key: STRINGS.NICK_TIP,
            value: "Nickname must have 3 to 16 characters and can contain letters, numbers, and underscores",
        },
        {key: STRINGS.NICK_ERROR, value: "This nickname is wrong or already taken"},


        {key: STRINGS.HOME_INTRO1, value: "Let's find out"},
        {key: STRINGS.HOME_INTRO2, value: "What the Internet knows about you"},

        {key: STRINGS.AUTH_LOGIN, value: "Login"},
        {key: STRINGS.AUTH_LOGGING, value: "Login"},
        {key: STRINGS.AUTH_REGISTER, value: "Register"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Registration"},
        {key: STRINGS.AUTH_LOGOUT, value: "Logout"},
        {key: STRINGS.AUTH_EMAIL, value: "Email address"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Enter your email"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "We'll never share your email with anyone else"},
        {key: STRINGS.AUTH_EMAIL_ERROR, value: "This email is wrong or already registered"},
        {key: STRINGS.AUTH_PASSWORD, value: "Password"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Enter your password"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Password confirmation"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Enter your password again"},
        {key: STRINGS.AUTH_DATA_ERROR, value: "Wrong email and/or password"},

        {key: STRINGS.PROFILE, value: "Profile"},
        {key: STRINGS.PROFILE_SAVE, value: "Save"},
        {key: STRINGS.PROFILE_ROLE, value: "Role"},
        {key: STRINGS.PROFILE_ROLE_HINT, value: "This is your permission level"},

        {key: STRINGS.SEARCH, value: "Search"},
        {
            key: STRINGS.SEARCH_INTRO,
            value: "Enter an email address you want to find and we'll show you everything we have on this email",
        },
        {key: STRINGS.SEARCH_EMAIL_HINT, value: "Enter email to search for"},
        {key: STRINGS.SEARCH_EMAIL_ERROR, value: "Check syntax of the email you've entered"},
        {key: STRINGS.SEARCH_RESULTS_NOTHING, value: "Seems like we don't have anything for email {0} yet"},
        {key: STRINGS.SEARCH_RESULTS_COUNT, value: "Found {0} results for email address {1}"},

        {key: STRINGS.BOOKMARKS, value: "Bookmarks"},
        {key: STRINGS.BOOKMARKS_RESULTS_NOTHING, value: "No bookmarks yet"},
        {key: STRINGS.BOOKMARKS_HINT, value: "Wanna add some?"},

        {key: STRINGS.CONSOLE, value: "Console"},
        {key: STRINGS.CONSOLE_INTRO, value: "Put formatted JSON data here to push to the database"},
        {key: STRINGS.CONSOLE_DATA, value: "Data to push"},
        {key: STRINGS.CONSOLE_PUSH, value: "Push"},

        {key: STRINGS.ABOUT, value: "About"},
        {
            key: STRINGS.ABOUT_INTRO,
            value: "This project aims to help collect open data from leaked databases",
        },
    ],

    "uk-UA": [
        {key: THEME_SYSTEM, value: "За вибором системи"},
        {key: THEME_LIGHT, value: "Світла"},
        {key: THEME_DARK, value: "Темна"},
        {key: DB.Roles.ADMIN, value: "Адміністратор"},
        {key: DB.Roles.GUEST, value: "Гость"},
        {key: DB.Roles.MODERATOR, value: "Модератор"},
        {key: DB.Roles.USER, value: "Користувач"},

        {key: STRINGS.NAV_LANGUAGE, value: "Мова"},
        {key: STRINGS.NAV_THEME, value: "Тема"},
        {key: STRINGS.NAV_ACCOUNT, value: "Акаунт"},

        {key: STRINGS.LEAK_EMAIL, value: "Пошта"},
        {key: STRINGS.LEAK_LOGIN, value: "Логін"},
        {key: STRINGS.LEAK_NICKNAME, value: "Нікнейм"},
        {key: STRINGS.LEAK_PASSWORD_HASH, value: "Хеш паролю"},
        {key: STRINGS.LEAK_TEL, value: "Телефон"},

        {key: STRINGS.NICK, value: "Нікнейм"},
        {key: STRINGS.NICK_HINT, value: "Як нам звертатися до Вас?"},
        {
            key: STRINGS.NICK_TIP,
            value: "Нікнейм повинен мати від 3 до 16 символів та може містити букви, цифри й підкреслення",
        },
        {key: STRINGS.NICK_ERROR, value: "Нікнейм неправильний або вже зайнятий"},


        {key: STRINGS.HOME_INTRO1, value: "Давайте дізнаємося,"},
        {key: STRINGS.HOME_INTRO2, value: "Що Інтернет знає про Вас"},

        {key: STRINGS.AUTH_LOGIN, value: "Увійти"},
        {key: STRINGS.AUTH_LOGGING, value: "Вхід"},
        {key: STRINGS.AUTH_REGISTER, value: "Зареєструватися"},
        {key: STRINGS.AUTH_REGISTRATION, value: "Реєстрація"},
        {key: STRINGS.AUTH_LOGOUT, value: "Вийти"},
        {key: STRINGS.AUTH_EMAIL, value: "Електронна пошта"},
        {key: STRINGS.AUTH_EMAIL_HINT, value: "Введіть Вашу електронну пошту"},
        {key: STRINGS.AUTH_EMAIL_TIP, value: "Ми ніколи не поділимося Вашою електронною адресою з кимось іншим"},
        {key: STRINGS.AUTH_EMAIL_ERROR, value: "Пошта неправильна або вже зареєстрована"},
        {key: STRINGS.AUTH_PASSWORD, value: "Пароль"},
        {key: STRINGS.AUTH_PASSWORD_HINT, value: "Введіть Ваш пароль"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM, value: "Підтвердження паролю"},
        {key: STRINGS.AUTH_PASSWORD_CONFIRM_HINT, value: "Введіть Ваш пароль ще раз"},
        {key: STRINGS.AUTH_DATA_ERROR, value: "Неправильні електронна пошта та/або пароль"},

        {key: STRINGS.PROFILE, value: "Профіль"},
        {key: STRINGS.PROFILE_SAVE, value: "Зберегти"},
        {key: STRINGS.PROFILE_ROLE, value: "Роль"},
        {key: STRINGS.PROFILE_ROLE_HINT, value: "Це Ваш рівень доступу"},

        {key: STRINGS.SEARCH, value: "Пошук"},
        {
            key: STRINGS.SEARCH_INTRO,
            value: "Введіть адресу електронної пошти, яку хочете знайти, і ми покажемо все, що в нас є",
        },
        {key: STRINGS.SEARCH_EMAIL_HINT, value: "Введіть електронну пошту, яку бажаєте знайти"},
        {key: STRINGS.SEARCH_EMAIL_ERROR, value: "Перевірте правильність електронної пошти, яку Ви ввели"},
        {key: STRINGS.SEARCH_RESULTS_NOTHING, value: "Схоже, що в нас поки немає ніяких даних за адресою {0}"},
        {key: STRINGS.SEARCH_RESULTS_COUNT, value: "Знайдено {0} результатів за адресою {1}"},

        {key: STRINGS.BOOKMARKS, value: "Закладки"},
        {key: STRINGS.BOOKMARKS_RESULTS_NOTHING, value: "Ще немає закладок"},
        {key: STRINGS.BOOKMARKS_HINT, value: "Може додати?"},

        {key: STRINGS.CONSOLE, value: "Консоль"},
        {key: STRINGS.CONSOLE_INTRO, value: "Введіть дані у форматі JSON, щоб імпортувати в базу даних"},
        {key: STRINGS.CONSOLE_DATA, value: "Дані для відправки"},
        {key: STRINGS.CONSOLE_PUSH, value: "Відправити"},

        {key: STRINGS.ABOUT, value: "Про проект"},
        {
            key: STRINGS.ABOUT_INTRO,
            value: "Ціль проекту - допомогти зібрати дані, що опинилися у відкритому доступі внаслідок витікання баз даних",
        },
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