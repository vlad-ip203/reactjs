import css from "./DataCard.module.css"
import icon_bookmark from "../../res/icon_bookmark.svg"
import icon_bookmark_add from "../../res/icon_bookmark_add.svg"

import React, {useState, useEffect} from "react"
import {Card, Image} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink, faMailBulk, faHashtag, faKey, faPhone, faIdCard} from "@fortawesome/free-solid-svg-icons"

import {useGlobalState, getUser} from "../../module/context"
import {LeakData} from "../../module/db"
import {getString, STRINGS} from "../../module/lang"


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

    const user = getUser(state)
    const data: LeakData = props.data

    const [bookmarkIcon, updateBookmarkIcon] = useState(icon_bookmark_add)
    useEffect(() => {
        user.isBookmarked(data).then(result =>
            updateBookmarkIcon(
                result ?
                    icon_bookmark :
                    icon_bookmark_add))
    }, [data, user])

    return (
        <Card>
            <Image className={css.icon_bookmark}
                   role="button"
                   src={bookmarkIcon}
                   onClick={() => {
                       user.isBookmarked(data).then(result => {
                           if (result) {
                               void user.removeBookmark(data)
                               updateBookmarkIcon(icon_bookmark_add)
                           } else {
                               void user.addBookmark(data)
                               updateBookmarkIcon(icon_bookmark)
                           }
                       })
                   }}/>

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