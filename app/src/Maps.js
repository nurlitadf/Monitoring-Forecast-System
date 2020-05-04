import React, { Component, Fragment } from 'react';
import Highcharts from "highcharts";
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/countries/id/id-all.geo.json";

import './styles/Maps.css';

highchartsMap(Highcharts); // Initialize the map module

if (typeof window !== "undefined") {
  window.proj4 = window.proj4 || proj4;
}

class Maps extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
    };

    this.getMapOptions = this.getMapOptions.bind(this);

    // console.log(this.state.data);
  }

  componentDidMount() {
    Highcharts.charts.forEach((chart) => {
      if(chart !== undefined) 
        chart.reflow();
    });
  }

  getMapOptions() {
    // console.log(this.props.data);
    return {
      chart: {
        map: 'countries/id/id-all'
      },
    
      title: {
          text: 'Indonesian Map'
      },
    
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
    
      colorAxis: {
        min: this.props.range.min,
        max: this.props.range.max,
        stops: [[0, '#1800FF'], [0.5, '#FFFFFF'], [0.75, '#FFFF00'], [1, '#FF0000']],
      },

      plotOptions: {
        mappoint: {
            opacity: 0.4,
        }
      },
    
      series: [
        {
          mapData: mapDataIE,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          },
          states: {
            hover: {
                color: '#BADA55'
            }
          },
          borderColor: 'black',
          borderWidth: 1,
        },
        {
          type: 'mappoint',
          colorKey: 'value',
          mapData: mapDataIE,
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}, Val: {point.value}'
          },
          marker: {
            radius:10,
          },
          className: "point",
          // opacity:0.3,
          // enableMouseTracking: false,
          // dataLabels: {
          //   enabled: true,
          //   format: '{point.value}'
          // },
          // data:[{
          //   value: 10,
          //   lat: -0.789275,
          //   lon: 113.921326},    
          // ],
          data: this.props.data,
          colorAxis: 0,
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <HighchartsReact
          constructorType={"mapChart"}
          highcharts={Highcharts}
          options={this.getMapOptions()}
        />
      </Fragment>
    );
  }
}

export default Maps;
