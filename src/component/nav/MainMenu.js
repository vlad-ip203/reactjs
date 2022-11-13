import css from "./MainMenu.module.css"

import React from "react"
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"

import {Site} from "../../module/app"


const MainMenu = () => {
    return (
        <Navbar className={css.header}
                collapseOnSelect expand="sm"
                bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to={Site.ROOT}>cursenreact.js</Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={Site.BOOKMARKS}>Bookmarks</Link>

                        <NavDropdown title="Help"
                                     menuVariant="dark">
                            <Link className="dropdown-item" to={Site.HELP}>Help</Link>
                            <NavDropdown.Divider/>
                            <Link className="dropdown-item" to={Site.ABOUT}>About</Link>
                        </NavDropdown>
                    </Nav>

                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Profile: <Link to={Site.LOGIN}>Username</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainMenu