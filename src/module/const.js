export class App {
    static ROOT = "/"
    static SEARCH = "/search"
    static HELP = "/help"
    static ABOUT = "/about"
    static AUTH = "/auth"
    static PROFILE = "/profile"
    static BOOKMARKS = "/bookmarks"
}

export const THEME_SYSTEM = "system"
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"
export const THEMES = [
    THEME_SYSTEM,
    THEME_LIGHT,
    THEME_DARK,
]

export const REGEX_NAME = /^\w{3,16}$/
export const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


export const MASONRY_BREAKPOINT_COLS = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    400: 1,
}