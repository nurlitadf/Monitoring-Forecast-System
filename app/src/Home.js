import React, { Component } from 'react';

import Maps from './Maps';
import Option from './Option';

import './styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleMapChange("CFSv2", "01", "2019");
  }

  handleMapChange(model, month, year) {
    fetch(`http://localhost:5000/api/data?model=${model}&year=${year}&month=${month}`)
      .then(res => {
        res.json().then(res => {
          this.setState({data: res})
        });
      });
  }

  render() {
    let maps;
    if(this.state.data.length)
      maps = <Maps data = {this.state.data} />
    else
      maps = <h3 className="unavailable">Data Tidak Tersedia</h3>

    return (
      <React.Fragment>
        <h2 className="title">Indonesia Monitoring Forecast System</h2>
        <div>
          <Option 
            handleMapChange = {this.handleMapChange}
          />
          {maps}
        </div>
      </React.Fragment>
    );
  }
} 
export default Home;