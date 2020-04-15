import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

import './styles/Option.css';

class Option extends Component {
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
                        <Form.Label>Model</Form.Label>
                        <Form.Control as="select" onChange={this.handleModelChange}>
                            <option value="CFSv2">CFSv2</option>
                            <option value="CMC1">CMC1</option>
                            <option value="CMC2">CMC2</option>
                            <option value="GFDL">GFDL</option>
                            <option value="GFDL-FLOR">GFDL-FLOR</option>
                            <option value="NASA">NASA</option>
                            <option value="NCAR-CCSM4">NCAR-CCSM4</option>
                            <option value="NMME">NMME</option>
                            <option value="NMME-Weighted">NMME-Weighted</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" onChange={this.handleTypeChange}>
                            <option value="precip">Precipitation</option>
                            <option value="tmp2m">Air Temperature</option>
                            <option value="sst">SST</option>
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control as="select" onChange={this.handleYearChange}>
                            <option value={year-1}>{year-1}</option>
                            <option value={year}>{year}</option>
                            <option value={year+1}>{year+1}</option>
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Month</Form.Label>
                        <Form.Control as="select" onChange={this.handleMonthChange}>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
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