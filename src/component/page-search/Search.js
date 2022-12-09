import React, {useState} from "react"
import {Container, Form, InputGroup} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

import {useGlobalState} from "../../module/context"
import {REGEX_EMAIL, MASONRY_BREAKPOINT_COLS} from "../../module/const"
import {getString, STRINGS} from "../../module/lang"
import {getLeaks} from "../../module/db"
import DataCard from "../card/DataCard"


let email = ""


const Search = () => {
    const [state, dispatch] = useGlobalState()

    const [isEmailWrong, setEmailWrong] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    function setEmail(value: string) {
        email = value
        setEmailWrong(email && !REGEX_EMAIL.test(email))
    }

    async function performSearch() {
        const leaks = await getLeaks(email)

        let results = []
        for (const leak of leaks)
            results.push(<DataCard key={leak.getID()} data={leak}/>)

        setSearchResults(results || getString(state, STRINGS.SEARCH_NO_RESULTS))
    }

    return (
        <Container>
            <h1>{getString(state, STRINGS.SEARCH)}</h1>

            <InputGroup className="mt-4 justify-content-center">
                <Form.FloatingLabel label={getString(state, STRINGS.SEARCH_HINT)}>
                    <Form.Control type="email"
                                  autoComplete="email"
                                  placeholder={getString(state, STRINGS.SEARCH)}
                                  onChange={event => setEmail(event.target.value)}
                                  isInvalid={isEmailWrong}/>
                    <Form.Control.Feedback type="invalid">
                        {getString(state, STRINGS.AUTH_ERROR_EMAIL)}
                    </Form.Control.Feedback>
                </Form.FloatingLabel>

                <div className="input-group-text"
                     role="button"
                     onClick={() => isEmailWrong || performSearch()}>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
            </InputGroup>

            <Masonry className="masonry-grid mt-4"
                     breakpointCols={MASONRY_BREAKPOINT_COLS}
                     columnClassName="masonry-grid-column">
                {searchResults}
            </Masonry>
        </Container>
    )
}

export default Search