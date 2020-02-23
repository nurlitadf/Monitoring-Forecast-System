import React, { Component } from 'react';

import Maps from './Maps';
import Option from './Option';

import './styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit;
    this.state = {
      data: "",
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2 class="title">Indonesia Monitoring Forecast System</h2>
        <React.Fragment>
          <Option />
          <Maps />
        </React.Fragment>
      </React.Fragment>
    );
  }
} 
export default Home;