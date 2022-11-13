import css from "./ItemCard.module.css"
import icon_link from "../../res/icon_link.svg"
import icon_bookmark from "../../res/icon_bookmark.svg"
import icon_bookmark_add from "../../res/icon_bookmark_add.svg"

import React from "react"
import {Card} from "react-bootstrap"


const LINK_PREFIX = "http://127.0.0.1:43110/"

function newTab(url: string) {
    window.open(url, "_blank")
}


const ItemCard = args => {
    const image = /*IMAGE_DIR +*/ args.card.icon
    const link = LINK_PREFIX +
        (args.card.domain ?
            args.card.domain :
            args.card.address)

    return (
        <Card>
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