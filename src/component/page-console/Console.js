import React from "react"
import {Container} from "react-bootstrap"

import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"


const Console = () => {
    const [state, dispatch] = useGlobalState()

    return (
        <Container>
            <h1>{getString(state, STRINGS.CONSOLE)}</h1>
        </Container>
    )
}

export default Console