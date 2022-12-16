import css from "./DataCard.module.css"

import React, {useState, useEffect} from "react"
import {Card} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faLink,
    faMailBulk,
    faHashtag,
    faKey,
    faPhone,
    faIdCard,
    faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons"
import {faBookmark as farBookmark} from "@fortawesome/free-regular-svg-icons"

import {useGlobalState, getUser} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"
import {Piece} from "../../module/db/leak"


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
    const [state] = useGlobalState()

    const user = getUser(state)
    const piece: Piece = props.data
    const [email, setEmail] = useState("")

    const [isBookmarked, setIsBookmarked] = useState(false)
    useEffect(() => {
        user.isBookmarked(piece).then(is => setIsBookmarked(is))

        piece.leak.getEmail().then(email => setEmail(email))
    }, [piece, user])

    return (
        <Card>
            <FontAwesomeIcon className={css.icon_bookmark}
                             role="button"
                             icon={isBookmarked ? fasBookmark : farBookmark}
                             onClick={() => {
                                 setIsBookmarked(!isBookmarked)

                                 if (isBookmarked)
                                     void user.removeBookmark(piece)
                                 else void user.addBookmark(piece)
                             }}/>

            <Card.Body>
                <Card.Title className="mb-4">
                    <FontAwesomeIcon icon={faIdCard}/>
                    {" "}
                    {piece.nickname || email}
                </Card.Title>

                {labeledParagraph(faKey, getString(state, STRINGS.LEAK_LOGIN), piece.login)}
                {labeledParagraph(faHashtag, getString(state, STRINGS.LEAK_PASSWORD_HASH), piece.password_hash)}
                {labeledParagraph(faMailBulk, getString(state, STRINGS.LEAK_EMAIL), email)}
                {labeledParagraph(faPhone, getString(state, STRINGS.LEAK_TEL), piece.tel)}
            </Card.Body>

            <Card.Footer>
                <Card.Text className="text-muted">
                    <FontAwesomeIcon icon={faLink}/>
                    {" "}
                    {getString(state, STRINGS.LEAK_ID)}: {piece.getFriendlyPieceRef()}
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default DataCard