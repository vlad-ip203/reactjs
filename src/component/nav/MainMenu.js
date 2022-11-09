import css from "./MainMenu.module.css"

import React from "react"
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"


const MainMenu = () => {
    return (
        <Navbar className={css.header}
                collapseOnSelect expand="sm"
                bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/">cursenreact.js</Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/help">Help</Link>
                        <Link className="nav-link" to="/about">About</Link>

                        <NavDropdown title="Dropdown"
                                     menuVariant="dark">
                            <Link className="dropdown-item" to="/help">Help</Link>
                            <NavDropdown.Divider/>
                            <Link className="dropdown-item" to="/about">About</Link>
                        </NavDropdown>
                    </Nav>

                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Profile: <Link to="/login">Username</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainMenu