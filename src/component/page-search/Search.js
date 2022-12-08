import React, {useState} from "react"
import {Container, Form, Row} from "react-bootstrap"
import Masonry from "react-masonry-css"

import {useGlobalState} from "../../module/context"
import {REGEX_EMAIL} from "../../module/const"
import {MASONRY_BREAKPOINT_COLS} from "../../module/app"
import {getString, STRINGS} from "../../module/lang"


let email = ""


const Search = () => {
    const [state, dispatch] = useGlobalState()

    const [isEmailWrong, setEmailWrong] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    function setEmail(value: string) {
        email = value
        setEmailWrong(email && !REGEX_EMAIL.test(email))
    }

    return (
        <Container>
            <h1>{getString(state, STRINGS.SEARCH)}</h1>

            <Row className="justify-content-center">
                <Form className="col-md-8">
                    <Form.FloatingLabel className="mt-3"
                                        label={getString(state, STRINGS.SEARCH_HINT)}>
                        <Form.Control type="email"
                                      autoComplete="email"
                                      placeholder={getString(state, STRINGS.SEARCH)}
                                      onChange={event => setEmail(event.target.value)}
                                      isInvalid={isEmailWrong}/>
                        <Form.Control.Feedback type="invalid">
                            {getString(state, STRINGS.AUTH_ERROR_EMAIL)}
                        </Form.Control.Feedback>
                    </Form.FloatingLabel>
                </Form>
            </Row>

            <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                     className="masonry-grid"
                     columnClassName="masonry-grid-column">
                {searchResults}
            </Masonry>
        </Container>
    )
}

export default Search