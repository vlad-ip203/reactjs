import React, {useEffect} from "react"
import {Helmet} from "react-helmet"

import {useGlobalState, getAppTheme, listenSystemThemeChanges} from "./context"


//Available themes
export const THEME_SYSTEM = "system"
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"
export const THEMES = [
    THEME_SYSTEM,
    THEME_LIGHT,
    THEME_DARK,
]

const styles_light = "styles/bootstrap.min.css"      //bootstrap/dist/css/bootstrap.min.css
const styles_dark = "styles/bootstrap-night.min.css" //bootstrap-dark-5/dist/css/bootstrap-night.min.css


const ThemeSelector = ({children}) => {
    const [state, dispatch] = useGlobalState()
    const theme = getAppTheme(state)
    useEffect(() => listenSystemThemeChanges(state, dispatch))

    return <>
        <Helmet>
            <link rel="stylesheet"
                  type="text/css"
                  href={theme === THEME_LIGHT ?
                      styles_light :
                      styles_dark}/>
        </Helmet>
        {children}
    </>
}

export default ThemeSelector