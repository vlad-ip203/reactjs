// noinspection JSUnresolvedVariable

import React, {Context} from "react"

import {readLanguage, putLanguage, readTheme, putTheme, readUser, putUser} from "./storage"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "./const"
import {Log} from "./log"
import {addUser, getUserByCredentials} from "./db"


const defaultGlobalState = {
    language: readLanguage(),
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


export const getLanguage = (state: Context): string => state.language

export function setLanguage(dispatch: Context, value: string) {
    putLanguage(value)
    dispatch({language: value})
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
                Log.v("theme::ThemeSelector: useEffect-> theme change approved = " + theme)
                notifyContextChanged(dispatch)
            } else
                Log.v("theme::ThemeSelector: useEffect-> theme change denied = " + theme)
        })
}


const getUser = (state: Context): string => state.user
const getUserID = (state: Context): string => state.user.id
export const getUserName = (state: Context): string => state.user.name

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

export function setUser(dispatch: Context, user) {
    putUser(user)
    dispatch({user: user})
}