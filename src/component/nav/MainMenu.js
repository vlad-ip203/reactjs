import React from "react"
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import DropdownItem from "react-bootstrap/DropdownItem"
import {Link} from "react-router-dom"

import {Site} from "../../module/app"
import {useGlobalState, setLanguage, setTheme} from "../../module/context"
import {getString, LANGUAGES, STRINGS, THEMES} from "../../module/const"


const MainMenu = () => {
    const [state, dispatch] = useGlobalState()

    return (
        <Navbar collapseOnSelect expand="md"
                bg="light" variant="light">
            <Container>
                <Link className="navbar-brand" to={Site.ROOT}>
                    {getString(state, STRINGS.APP_NAME)}
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={Site.BOOKMARKS}>
                            {getString(state, STRINGS.NAV_BOOKMARKS)}
                        </Link>

                        <NavDropdown title={getString(state, STRINGS.NAV_HELP)}
                                     menuVariant="light">
                            <Link className="dropdown-item" to={Site.HELP}>
                                {getString(state, STRINGS.NAV_HELP_HELP)}
                            </Link>
                            <NavDropdown.Divider/>
                            <Link className="dropdown-item" to={Site.ABOUT}>
                                {getString(state, STRINGS.NAV_HELP_ABOUT)}
                            </Link>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        <NavDropdown title={getString(state, STRINGS.NAV_LANGUAGE)}
                                     menuVariant="light">
                            {LANGUAGES.map(key =>
                                <DropdownItem key={key} onClick={() => setLanguage(dispatch, key)}>
                                    {getString(state, key)}
                                </DropdownItem>,
                            )}
                        </NavDropdown>
                        <NavDropdown title={getString(state, STRINGS.NAV_THEME)}
                                     menuVariant="light">
                            {THEMES.map(key =>
                                <DropdownItem key={key} onClick={() => setTheme(dispatch, key)}>
                                    {getString(state, key)}
                                </DropdownItem>,
                            )}
                        </NavDropdown>
                        <Navbar.Text>
                            Profile: <Link to={Site.AUTH}>Username</Link>
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainMenu