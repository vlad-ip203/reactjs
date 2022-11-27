import "../style/style.scss"

import React from "react"
import {Outlet} from "react-router-dom"

import MainMenu from "./nav/MainMenu"


const Root = () => {
    return <>
        <header className="sticky-top">
            <MainMenu/>
        </header>

        <main className="root-main">
            <Outlet/>
        </main>
    </>
}

export default Root