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
                <Navbar.Brand href="/">cursenreact.js</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={"me-auto"}>
                        <Nav.Link href="/help">Help</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>

                        <NavDropdown title="Dropdown"
                                     menuVariant="dark">
                            <NavDropdown.Item href="/help">Help</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/about">About</NavDropdown.Item>
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