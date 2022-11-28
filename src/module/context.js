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


export function getLanguage(state: Context): string {
    return state.language
}

export function setLanguage(dispatch: Context, value: string) {
    putLanguage(value)
    dispatch({language: value})
}


export const getTheme = (state: Context): string => state.theme

export function setTheme(dispatch: Context, value: string) {
    putTheme(value)
    dispatch({theme: value})
}