import css from "./About.module.css"
import logo from "../../res/logo.svg"

import React from "react"
import {Container, Image} from "react-bootstrap"
import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"


const About = () => {
    const [state] = useGlobalState()

    return (
        <Container>
            <h1>{getString(state, STRINGS.ABOUT)}</h1>
            <p>{getString(state, STRINGS.ABOUT_INTRO)}</p>


                <Image className={css.logo} src={logo} alt="logo"/>
        </Container>
    )
}

export default About