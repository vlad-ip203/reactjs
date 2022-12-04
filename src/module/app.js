export class Site {
    static ROOT = "/"
    static BOOKMARKS = "/bookmarks"
    static HELP = "/help"
    static ABOUT = "/about"
    static AUTH = "/auth"
}

export class Database {
    static USERS = "users"
    static USERS_NAME = "name"
    static USERS_EMAIL = "email"
    static USERS_PASSWORD_HASH = "passwordHash"
    static USERS_PASSWORD_SALT = "passwordSalt"
}

export const KEY_BOOKMARKS = "bookmarks"

export const MASONRY_BREAKPOINT_COLS = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    400: 1,
}