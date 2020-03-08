import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import Login from './Login';

const loginStatus = {
    SUCCESS: 'success',
    FAILED: 'failed',
};

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginStatus: null,
            weightModel: [],
            updateStatus: null,
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.getAllModelWeight = this.getAllModelWeight.bind(this);
        this.handleWeightFormChange = this.handleWeightFormChange.bind(this);
        this.handleWeightFormSubmit = this.handleWeightFormSubmit.bind(this);
        this.getAllModelWeight();
    }

    handleLogin(username, password){
        // console.log(username, password);
        axios.post(`http://localhost:5000/users/login`, { username: username, password: password })
            .then(res => {
                this.setState({loginStatus: res.data});
            });
    }

    getAllModelWeight() {
        axios.get(`http://localhost:5000/api/weight-model`)
            .then(res => {
                this.setState({weightModel: res.data});
            });
    }

    handleWeightFormChange(event) {
        let weightModelCopy = this.state.weightModel;
        weightModelCopy.forEach((e) => {
            if(e.model === event.target.id) {
                e.weight = event.target.value;
            }
        });
        // console.log(weightModelCopy);
        this.setState({weightModel: weightModelCopy})
    }

    handleWeightFormSubmit(event) {
        const model = event.currentTarget.id;
        const weight = this.state.weightModel.find(e => e.model === model).weight;
        console.log(model,weight);
        axios.put(`http://localhost:5000/api/weight-model`, {model: model, weight: weight})
            .then(res => {
                this.setState({updateStatus: true})
            });
        event.preventDefault();
    }

    updateSuccess() {
        return (
            <Alert variant="success">
                <p>Data updated</p>
            </Alert>
        );
    }

    renderWeightForm() {
        const weightModel = this.state.weightModel;
        return(
            <React.Fragment>

            {this.state.updateStatus && this.updateSuccess()}
            <div style={{display: 'flex', margin: '70px', justifyContent: 'center'}}>
                <Card bg="light" style={{margin: '10px'}}>
                    <Card.Body>
                        {weightModel.map((value, index) => {
                            if (index % 2 === 0){
                                return (
                                    <Form id={value['model']} onSubmit={this.handleWeightFormSubmit}>
                                        <Form.Group>
                                            <Form.Label>{value['model']}</Form.Label>
                                            <Form.Control id={value['model']} value={value['weight']} onChange={this.handleWeightFormChange} />
                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                );
                            }
                            return null;
                        })}
                    </Card.Body>
                </Card>

                <Card bg="light" style={{margin: '10px'}}>
                    <Card.Body>
                        {weightModel.map((value, index) => {
                            if (index % 2 === 1){
                                return (
                                    <Form id={value['model']} onSubmit={this.handleWeightFormSubmit}>
                                        <Form.Group>
                                            <Form.Label>{value['model']}</Form.Label>
                                            <Form.Control id={value['model']} value={value['weight']} onChange={this.handleWeightFormChange} />
                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                );
                            }
                            return null;
                        })}
                    </Card.Body>
                </Card>
            </div>

            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loginStatus === loginStatus.SUCCESS && this.renderWeightForm()}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Login 
                        handleLogin = {this.handleLogin}
                        status = {this.state.loginStatus}
                    />

                </div>
            </React.Fragment>
        );
    }
}

export default Admin;