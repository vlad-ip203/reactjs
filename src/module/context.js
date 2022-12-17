// noinspection JSUnresolvedVariable

import React, {Context} from "react"

import {readLanguage, putLanguage, readTheme, putTheme, readUser, putUser} from "./storage"
import {Log} from "./log"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "./theme"
import {createLanguageStack} from "./lang"
import {User, getUserByCredentials, addUser, USER_GUEST} from "./db/user"


const defaultGlobalState = {
    language: readLanguage(),
    language_stack: createLanguageStack(readLanguage()),
    theme: readTheme(),
    user: readUser(),
}

const GlobalStateContext = React.createContext(defaultGlobalState)
const DispatchStateContext = React.createContext(undefined)

export const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({...state, ...newValue}),
        defaultGlobalState,
    )

    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    )
}


export const useGlobalState = () => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext),
]

const notifyContextChanged = (dispatch: Context) => dispatch({})

export const reload = () => void window.location.reload()


export const getLanguageStack = (state: Context): [] => state.language_stack
export function setLanguage(dispatch: Context, value: string) {
    putLanguage(value)
    dispatch({
        language: value,
        language_stack: createLanguageStack(value),
    })
}


export const getTheme = (state: Context): string => state.theme
export function setTheme(dispatch: Context, value: string) {
    putTheme(value)
    dispatch({theme: value})
}

export function getAppTheme(state: Context): string {
    switch (getTheme(state)) {
        default:
        case THEME_SYSTEM:
            return readSystemTheme()
        case THEME_LIGHT:
            return THEME_LIGHT
        case THEME_DARK:
            return THEME_DARK
    }
}

const themeListenerSupported = (): boolean =>
    window.matchMedia("(prefers-color-scheme: dark)").media !== "not all"

function readSystemTheme(): string {
    if (!themeListenerSupported())
        return THEME_LIGHT

    return window.matchMedia("(prefers-color-scheme: dark)").matches ?
        THEME_DARK : //System theme is dark
        THEME_LIGHT  //System theme is light
}

export function listenSystemThemeChanges(state: Context, dispatch: Context) {
    if (!themeListenerSupported())
        return

    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", event => {
            const theme = event.matches ?
                THEME_DARK :
                THEME_LIGHT

            if (getTheme(state) === THEME_SYSTEM) {
                Log.v("context::listenSystemThemeChanges: EventListener-> theme change approved = " + theme)
                notifyContextChanged(dispatch)
            } else
                Log.v("context::listenSystemThemeChanges: EventListener-> theme change denied = " + theme)
        })
}


export const getUser = (state: Context): User => state.user
export function setUser(dispatch: Context, user: User) {
    putUser(user)
    dispatch({user: user})
}

export async function register(dispatch: Context, name: string, email: string, pass: string) {
    const user = await addUser(name, email, pass)

    if (user) {
        await setUser(dispatch, user)
        return true
    }
    return false
}

export async function login(dispatch: Context, email: string, password: string) {
    const user = await getUserByCredentials(email, password)

    if (user) {
        await setUser(dispatch, user)
        return true
    }
    return false
}

export function logout(dispatch: Context) {
    setUser(dispatch, USER_GUEST)
}