import React from "react"
import {Container} from "react-bootstrap"

import {STRINGS, getString} from "../../module/const"
import {useGlobalState} from "../../module/context"


const Profile = () => {
    const [state, dispatch] = useGlobalState()

    return (
        <Container>
            <h1>{getString(state, STRINGS.PROFILE)}</h1>
        </Container>
    )
}

export default Profile