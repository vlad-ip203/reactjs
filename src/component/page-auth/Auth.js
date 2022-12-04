import React, {useState, Context} from "react"
import {Container, Form, Row, Col, Button} from "react-bootstrap"
import {collection, addDoc, where, query, getDocs} from "firebase/firestore"
import {genSaltSync, hashSync} from "bcryptjs-react"

import {database} from "../../index"
import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/const"
import {Log} from "../../module/log"
import {Database} from "../../module/app"


async function findUser(field, value) {
    let out = null
    try {
        const users = await collection(database, Database.USERS)

        //Query users by email
        const q = query(users, where(field, "==", value))

        const snapshot = await getDocs(q)
        snapshot.forEach(docRef => out = docRef)
    } catch (e) {
        Log.e("Auth::findUser: unable to query the user")
        Log.e("Auth::findUser:   - field = " + field)
        Log.e("Auth::findUser:   - value = " + value)
        Log.e("Auth::findUser:   = catching: " + e)
    }
    return out
}

async function login(dispatch: Context, email, pass) {
    const userRef = await findUser(Database.USERS_EMAIL, email)
    if (!userRef) {
        Log.e("Auth::login: unable to find the user")
        Log.e("Auth::login:   - email = " + email)
        return false
    }

    const userID = userRef.id
    const userName = userRef.get(Database.USERS_NAME)
    const userPassHash = userRef.get(Database.USERS_PASSWORD_HASH)
    const userPassSalt = userRef.get(Database.USERS_PASSWORD_SALT)

    const genHash = hashSync(pass, userPassSalt)

    if (genHash && genHash === userPassHash) {
        await auth(dispatch, userID, userName)
        return true
    }
    return false
}

async function register(dispatch: Context, name, email, pass) {
    const genSalt = genSaltSync(10)
    const genHash = hashSync(pass, genSalt)

    let id
    try {
        const docRef = await addDoc(collection(database, Database.USERS), {
            name: name,
            email: email,
            passwordSalt: genSalt,
            passwordHash: genHash,
        })
        id = docRef.id

        Log.v("Auth::register: user added to database")
        Log.v("Auth::register:   - id   = " + id)
        Log.v("Auth::register:   - name = " + name)
    } catch (e) {
        Log.e("Auth::register: unable to add user")
        Log.e("Auth::register:   - name  = " + name)
        Log.e("Auth::register:   - email = " + email)
        Log.e("Auth::register:   = catching: " + e)
        return
    }

    await auth(dispatch, id, name)
}



const REGEX_NAME = /^\w{3,16}$/
const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const test_pass = () => !pass ? false : pass.length >= 8
const test_pass2 = () => pass && pass === pass2

async function auth(dispatch: Context, id, name) {
}

let name = "", email = "", pass = "", pass2 = ""

const Auth = () => {
    const [state, dispatch] = useGlobalState()

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
    }
    function setPass(value: string) {
        pass = value
        setPassWrong(pass && !test_pass())
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

        Log.v("Auth::tryToRegister: attempting to login")
        if (!await login(dispatch, email, pass))
            setPassWrong(true)
    }

    async function tryToRegister() {
        if (isNameWrong || isEmailWrong || isPassWrong || isPass2Wrong) {
            Log.v("Auth::tryToRegister: registration request ignored")
            return
        }

        //Name passed static checks, checking in DB
        const user1Ref = await findUser(Database.USERS_NAME, name)
        setNameWrong(user1Ref)

        //Email passed static checks, checking in DB
        const user2Ref = await findUser(Database.USERS_EMAIL, email)
        setEmailWrong(user2Ref)

        if (!user1Ref && !user2Ref) {
            Log.v("Auth::tryToRegister: attempting to register")
            await register(dispatch, name, email, pass)
        }
    }

    return (
        <Container>
            <h1>{getString(state, isLogin ? STRINGS.AUTH_LOGGING : STRINGS.AUTH_REGISTRATION)}</h1>

            <Row className="justify-content-center">
                <Form className="col-md-8">
                    {isLogin ||
                        <Form.FloatingLabel className="mt-4"
                                            label={getString(state, STRINGS.AUTH_NICK)}>
                            <Form.Control type="text"
                                          autoComplete="off"
                                          placeholder={getString(state, STRINGS.AUTH_NAME_HINT)}
                                          onChange={event => setName(event.target.value)}
                                          isInvalid={isNameWrong}/>
                            <Form.Control.Feedback type="invalid">
                                {getString(state, STRINGS.AUTH_ERROR_NAME)}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                {getString(state, STRINGS.AUTH_NAME_TIP)}
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
                            {getString(state, STRINGS.AUTH_ERROR_EMAIL)}
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
                                {getString(state, STRINGS.AUTH_ERROR_DATA)}
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