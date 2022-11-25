// noinspection JSUnresolvedVariable

import React, {Context} from "react"

import {readLanguage, putLanguage} from "./storage"


const defaultGlobalState = {
    language: readLanguage()
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