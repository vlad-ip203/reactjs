import React, {useState, Context} from "react"
import {Container, Form, Row, Col, Button} from "react-bootstrap"
import {collection, addDoc, where, query, getDocs} from "firebase/firestore"
import {genSaltSync, hashSync} from "bcryptjs-react"

import {database} from "../../index"
import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/const"
import {Log} from "../../module/log"
import {Database} from "../../module/app"


const generatedSalt = genSaltSync(10)

async function register(dispatch: Context, name, email, password) {
    const generatedHash = hashSync(password, generatedSalt)

    let id
    try {
        const docRef = await addDoc(collection(database, Database.USERS), {
            name: name,
            email: email,
            passwordSalt: generatedSalt,
            passwordHash: generatedHash,
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

async function login(dispatch: Context, email, password) {
    let id
    let name
    let passwordHash
    let passwordSalt
    try {
        const users = await collection(database, Database.USERS)
        //Query users by email
        const q = query(users, where(Database.USERS_EMAIL, "==", email))
        const snapshot = await getDocs(q)
        snapshot.forEach(docRef => {
            //Get user info
            id = docRef.id
            name = docRef.get(Database.USERS_NAME)
            passwordHash = docRef.get(Database.USERS_PASSWORD_HASH)
            passwordSalt = docRef.get(Database.USERS_PASSWORD_SALT)
        })
    } catch (e) {
        Log.e("Auth::login: unable to find the user")
        Log.e("Auth::login:   - email = " + email)
        Log.e("Auth::login:   = catching: " + e)
    }

    const generatedHash = hashSync(password, passwordSalt)

    if (generatedHash && generatedHash === passwordHash)
        await auth(dispatch, id, name)
}

async function auth(dispatch: Context, id, name) {
}


const FORMAT_NAME = /^\w{3,16}$/
const FORMAT_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


const Auth = () => {
    const [state, dispatch] = useGlobalState()

    const [isLogin, setIsLogin] = useState(true)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")

    function isNameValid() {
        if (!FORMAT_NAME.test(name)) return false
        /*try {
            const docRef = await getDoc
        }*/
        return true
    }
    function isEmailValid() {
        if (!FORMAT_EMAIL.test(email)) return false
        /*try {
            const docRef = await getDoc
        }*/
        return true
    }
    function isPasswordValid() {
        if (!pass)
            return false
        return pass.length >= 8
    }
    function doPasswordsMatch() {
        return pass && pass === pass2
    }

    return (
        <Container>
            <h1>{getString(state, isLogin ? STRINGS.AUTH_LOGGING : STRINGS.AUTH_REGISTRATION)}</h1>

            <div className="row justify-content-center">
                <Form className="col-lg-8">
                    {isLogin ||
                        <Form.Group as={Row} className="mt-4">
                            <Form.Label column md="4">{getString(state, STRINGS.AUTH_NICK)}</Form.Label>
                            <Col>
                                <Form.Control type="text"
                                              placeholder={getString(state, STRINGS.AUTH_NAME_HINT)}
                                              onChange={event => setName(event.target.value)}
                                              isValid={isNameValid()}
                                              isInvalid={name && !isNameValid()}/>
                            </Col>
                        </Form.Group>}

                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column md="4">{getString(state, STRINGS.AUTH_EMAIL)}</Form.Label>
                        <Col>
                            <Form.Control type="email"
                                          autoComplete="email"
                                          placeholder={getString(state, STRINGS.AUTH_EMAIL_HINT)}
                                          onChange={event => setEmail(event.target.value)}
                                          isValid={isEmailValid()}
                                          isInvalid={email && !isEmailValid()}/>
                            <Form.Text>{getString(state, STRINGS.AUTH_EMAIL_TIP)}</Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column md="4">{getString(state, STRINGS.AUTH_PASSWORD)}</Form.Label>
                        <Col>
                            <Form.Control type="password"
                                          autoComplete={isLogin ? "password" : "new-password"}
                                          placeholder={getString(state, STRINGS.AUTH_PASSWORD_HINT)}
                                          onChange={event => setPass(event.target.value)}
                                          isValid={isPasswordValid()}
                                          isInvalid={pass && !isPasswordValid()}/>
                        </Col>
                    </Form.Group>

                    {isLogin ||
                        <Form.Group as={Row} className="mt-1">
                            <Form.Label column md="4">{getString(state, STRINGS.AUTH_PASSWORD_CONFIRM)}</Form.Label>
                            <Col>
                                <Form.Control type="password"
                                              autoComplete="new-password"
                                              placeholder={getString(state, STRINGS.AUTH_PASSWORD_CONFIRM_HINT)}
                                              onChange={event => setPass2(event.target.value)}
                                              isValid={doPasswordsMatch()}
                                              isInvalid={pass2 && !doPasswordsMatch()}/>
                            </Col>
                        </Form.Group>}

                    <Row className="mt-4">
                        <Button as={Col} className="ms-2"
                                variant={isLogin ? "primary" : "secondary"}
                                onClick={() => {
                                    if (!isLogin) {
                                        setIsLogin(true)
                                        return
                                    }

                                    if (isEmailValid() &&
                                        isPasswordValid()) {
                                        Log.v("Auth::Auth: onClick-> attempting to login")
                                        void login(dispatch, email, pass)
                                    }
                                }}>
                            {getString(state, STRINGS.AUTH_LOGIN)}
                        </Button>
                        <Button as={Col} className="ms-3 me-2"
                                variant={!isLogin ? "primary" : "secondary"}
                                onClick={() => {
                                    if (isLogin) {
                                        setIsLogin(false)
                                        return
                                    }

                                    if (isNameValid() &&
                                        isEmailValid() &&
                                        isPasswordValid() &&
                                        doPasswordsMatch()) {
                                        Log.v("Auth::Auth: onClick-> attempting to register")
                                        void register(dispatch, name, email, pass)
                                    }
                                }}>
                            {getString(state, STRINGS.AUTH_REGISTER)}
                        </Button>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}

export default Auth