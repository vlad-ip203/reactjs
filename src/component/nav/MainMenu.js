import css from "./MainMenu.module.css"
import logo from "../../res/logo.svg"

import React, {useState, useEffect} from "react"
import {Navbar, Container, Nav, NavDropdown, Image} from "react-bootstrap"
import DropdownItem from "react-bootstrap/DropdownItem"
import {Link, useNavigate} from "react-router-dom"

import {useGlobalState, setTheme, setLanguage, logout, getAppTheme, getUser} from "../../module/context"
import {App} from "../../module/const"
import {getString, STRINGS, LANGUAGES} from "../../module/lang"
import {THEMES, THEME_DARK} from "../../module/theme"
import {DB} from "../../module/db/db"


const MainMenu = () => {
    const [state, dispatch] = useGlobalState()
    const navigate = useNavigate()

    const isDark = getAppTheme(state) === THEME_DARK
    const user = getUser(state)
    const isGuest = user.isGuest()
    const [role, setRole] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        user.getRole().then(role => setRole(role))
        user.getName().then(name => setName(name))
    }, [user])

    return (
        <Navbar className={isDark && css.navbar} bg="light" variant="light"
                collapseOnSelect expand="md">
            <Container>
                <Link className="navbar-brand" to={App.ROOT}>
                    <Image src={logo}
                           alt=""
                           width="32"
                           height="32"
                           className="d-inline-block align-top"/>
                    {" "}
                    {getString(state, STRINGS.APP_NAME)}
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={App.SEARCH}>
                            {getString(state, STRINGS.SEARCH)}
                        </Link>
                        <Link className="nav-link" to={App.ABOUT}>
                            {getString(state, STRINGS.ABOUT)}
                        </Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title={isGuest ? getString(state, STRINGS.NAV_ACCOUNT) : name}>
                            {isGuest ?
                                <Link className="dropdown-item" to={App.AUTH}>
                                    {getString(state, STRINGS.AUTH_LOGIN)}
                                </Link> :
                                <>
                                    <Link className="dropdown-item" to={App.PROFILE}>
                                        {getString(state, STRINGS.PROFILE)}
                                    </Link>
                                    {role === DB.Roles.ADMIN &&
                                        <Link className="dropdown-item" to={App.CONSOLE}>
                                            {getString(state, STRINGS.CONSOLE)}
                                        </Link>}
                                    <Link className="dropdown-item" to={App.BOOKMARKS}>
                                        {getString(state, STRINGS.BOOKMARKS)}
                                    </Link>
                                    <DropdownItem onClick={() => {
                                        logout(dispatch)
                                        navigate(App.ROOT)
                                    }}>
                                        {getString(state, STRINGS.AUTH_LOGOUT)}
                                    </DropdownItem>
                                </>
                            }

                            <NavDropdown.Divider/>
                            <NavDropdown.Header>{getString(state, STRINGS.NAV_THEME)}</NavDropdown.Header>
                            {THEMES.map(key =>
                                <DropdownItem key={key} onClick={() => setTheme(dispatch, key)}>
                                    {getString(state, key)}
                                </DropdownItem>,
                            )}

                            <NavDropdown.Divider/>
                            <NavDropdown.Header>{getString(state, STRINGS.NAV_LANGUAGE)}</NavDropdown.Header>
                            {LANGUAGES.map(key =>
                                <DropdownItem key={key} onClick={() => setLanguage(dispatch, key)}>
                                    {getString(state, key)}
                                </DropdownItem>,
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainMenu