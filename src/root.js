import "bootstrap/dist/css/bootstrap.min.css"
import "./root.css"

import React from "react"
import {Outlet} from "react-router-dom"

import MainMenu from "./component/nav/MainMenu"


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