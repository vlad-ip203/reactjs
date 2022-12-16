import css from "./Home.module.css"

import {Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"

import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"
import {App} from "../../module/const"


function Home() {
    const [state] = useGlobalState()

    return (
        <Container>
            <h1 className={css.title}>{getString(state, STRINGS.APP_NAME)}</h1>
            <h2 className={css.intro1}>{getString(state, STRINGS.HOME_INTRO1)}</h2>
            <h2 className={css.intro2}>{getString(state, STRINGS.HOME_INTRO2)}</h2>

            <Row className="justify-content-center mt-5">
                <Link className="btn btn-outline-primary col-md-5" to={App.SEARCH}>
                    {getString(state, STRINGS.SEARCH)}
                </Link>
            </Row>
        </Container>
    )
}

export default Home