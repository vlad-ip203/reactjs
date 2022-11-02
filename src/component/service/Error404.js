import css from "./Error404.module.css"
import logo from "../../res/logo.svg"

import React from "react"
import {useRouteError} from "react-router-dom"
import {Container} from "react-bootstrap"

import MainMenu from "../nav/MainMenu"


const Error404 = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <>
            <header>
                <MainMenu/>
            </header>

            <main><Container>
                <h1>Oops!</h1>
                <p>Seems like you're requesting a page we can't find</p>

                <p className="text-info">
                    Error: {error.status}
                    <br/>
                    Details: {error.statusText || error.message}
                </p>

                <img className={css.logo} src={logo} alt="logo"/>
            </Container></main>

            <footer className="fixed-bottom">
                <p className="text-light">
                    — Добродію, у Вас край п'ятого рядка хиба.
                    <br/>
                    — Годі ж Вам, Василе. То не хиба, а la fonctionnalité!
                </p>
            </footer>
        </>
    )
}

export default Error404