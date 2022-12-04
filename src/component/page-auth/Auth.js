import React, {useState, Context} from "react"
import {Container, Form, Row, Col, Button} from "react-bootstrap"
import {collection, addDoc, where, query, getDocs} from "firebase/firestore"
import {genSaltSync, hashSync} from "bcryptjs-react"

import {database} from "../../index"
import {useGlobalState} from "../../module/context"
import {getString, STRINGS} from "../../module/const"
import {Log} from "../../module/log"
import {Database} from "../../module/app"


const FORMAT_NAME = /^\w{3,16}$/
const FORMAT_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


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

async function login(dispatch: Context, email, pass) {
    let id
    let name
    let passHash
    let passSalt
    try {
        const users = await collection(database, Database.USERS)
        //Query users by email
        const q = query(users, where(Database.USERS_EMAIL, "==", email))
        const snapshot = await getDocs(q)
        snapshot.forEach(docRef => {
            //Get user info
            id = docRef.id
            name = docRef.get(Database.USERS_NAME)
            passHash = docRef.get(Database.USERS_PASSWORD_HASH)
            passSalt = docRef.get(Database.USERS_PASSWORD_SALT)
        })
    } catch (e) {
        Log.e("Auth::login: unable to find the user")
        Log.e("Auth::login:   - email = " + email)
        Log.e("Auth::login:   = catching: " + e)
    }

    const genHash = hashSync(pass, passSalt)

    if (genHash && genHash === passHash) {
        await auth(dispatch, id, name)
        return true
    }
    return false
}

async function auth(dispatch: Context, id, name) {
}


const Auth = () => {
    const [state, dispatch] = useGlobalState()

    const [isLogin, setIsLogin] = useState(true)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")

    const isNameValid = () => FORMAT_NAME.test(name)
    const isEmailValid = () => FORMAT_EMAIL.test(email)
    const isPasswordValid = () => !pass ? false : pass.length >= 8
    const doPasswordsMatch = () => pass && pass === pass2

    return (
        <Container>
            <h1>{getString(state, isLogin ? STRINGS.AUTH_LOGGING : STRINGS.AUTH_REGISTRATION)}</h1>

            <Row className="justify-content-center">
                <Form className="col-md-8">
                    {isLogin ||
                        <Form.FloatingLabel className="mt-4" label={getString(state, STRINGS.AUTH_NICK)}>
                            <Form.Control type="text"
                                          autoComplete="off"
                                          placeholder={getString(state, STRINGS.AUTH_NAME_HINT)}
                                          onChange={event => setName(event.target.value)}
                                          isValid={isNameValid()}
                                          isInvalid={name && !isNameValid()}/>
                        </Form.FloatingLabel>}

                    <Form.FloatingLabel className="mt-3" label={getString(state, STRINGS.AUTH_EMAIL)}>
                        <Form.Control type="email"
                                      autoComplete="email"
                                      placeholder={getString(state, STRINGS.AUTH_EMAIL_HINT)}
                                      onChange={event => setEmail(event.target.value)}
                                      isValid={isEmailValid()}
                                      isInvalid={email && !isEmailValid()}/>
                        <Form.Text className="text-muted">{getString(state, STRINGS.AUTH_EMAIL_TIP)}</Form.Text>
                    </Form.FloatingLabel>

                    <Form.FloatingLabel className="mt-3" label={getString(state, STRINGS.AUTH_PASSWORD)}>
                        <Form.Control type="password"
                                      autoComplete={isLogin ? "password" : "new-password"}
                                      placeholder={getString(state, STRINGS.AUTH_PASSWORD_HINT)}
                                      onChange={event => setPass(event.target.value)}
                                      isValid={isPasswordValid()}
                                      isInvalid={pass && !isPasswordValid()}/>
                    </Form.FloatingLabel>

                    {isLogin ||
                        <Form.FloatingLabel className="mt-1" label={getString(state, STRINGS.AUTH_PASSWORD_CONFIRM)}>
                            <Form.Control type="password"
                                          autoComplete="new-password"
                                          placeholder={getString(state, STRINGS.AUTH_PASSWORD_CONFIRM_HINT)}
                                          onChange={event => setPass2(event.target.value)}
                                          isValid={doPasswordsMatch()}
                                          isInvalid={pass2 && !doPasswordsMatch()}>
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
                                    if (isEmailValid() && isPasswordValid()) {
                                        Log.v("Auth::Auth: onClick-> attempting to login")
                                        void login(dispatch, email, pass)
                                    }
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
                                    if (isNameValid() && isEmailValid() && isPasswordValid() && doPasswordsMatch()) {
                                        Log.v("Auth::Auth: onClick-> attempting to register")
                                        void register(dispatch, name, email, pass)
                                    }
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