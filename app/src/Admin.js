import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import './styles/Admin.css';

const Admin = () => (
    <div style={{ padding: '17rem' }}>
        <Card bg="light" style={{ width: '36rem', margin: 'auto' }}>
            <Card.Header>Sign In</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
);

export default Admin;