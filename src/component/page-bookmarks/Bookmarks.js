import React, {useState, useEffect} from "react"
import {Container} from "react-bootstrap"
import Masonry from "react-masonry-css"

import DataCard from "../card/DataCard"
import {MASONRY_BREAKPOINT_COLS} from "../../module/const"
import {useGlobalState, getUser} from "../../module/context"


const Bookmarks = () => {
    const [state, dispatch] = useGlobalState()

    const user = getUser(state)
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        user.getBookmarks().then(result => {
            if (result && result.length)
                setBookmarks(
                    result.map((site, index) => {
                        return <DataCard key={index}
                                         card={site}/>
                    }))
            else setBookmarks("No bookmarks")
        })
    }, [user])

    return (
        <Container>
            <h1>Bookmarks</h1>

            <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                     className="masonry-grid"
                     columnClassName="masonry-grid-column">
                {bookmarks}
            </Masonry>
        </Container>
    )
}

export default Bookmarks