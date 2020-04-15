import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './styles/Option.css';

class OptionBMKG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialTimes : [],
            initialTime: null,
            leadTime: null,
        };

        this.getInitialTimes = this.getInitialTimes.bind(this);
        this.handleInitialTimeChange = this.handleInitialTimeChange.bind(this);
        this.handleLeadTimeChange = this.handleLeadTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getInitialTimes();
    }

    getInitialTimes() {
        axios.get(`${process.env.REACT_APP_API_URL}api/bmkg-data/initial-time`)
            .then(res => {
                this.setState({initialTimes: res.data, leadTime: '2-11'});
                const initialTime = this.state.initialTimes[0]['initial_time'];
                const leadTime = '2-11';
                this.props.handleDataChange(initialTime, leadTime)
            });
    }

    handleInitialTimeChange(event) {
        const value = event.target.value.replace(/ /g, '+');
        // console.log(value);
        this.setState({initialTime: value});
    }

    handleLeadTimeChange(event) {
        this.setState({leadTime: event.target.value});
    }

    handleSubmit(event) {
        const { initialTime, leadTime } = this.state;
        // console.log("test");
        this.props.handleDataChange(initialTime, leadTime);
        event.preventDefault();
    }

    render() {
        const initialTimes = this.state.initialTimes;
        return (
            <div className="form-style">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Initial Forecast Time</Form.Label>
                        <Form.Control as="select" onChange={this.handleInitialTimeChange}>
                            {initialTimes.map((value, index) => {
                                return (
                                    <option value={value['initial_time']}>{value['initial_time']}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Lead Time</Form.Label>
                        <Form.Control as="select" onChange={this.handleLeadTimeChange}>
                            <option value="2-11">2-11</option>
                            <option value="3-12">3-12</option>
                            <option value="4-13">4-13</option>
                            <option value="5-14">5-14</option>
                            <option value="6-15">6-15</option>
                            <option value="7-16">7-16</option>
                            <option value="8-17">2-11</option>
                            <option value="9-18">3-12</option>
                            <option value="10-19">4-13</option>
                            <option value="11-20">5-14</option>
                            <option value="12-21">6-15</option>
                            <option value="13-22">7-16</option>
                            <option value="14-23">7-16</option>
                            <option value="15-24">2-11</option>
                            <option value="16-25">3-12</option>
                            <option value="17-26">4-13</option>
                            <option value="18-27">5-14</option>
                            <option value="19-28">6-15</option>
                            <option value="20-29">7-16</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form>
            </div>
        );
    }
}

export default OptionBMKG;