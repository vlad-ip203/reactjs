import css from './Error404.module.css';
import logo from "../../res/logo.svg";

import MainMenu from "../nav/MainMenu";

import React from 'react';
import {useRouteError} from "react-router-dom";
import {Container} from "react-bootstrap";


const Error404 = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <div>
            <header>
                <MainMenu/>
            </header>

            <main><Container>
                <h1>Oups!</h1>
                <p>Seems like you're requesting a page we can't find</p>
                <img className={css.logo} src={logo} alt="logo"/>
            </Container></main>

            <footer className='fixed-bottom'>
                <p className={css.details}>
                    — Добродію, у Вас край п'ятого рядка хиба.
                    <br/>
                    — Годі ж Вам, Василе. То не хиба, а la fonctionnalité!
                </p>
            </footer>
        </div>
    );
};

export default Error404;