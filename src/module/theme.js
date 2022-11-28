import React, {useEffect} from "react"
import {Helmet} from "react-helmet"

import {useGlobalState, getAppTheme, listenSystemThemeChanges} from "./context"
import {THEME_LIGHT} from "./const"


const styles_light = "styles/bootstrap.min.css" //bootstrap package
const styles_dark = "styles/bootstrap-night.min.css" //bootstrap-dark-5 package


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