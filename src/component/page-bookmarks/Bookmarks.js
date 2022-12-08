import React from "react"
import {Container} from "react-bootstrap"
import Masonry from "react-masonry-css"

import DataCard from "../card/DataCard"
import {MASONRY_BREAKPOINT_COLS} from "../../module/const"
import {KEY_BOOKMARKS} from "../../module/storage"


const Bookmarks = () => {
    const getBookmarks = () => {
        let raw = window.localStorage.getItem(KEY_BOOKMARKS)
        let parsedList = raw ? JSON.parse(raw) : raw

        let out = "No bookmarks"
        if (parsedList && Array.isArray(parsedList) && parsedList.length)
            out = parsedList.map((site, index) => {
                return <DataCard key={index}
                                 card={site}/>
            })
        return out
    }

    return (
        <Container>
            <h1>Bookmarks</h1>

            <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                     className="masonry-grid"
                     columnClassName="masonry-grid-column">
                {getBookmarks()}
            </Masonry>
        </Container>
    )
}

export default Bookmarks