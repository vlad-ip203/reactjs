export class App {
    static ROOT = "/"
    static SEARCH = "/search"
    static HELP = "/help"
    static ABOUT = "/about"
    static AUTH = "/auth"
    static PROFILE = "/profile"
    static BOOKMARKS = "/bookmarks"
}


export const MASONRY_BREAKPOINT_COLS = {
    default: 2,
    1000: 1,
}


export const REGEX_NAME = /^\w{3,16}$/
export const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/