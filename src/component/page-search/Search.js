import css from "./Search.module.css"

import React, {useState} from "react"
import {Container, Form, Button} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

import {useGlobalState} from "../../module/context"
import {REGEX_EMAIL, MASONRY_BREAKPOINT_COLS} from "../../module/const"
import {getString, STRINGS} from "../../module/lang"
import {Log} from "../../module/log"
import {getLeaks} from "../../module/db"
import DataCard from "../card/DataCard"


let email = ""


const Search = () => {
    const [state, dispatch] = useGlobalState()

    const [isEmailSyntaxWrong, setEmailSyntaxWrong] = useState(true)
    const [isEmailWrong, setEmailWrong] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    function setEmail(value: string) {
        email = value
        const isWrong = !REGEX_EMAIL.test(email)
        setEmailSyntaxWrong(isWrong)
        setEmailWrong(email.length && isWrong)
    }

    async function performSearch() {
        const leaks = await getLeaks(email)
        Log.v("Search::performSearch: received " + leaks.length + " leaks")

        let results = []
        for (const leak of leaks)
            results.push(<DataCard key={leak.getID()} data={leak}/>)

        setSearchResults(results.length ? <>
                <p>{getString(state, STRINGS.SEARCH_RESULTS_COUNT, results.length, email)}</p>
                {results}
            </> :
            <p>{getString(state, STRINGS.SEARCH_RESULTS_NOTHING, email)}</p>)
    }

    return (
        <Container>
            <h1>{getString(state, STRINGS.SEARCH)}</h1>

            <Form className="mt-4">
                <Form.FloatingLabel label={getString(state, STRINGS.SEARCH_HINT)}>
                    <Form.Control className={css.input}
                                  type="email"
                                  autoComplete="email"
                                  placeholder={getString(state, STRINGS.SEARCH)}
                                  onChange={event => setEmail(event.target.value)}
                                  isInvalid={isEmailWrong}/>

                    <Button className={css.button}
                            disabled={isEmailSyntaxWrong}
                            onClick={() => performSearch()}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </Button>

                    <Form.Control.Feedback type="invalid">
                        {getString(state, STRINGS.SEARCH_ERROR_EMAIL)}
                    </Form.Control.Feedback>
                </Form.FloatingLabel>
            </Form>

            <Masonry className="masonry-grid mt-4"
                     breakpointCols={MASONRY_BREAKPOINT_COLS}
                     columnClassName="masonry-grid-column">
                {searchResults}
            </Masonry>
        </Container>
    )
}

export default Search