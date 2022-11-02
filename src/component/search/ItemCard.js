import css from "./ItemCard.module.css"
import link from "../../res/link.svg"

import React from "react"
import {Card} from "react-bootstrap"


const linkPrefix = "http://127.0.0.1:43110/"

const ItemCard = (args) => {
    return (
        <Card>
            {args.card.icon &&
                <Card.Img className={css.icon}
                          variant="top"
                          src={args.card.icon}/>}

            <Card.Body>
                <Card.Title href={linkPrefix + args.card.address}>
                    {args.card.title}
                </Card.Title>

                <Card.Text>
                    {args.card.domain &&
                        <Card.Subtitle>
                            <img src={link} alt="Chain icon"/>
                            {" "}
                            <a className="link"
                               href={linkPrefix + args.card.domain}>
                                {args.card.domain}
                            </a>
                        </Card.Subtitle>}

                    {args.card.description || null}
                </Card.Text>

                <Card.Link className="link"
                           href={linkPrefix + args.card.address}>
                    Open
                </Card.Link>
            </Card.Body>
        </Card>
    )
}

export default ItemCard