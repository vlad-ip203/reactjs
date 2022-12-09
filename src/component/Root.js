import "../style/style.css"
import "../style/fix.css"

import React from "react"
import {Outlet} from "react-router-dom"

import MainMenu from "./nav/MainMenu"


const Root = () => {
    return <>
        <header className="sticky-top">
            <MainMenu/>
        </header>

        <main className="mt-4">
            <Outlet/>
        </main>
    </>
}

export default Root