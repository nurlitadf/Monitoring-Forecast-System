import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

import './styles/Option.css';

class OptionBMKG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: "CFSv2",
            type: "precip",
            month: "01",
            year: moment().year() - 1,
        }

        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleModelChange(event) {
        this.setState({model: event.target.value});
    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
    }

    handleMonthChange(event) {
        this.setState({month: event.target.value});
    }

    handleYearChange(event) {
        this.setState({year: event.target.value});
    }

    handleSubmit(event) {
        const { model, type, month, year } = this.state;
        // console.log("test");
        this.props.handleMapChange(model, type, month, year);
        event.preventDefault();
    }

    render() {
        const year = moment().year();
        return (
            <div className="form-style">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Initial Forecast Item</Form.Label>
                        <Form.Control as="select" onChange={this.handleModelChange}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Lead Time</Form.Label>
                        <Form.Control as="select" onChange={this.handleTypeChange}>
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

export default Option;