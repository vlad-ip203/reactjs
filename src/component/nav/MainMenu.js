import logo from "../../res/logo.svg"

import React from "react"
import {Navbar, Container, Nav, NavDropdown, Image} from "react-bootstrap"
import DropdownItem from "react-bootstrap/DropdownItem"
import {Link, useNavigate} from "react-router-dom"

import {useGlobalState, setTheme, getUserName, setLanguage, logout, getUserID} from "../../module/context"
import {App} from "../../module/const"
import {USER_GUEST} from "../../module/db"
import {getString, STRINGS, LANGUAGES} from "../../module/lang"
import {THEMES} from "../../module/theme"


const MainMenu = () => {
    const [state, dispatch] = useGlobalState()
    const navigate = useNavigate()

    const isGuest = getUserID(state) === USER_GUEST.id

    return (
        <Navbar collapseOnSelect expand="md"
                bg="light" variant="light">
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

                        <NavDropdown title={getString(state, STRINGS.NAV_HELP)}
                                     menuVariant="light">
                            <Link className="dropdown-item" to={App.HELP}>
                                {getString(state, STRINGS.NAV_HELP_HELP)}
                            </Link>
                            <NavDropdown.Divider/>
                            <Link className="dropdown-item" to={App.ABOUT}>
                                {getString(state, STRINGS.NAV_HELP_ABOUT)}
                            </Link>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        <NavDropdown menuVariant="light"
                                     title={isGuest ?
                                         getString(state, STRINGS.NAV_ACCOUNT) :
                                         getUserName(state)}>
                            {isGuest ?
                                <Link className="dropdown-item" to={App.AUTH}>
                                    {getString(state, STRINGS.AUTH_LOGIN)}
                                </Link> :
                                <>
                                    <Link className="dropdown-item" to={App.PROFILE}>
                                        {getString(state, STRINGS.PROFILE)}
                                    </Link>
                                    <Link className="dropdown-item" to={App.BOOKMARKS}>
                                        {getString(state, STRINGS.NAV_BOOKMARKS)}
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