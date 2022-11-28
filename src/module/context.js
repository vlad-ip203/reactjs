// noinspection JSUnresolvedVariable

import React, {Context} from "react"

import {readLanguage, putLanguage, readTheme, putTheme} from "./storage"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "./const"


const defaultGlobalState = {
    language: readLanguage(),
    theme: readTheme()
}

const GlobalStateContext = React.createContext(defaultGlobalState)
const DispatchStateContext = React.createContext(undefined)

export const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({...state, ...newValue}),
        defaultGlobalState
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
    React.useContext(DispatchStateContext)
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

function readSystemTheme(): string {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ?
        THEME_DARK : //System theme is dark
        THEME_LIGHT  //System theme is light
}

export function listenSystemThemeChanges(state: Context, dispatch: Context) {
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