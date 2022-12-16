import React, {useState, useEffect} from "react"
import {Container, Form, Button, Col, Row} from "react-bootstrap"
import {where} from "firebase/firestore"

import {useGlobalState, getUser, reload} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"
import {REGEX_NAME} from "../../module/const"
import {Log} from "../../module/log"
import {querySingleDoc, DB} from "../../module/db/db"


const Profile = () => {
    const [state, dispatch] = useGlobalState()

    const user = getUser(state)
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [isNameWrong, setNameWrong] = useState(false)

    useEffect(() => {
        user.getRole().then(role => setRole(role))
        user.getName().then(name => setName(name))
    }, [user])

    function checkName() {
        setNameWrong(name && !REGEX_NAME.test(name))
    }

    async function tryToUpdate() {
        if (isNameWrong) {
            Log.v("Profile::tryToUpdate: update request ignored")
            return
        }

        //Name passed static checks, checking in DB
        const userByNameSnap = await querySingleDoc(DB.Users.all(),
            where(DB.Users.FIELD_NAME, "==", name))
        setNameWrong(userByNameSnap)

        if (!userByNameSnap) {
            Log.v("Profile::tryToUpdate: attempting to update")

            if (await user.setName(dispatch, name))
                reload()
        }
    }

    return (
        <Container>
            <h1>{getString(state, STRINGS.PROFILE)}</h1>

            <Form className="mt-4">
                <Form.FloatingLabel className="mt-4"
                                    label={getString(state, STRINGS.PROFILE_ROLE)}>
                    <Form.Control type="text"
                                  autoComplete="off"
                                  disabled={true}
                                  placeholder={getString(state, STRINGS.PROFILE_ROLE_HINT)}
                                  value={getString(state, role)}/>
                    <Form.Text className="text-muted">
                        {getString(state, STRINGS.PROFILE_ROLE_HINT)}
                    </Form.Text>
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mt-4"
                                    label={getString(state, STRINGS.NICK)}>
                    <Form.Control type="text"
                                  autoComplete="off"
                                  placeholder={getString(state, STRINGS.NICK_HINT)}
                                  value={name}
                                  onChange={event => {
                                      setName(event.target.value)
                                      checkName()
                                  }}
                                  isInvalid={isNameWrong}/>
                    <Form.Control.Feedback type="invalid">
                        {getString(state, STRINGS.NICK_ERROR)}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        {getString(state, STRINGS.NICK_TIP)}
                    </Form.Text>
                </Form.FloatingLabel>

                <Row className="mt-4">
                    <Button as={Col}
                            className="ms-3 me-2"
                            variant="primary"
                            onClick={() => void tryToUpdate()}>
                        {getString(state, STRINGS.PROFILE_SAVE)}
                    </Button>
                </Row>
            </Form>
        </Container>
    )
}

export default Profile