import css from "./ItemCard.module.css"
import link from "../../res/link.svg"

import React from "react"
import {Card} from "react-bootstrap"


const PREFIX_LINK = "http://127.0.0.1:43110/"

function onClickListener(address: string) {
    window.open(PREFIX_LINK + address, "_blank")
}

const ItemCard = (args) => {
    return <Card className={css.card}
                 onClick={() => onClickListener(
                     args.card.domain ?
                         args.card.domain :
                         args.card.address
                 )}>
        {/*{args.card.icon &&
            <Card.Img className={css.icon}
                      variant="top"
                      src={PREFIX_IMG + args.card.icon}/>}*/}

        <Card.Body>
            <Card.Title>{args.card.title}</Card.Title>

            <Card.Text>
                {args.card.domain &&
                    <Card.Subtitle>
                        <img src={link} alt="Chain icon"/>
                        {" "}
                        <a className="link"
                           href={PREFIX_LINK + args.card.domain}
                           target="_blank">
                            {args.card.domain}
                        </a>
                    </Card.Subtitle>}

                {args.card.description || null}
            </Card.Text>
        </Card.Body>
    </Card>
}

export default ItemCard