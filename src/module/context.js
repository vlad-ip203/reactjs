import React from "react"
import {STRINGS} from "./const"


const defaultGlobalState = {
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