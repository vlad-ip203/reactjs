import css from "./ItemCard.module.css"
import icon_link from "../../res/icon_link.svg"
import icon_bookmark from "../../res/icon_bookmark.svg"
import icon_bookmark_add from "../../res/icon_bookmark_add.svg"

import React, {useState} from "react"
import {Card, Image} from "react-bootstrap"

import {KEY_BOOKMARKS} from "../../module/app"


let bookmarks = []
function setBookmarks(list) {
    bookmarks = list
}

function readBookmarks() {
    if (bookmarks && bookmarks.length)
        return

    const raw = window.localStorage.getItem(KEY_BOOKMARKS)
    const parsedList = raw ? JSON.parse(raw) : raw

    if (parsedList && Array.isArray(parsedList) && parsedList.length)
        setBookmarks(parsedList)
}
readBookmarks()

function putBookmarks(list) {
    setBookmarks(list)
    window.localStorage.setItem(KEY_BOOKMARKS, JSON.stringify(bookmarks))
}


function isBookmarked(card) {
    return bookmarks.some(value => value.address === card.address)
}
function addBookmark(card) {
    putBookmarks([...bookmarks, card])
}
function removeBookmark(card) {
    let toRemoveI
    bookmarks.forEach((value, i) => {
        if (card.address === value.address)
            toRemoveI = i
    })
    bookmarks.splice(toRemoveI, 1)
    putBookmarks(bookmarks)
}


const LINK_PREFIX = "http://127.0.0.1:43110/"

function newTab(url: string) {
    window.open(url, "_blank")
}

function getBookmarkIcon(card) {
    return isBookmarked(card) ?
        icon_bookmark :
        icon_bookmark_add
}


const ItemCard = args => {
    const [bookmarkIcon, updateBookmarkIcon] = useState(
        getBookmarkIcon(args.card))

    const image = args.card.icon
    const link = LINK_PREFIX +
        (args.card.domain ?
            args.card.domain :
            args.card.address)

    return (
        <Card>
            <Image className={css.icon_bookmark}
                   role="button"
                   src={bookmarkIcon}
                   onClick={() => {
                       const card = args.card
                       isBookmarked(card) ?
                           removeBookmark(card) :
                           addBookmark(card)
                       updateBookmarkIcon(getBookmarkIcon(card))
                   }}/>

            {args.card.icon &&
                <Card.Header>
                    <Card.Img className={css.icon}
                              variant="top"
                              src={image}/>
                </Card.Header>}

            <Card.Body role="button"
                       onClick={() => newTab(link)}>
                <Card.Title>{args.card.title}</Card.Title>

                {args.card.description || null}
            </Card.Body>

            {args.card.domain &&
                <Card.Footer>
                    <Card.Text>
                        <Card.Subtitle>
                            <img src={icon_link} alt="Chain icon"/>
                            {" "}
                            <a className="link"
                               href={link}
                               target="_blank" rel="noreferrer">
                                {args.card.domain}
                            </a>
                        </Card.Subtitle>
                    </Card.Text>
                </Card.Footer>}
        </Card>
    )
}

export default ItemCard