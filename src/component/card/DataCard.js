import icon_bookmark from "../../res/icon_bookmark.svg"
import icon_bookmark_add from "../../res/icon_bookmark_add.svg"

import React from "react"
import {Card} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink, faMailBulk, faHashtag, faKey, faPhone, faIdCard} from "@fortawesome/free-solid-svg-icons"

import {useGlobalState} from "../../module/context"
import {LeakData} from "../../module/db"
import {getString, STRINGS} from "../../module/lang"
import {KEY_BOOKMARKS} from "../../module/storage"


//TODO 12/9/2022: Bind bookmarks with Firebase
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


function getBookmarkIcon(card) {
    return isBookmarked(card) ?
        icon_bookmark :
        icon_bookmark_add
}


function labeledParagraph(faIcon, label, text) {
    return text &&
        <Card.Text role="button"
                   onClick={() => void navigator.clipboard.writeText(text)}>
            <span className="text-muted">
                <FontAwesomeIcon icon={faIcon}/>
                {" "}
                {label}
            </span>
            <br/>
            {text}
        </Card.Text>
}


const DataCard = props => {
    const [state, dispatch] = useGlobalState()
    const data: LeakData = props.data

    //const [bookmarkIcon, updateBookmarkIcon] = useState(getBookmarkIcon(props.card))


    return (
        <Card>
            {/*<Image className={css.icon_bookmark}
                   role="button"
                   src={bookmarkIcon}
                   onClick={() => {
                       const card = props.card
                       isBookmarked(card) ?
                           removeBookmark(card) :
                           addBookmark(card)
                       updateBookmarkIcon(getBookmarkIcon(card))
                   }}/>*/}

            <Card.Body>
                <Card.Title className="mb-4">
                    <FontAwesomeIcon icon={faIdCard}/>
                    {" "}
                    {data.nickname || data.person_email}
                </Card.Title>

                {labeledParagraph(faKey, getString(state, STRINGS.LEAK_LOGIN), data.login)}
                {labeledParagraph(faHashtag, getString(state, STRINGS.LEAK_PASSWORD_HASH), data.password_hash)}
                {labeledParagraph(faMailBulk, getString(state, STRINGS.LEAK_EMAIL), data.person_email)}
                {labeledParagraph(faPhone, getString(state, STRINGS.LEAK_TEL), data.tel)}
            </Card.Body>

            <Card.Footer>
                <Card.Text className="text-muted">
                    <FontAwesomeIcon icon={faLink}/>
                    {" "}
                    {getString(state, STRINGS.LEAK_ID)}: {data.getID()}
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default DataCard