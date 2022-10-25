import React from 'react';
import {Navbar, Container} from "react-bootstrap";

const MainMenu = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">cursenreact.js</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Profile: <a href="/login">Username</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainMenu;