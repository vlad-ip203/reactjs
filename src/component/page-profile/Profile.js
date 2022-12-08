import React from "react"
import {Container} from "react-bootstrap"

import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"


const Profile = () => {
    const [state, dispatch] = useGlobalState()

    return (
        <Container>
            <h1>{getString(state, STRINGS.PROFILE)}</h1>
        </Container>
    )
}

export default Profile