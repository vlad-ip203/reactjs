import React, {useState, useEffect} from "react"
import {Container} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import Masonry from "react-masonry-css"

import {MASONRY_BREAKPOINT_COLS, App} from "../../module/const"
import {useGlobalState, getUser} from "../../module/context"
import {Log} from "../../module/log"
import {getString, STRINGS} from "../../module/lang"
import DataCard from "../card/DataCard"
import {DB} from "../../module/db/db"


const Bookmarks = () => {
    const [state] = useGlobalState()
    const navigate = useNavigate()

    const user = getUser(state)

    useEffect(() => {
        if (user.isGuest())
            navigate(App.AUTH)

        user.getRole().then(role => {
            if (role !== DB.Roles.ADMIN)
                navigate(App.ROOT)
        })
    }, [navigate, state, user])

    const [content, setContent] = useState("initial")

    useEffect(() => {
        user.getBookmarks().then(bookmarks => {
            Log.v("Bookmarks::useEffect: bookmarks received")
            Log.v("Bookmarks::useEffect:   - isGuest = " + user.isGuest())

            if (bookmarks && bookmarks.length)
                setContent(
                    <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                             className="masonry-grid"
                             columnClassName="masonry-grid-column">
                        {bookmarks.map(piece =>
                            <DataCard key={piece.getFriendlyPieceRef()}
                                      data={piece}/>)}
                    </Masonry>,
                )
            else setContent(<>
                <p>{getString(state, STRINGS.BOOKMARKS_RESULTS_NOTHING)}</p>
                <Link to={user.isGuest() ? App.AUTH : App.SEARCH}>
                    {getString(state, STRINGS.BOOKMARKS_HINT)}
                </Link>
            </>)
        })
    }, [state, user])

    return (
        <Container>
            <h1>{getString(state, STRINGS.BOOKMARKS)}</h1>

            {content !== "initial" && content}
        </Container>
    )
}

export default Bookmarks