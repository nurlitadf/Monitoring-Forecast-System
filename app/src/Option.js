import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './styles/Option.css';

import onSubmit from './methods';

const Option = () => {
    // const handleSubmit = event => {
    //     onSubmit(event.target.)
    //   };

    return (
        <div class="form-style">
            <Form >
                <Form.Group>
                    <Form.Label>Model</Form.Label>
                    <Form.Control as="select">
                        <option value="CFSv2">CFSv2</option>
                        <option value="CMC1">CMC1</option>
                        <option value="CMC2">CMC2</option>
                        <option value="GFDL">GFDL</option>
                        <option value="GFDL-FLOR">GFDL-FLOR</option>
                        <option value="NASA">NASA</option>
                        <option value="NCAR-CCSM4">NCAR-CCSM4</option>
                        <option value="NMME">NMME</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control as="select">
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Month</Form.Label>
                    <Form.Control as="select">
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
            </Form>

            <Button variant="primary" type="submit">
                Search
            </Button>
        </div>
    );
    }

export default Option;