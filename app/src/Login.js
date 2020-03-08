import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

// import './styles/Login.css';

const loginStatus = {
    SUCCESS: 'success',
    FAILED: 'failed',
};

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        // console.log(this.state.username, this.state.password)
        this.props.handleLogin(this.state.username, this.state.password);
        event.preventDefault();
    }

    loginFailed() {
        return (
            <Alert variant="danger">
                <p>Username/Password incorrect</p>
            </Alert>
        );
    }

    render() {

        return (
            <div style={{ padding: '17rem' }}>
                {this.props.status === loginStatus.FAILED && this.loginFailed()}
                <Card bg="light">
                    <Card.Header>Sign In</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Enter username" onChange={this.handleUsernameChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Login;