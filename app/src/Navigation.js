import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Indonesia Drought Monitoring Forecast System</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
    </Navbar>
);

export default Navigation;