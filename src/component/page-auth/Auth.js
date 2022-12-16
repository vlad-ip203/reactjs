import React, {useState} from "react"
import {Container, Form, Row, Col, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {where} from "firebase/firestore"

import {useGlobalState, login, register} from "../../module/context"
import {REGEX_NAME, REGEX_EMAIL, App} from "../../module/const"
import {querySingleDoc, DB} from "../../module/db/db"
import {Log} from "../../module/log"
import {getString, STRINGS} from "../../module/lang"


const test_pass = () => !pass ? false : pass.length >= 8
const test_pass2 = () => pass && pass === pass2


let name = "", email = "", pass = "", pass2 = ""

const Auth = () => {
    const [state, dispatch] = useGlobalState()
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)

    const [isNameWrong, setNameWrong] = useState(false)
    const [isEmailWrong, setEmailWrong] = useState(false)
    const [isPassWrong, setPassWrong] = useState(false)
    const [isPass2Wrong, setPass2Wrong] = useState(false)

    function setName(value: string) {
        name = value
        setNameWrong(name && !REGEX_NAME.test(name))
    }
    function setEmail(value: string) {
        email = value
        setEmailWrong(email && !REGEX_EMAIL.test(email))
        if (isLogin)
            setPassWrong(pass && !test_pass())
    }
    function setPass(value: string) {
        pass = value
        setPassWrong(pass && !test_pass())
        if (!isLogin)
            setPass2Wrong(pass2 && !test_pass2())
    }
    function setPass2(value: string) {
        pass2 = value
        setPass2Wrong(pass2 && !test_pass2())
    }

    async function tryToLogin() {
        if (isEmailWrong || isPassWrong) {
            Log.v("Auth::tryToLogin: login request ignored")
            return
        }

        Log.v("Auth::tryToLogin: attempting to login")
        if (await login(dispatch, email, pass))
            navigate(App.ROOT)
        else setPassWrong(true)
    }

    async function tryToRegister() {
        if (isNameWrong || isEmailWrong || isPassWrong || isPass2Wrong) {
            Log.v("Auth::tryToRegister: registration request ignored")
            return
        }

        //Name passed static checks, checking in DB
        const userByNameSnap = await querySingleDoc(DB.Users.all(),
            where(DB.Users.FIELD_NAME, "==", name))
        setNameWrong(userByNameSnap)

        //Email passed static checks, checking in DB
        const userByEmailSnap = await querySingleDoc(DB.Users.all(),
            where(DB.Users.FIELD_EMAIL, "==", email))
        setEmailWrong(userByEmailSnap)

        if (!userByNameSnap && !userByEmailSnap) {
            Log.v("Auth::tryToRegister: attempting to register")

            if (await register(dispatch, name, email, pass))
                navigate(App.ROOT)
        }
    }

    return (
        <Container>
            <h1>{getString(state, isLogin ? STRINGS.AUTH_LOGGING : STRINGS.AUTH_REGISTRATION)}</h1>

            <Row className="justify-content-center">
                <Form className="col-md-8">
                    {isLogin ||
                        <Form.FloatingLabel className="mt-4"
                                            label={getString(state, STRINGS.NICK)}>
                            <Form.Control type="text"
                                          autoComplete="off"
                                          placeholder={getString(state, STRINGS.NICK_HINT)}
                                          onChange={event => setName(event.target.value)}
                                          isInvalid={isNameWrong}/>
                            <Form.Control.Feedback type="invalid">
                                {getString(state, STRINGS.NICK_ERROR)}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                {getString(state, STRINGS.NICK_TIP)}
                            </Form.Text>
                        </Form.FloatingLabel>}

                    <Form.FloatingLabel className="mt-3"
                                        label={getString(state, STRINGS.AUTH_EMAIL)}>
                        <Form.Control type="email"
                                      autoComplete="email"
                                      placeholder={getString(state, STRINGS.AUTH_EMAIL_HINT)}
                                      onChange={event => setEmail(event.target.value)}
                                      isInvalid={isEmailWrong}/>
                        <Form.Control.Feedback type="invalid">
                            {getString(state, STRINGS.AUTH_EMAIL_ERROR)}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            {getString(state, STRINGS.AUTH_EMAIL_TIP)}
                        </Form.Text>
                    </Form.FloatingLabel>

                    <Form.FloatingLabel className="mt-3"
                                        label={getString(state, STRINGS.AUTH_PASSWORD)}>
                        <Form.Control type="password"
                                      autoComplete={isLogin ? "password" : "new-password"}
                                      placeholder={getString(state, STRINGS.AUTH_PASSWORD_HINT)}
                                      onChange={event => setPass(event.target.value)}
                                      isInvalid={isPassWrong}/>
                        {isLogin &&
                            <Form.Control.Feedback type="invalid">
                                {getString(state, STRINGS.AUTH_DATA_ERROR)}
                            </Form.Control.Feedback>}
                    </Form.FloatingLabel>

                    {isLogin ||
                        <Form.FloatingLabel className="mt-1"
                                            label={getString(state, STRINGS.AUTH_PASSWORD_CONFIRM)}>
                            <Form.Control type="password"
                                          autoComplete="new-password"
                                          placeholder={getString(state, STRINGS.AUTH_PASSWORD_CONFIRM_HINT)}
                                          onChange={event => setPass2(event.target.value)}
                                          isInvalid={isPass2Wrong}>
                            </Form.Control>
                        </Form.FloatingLabel>}

                    <Row className="mt-4">
                        <Button as={Col}
                                className="ms-2"
                                variant={isLogin ? "primary" : "outline-secondary"}
                                onClick={() => {
                                    if (!isLogin) {
                                        setIsLogin(true)
                                        setNameWrong(false)
                                        setEmailWrong(false)
                                        setPassWrong(false)
                                        setPass2Wrong(false)
                                        return
                                    }
                                    void tryToLogin()
                                }}>
                            {getString(state, STRINGS.AUTH_LOGIN)}
                        </Button>

                        <Button as={Col}
                                className="ms-3 me-2"
                                variant={!isLogin ? "primary" : "outline-secondary"}
                                onClick={() => {
                                    if (isLogin) {
                                        setIsLogin(false)
                                        setNameWrong(false)
                                        setEmailWrong(false)
                                        setPassWrong(false)
                                        setPass2Wrong(false)
                                        return
                                    }
                                    void tryToRegister()
                                }}>
                            {getString(state, STRINGS.AUTH_REGISTER)}
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}

export default Auth