import css from "./ItemCard.module.css"
import icon_chain from "../../res/link.svg"

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
        <Card className={css.card}
              onClick={() => newTab(link)}>
            {args.card.icon &&
                <Card.Header>
                    <Card.Img className={css.icon}
                              variant="top"
                              src={image}/>
                </Card.Header>}

            <Card.Body>
                <Card.Title>{args.card.title}</Card.Title>

                {args.card.description || null}
            </Card.Body>

            {args.card.domain &&
                <Card.Footer>
                    <Card.Text>
                        <Card.Subtitle>
                            <img src={icon_chain} alt="Chain icon"/>
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