import React, {useState, useEffect} from "react"
import {Container} from "react-bootstrap"
import Masonry from "react-masonry-css"

import DataCard from "../card/DataCard"
import {MASONRY_BREAKPOINT_COLS} from "../../module/const"
import {useGlobalState, getUser} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"


const Bookmarks = () => {
    const [state] = useGlobalState()

    const user = getUser(state)
    const [cards, setCards] = useState([])

    useEffect(() => {
        user.getBookmarks().then(bookmarks => {
            if (bookmarks && bookmarks.length)
                setCards(bookmarks.map(piece =>
                    <DataCard key={piece.getFriendlyPieceRef()} data={piece}/>))
            else setCards(getString(state, STRINGS.BOOKMARKS_RESULTS_NOTHING))
        })
    }, [cards, user])

    return (
        <Container>
            <h1>{getString(state, STRINGS.BOOKMARKS)}</h1>

            <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                     className="masonry-grid"
                     columnClassName="masonry-grid-column">
                {cards}
            </Masonry>
        </Container>
    )
}

export default Bookmarks