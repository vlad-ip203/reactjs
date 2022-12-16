import React, {useState, useEffect} from "react"
import {Container, Form, Button, Row} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

import {useGlobalState, getUser} from "../../module/context"
import {getLeak} from "../../module/db/leak"
import {REGEX_EMAIL, MASONRY_BREAKPOINT_COLS, App} from "../../module/const"
import {getString, STRINGS} from "../../module/lang"
import {Log} from "../../module/log"
import DataCard from "../card/DataCard"


let email = ""


const Search = () => {
    const [state] = useGlobalState()
    const navigate = useNavigate()

    const user = getUser(state)

    useEffect(() => {
        if (user.isGuest())
            navigate(App.AUTH)
    }, [navigate, state, user])

    const [isEmailSyntaxWrong, setEmailSyntaxWrong] = useState(true)
    const [isEmailWrong, setEmailWrong] = useState(false)
    const [content, setContent] = useState("initial")

    function setEmail(value: string) {
        email = value
        const isWrong = !REGEX_EMAIL.test(email)
        setEmailSyntaxWrong(isWrong)
        setEmailWrong(email.length && isWrong)
    }

    async function performSearch() {
        const leak = await getLeak(email)
        if (!leak) {
            setContent(
                <p>{getString(state, STRINGS.SEARCH_RESULTS_NOTHING, email)}</p>,
            )
            return
        }

        leak.getPieces().then(pieces => {
            Log.v("Search::performSearch: leak pieces received: " + pieces.length)

            setContent(<>
                <p>{getString(state, STRINGS.SEARCH_RESULTS_COUNT, pieces.length, email)}</p>
                <Masonry className="masonry-grid mt-4"
                         breakpointCols={MASONRY_BREAKPOINT_COLS}
                         columnClassName="masonry-grid-column">
                    {pieces.map(piece =>
                        <DataCard key={piece.getFriendlyPieceRef()}
                                  data={piece}/>)}
                </Masonry>
            </>)
        })
    }

    return (
        <Container>
            <h1>{getString(state, STRINGS.SEARCH)}</h1>
            <p>{getString(state, STRINGS.SEARCH_INTRO)}</p>

            <Row className="justify-content-center">
                <Form className="col-md-5">
                    <Form.FloatingLabel className="mt-4"
                                        label={getString(state, STRINGS.SEARCH_EMAIL_HINT)}>
                        <Form.Control className="form-input-floating"
                                      type="email"
                                      autoComplete="email"
                                      placeholder={getString(state, STRINGS.SEARCH)}
                                      onChange={event => setEmail(event.target.value)}
                                      isInvalid={isEmailWrong}/>

                        <Button className="form-input-floating-button"
                                disabled={isEmailSyntaxWrong}
                                onClick={() => performSearch()}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </Button>

                        <Form.Control.Feedback type="invalid">
                            {getString(state, STRINGS.SEARCH_EMAIL_ERROR)}
                        </Form.Control.Feedback>
                    </Form.FloatingLabel>
                </Form>
            </Row>

            {content !== "initial" && content}
        </Container>
    )
}

export default Search