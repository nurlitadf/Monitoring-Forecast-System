import React, { Component } from 'react';
import axios from 'axios';

import Maps from './Maps';
import Option from './Option';
import OptionBMKG from './OptionBMKG';

import './styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      model: "CFSv2",
      type: "precip",
      month: "01",
      year: "2019",
      dataBMKG: [],
    }
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleMapChange("CFSv2","precip", "01", "2019");
  }

  handleMapChange(model, type, month, year) {
    axios.get(`${process.env.REACT_APP_API_URL}api/data?model=${model}&type=${type}&year=${year}&month=${month}`)
      .then(res => {
          // console.log(res);
          this.setState({data: res, model, type, month, year})
      });
  }

  handleDataChange(initialTime, leadTime) {
    axios.get(`${process.env.REACT_APP_API_URL}api/bmkg-data?initialTime=${initialTime}&leadTime=${leadTime}`)
      .then(res => {
        // console.log(res);
        res.data.forEach((value) => {
          this.setState({dataBMKG: value['link']})
        });
      });
  }

  render() {
    let maps;
    if(this.state.data.data !== undefined && this.state.data.data.length)
      maps = <Maps data = {this.state.data.data} />
    else
      maps = <h3 className="unavailable">Data Tidak Tersedia</h3>

      // console.log(this.state.data.data.length);
    // console.log(this.state.data.data);

    const {model, type, month, year} = this.state;

    return (
      <div>
        <h2 className="title">Indonesia Drought Monitoring Forecast System</h2>
        <div style={{display: 'flex'}}>
          <div style={{width: '50%'}}>
            <h3 className="title2">Data NMME</h3>
            <Option 
              handleMapChange = {this.handleMapChange}
            />
            <h6 style={{paddingLeft: '20%', paddingTop: '20px'}}>Data: {model} - {type} - {month} - {year}</h6>
            {maps}
          </div>
          <div style={{width: '50%'}}>
            <h3 className="title2">Data BMKG</h3>
            <OptionBMKG 
              handleDataChange = {this.handleDataChange}
            />
            <img style={{paddingLeft: '20%'}} src={this.state.dataBMKG} alt="Data dari BMKG"></img>
          </div>
        </div>
      </div>
    );
  }
} 
export default Home;