import css from "./Console.module.css"

import React, {useState} from "react"
import {Container, Form, Button, Row, Col} from "react-bootstrap"

import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/lang"
import {Log} from "../../module/log"
import {addLeak} from "../../module/db/leak"


const Console = () => {
    const [state] = useGlobalState()

    const [field, setField] = useState("")

    async function tryToPush() {
        let parsed
        try {
            parsed = JSON.parse(field.value)
        } catch (e) {
            Log.e("Console::tryToPush: JSON parse error")
            return
        }

        console.log(parsed)

        for (const leak of parsed)
            await addLeak(leak.email, leak.pieces)

        Log.v("Console::tryToPush: clearing input field")
        // noinspection JSPrimitiveTypeWrapperUsage,JSUndefinedPropertyAssignment
        field.value = ""
    }

    return (
        <Container>
            <h1>{getString(state, STRINGS.CONSOLE)}</h1>
            <p>{getString(state, STRINGS.CONSOLE_INTRO)}</p>

            <Form>
                <Form.FloatingLabel className="mt-4"
                                    label={getString(state, STRINGS.CONSOLE_DATA)}>
                    <Form.Control as={"textarea"}
                                  className={css.input}
                                  type="text"
                                  autoComplete="off"
                                  spellCheck={false}
                                  placeholder={getString(state, STRINGS.CONSOLE_DATA)}
                                  onChange={event => {
                                      setField(event.target)
                                      //setCode(event.target.value)
                                  }}/>
                </Form.FloatingLabel>

                <Row className="mt-4">
                    <Button as={Col}
                            className="ms-3 me-2"
                            variant="primary"
                            onClick={() => void tryToPush()}>
                        {getString(state, STRINGS.CONSOLE_PUSH)}
                    </Button>
                </Row>
            </Form>
        </Container>
    )
}

export default Console