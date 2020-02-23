import React, { Component, Fragment } from 'react';
import Highcharts from "highcharts";
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/countries/id/id-all.geo.json";

highchartsMap(Highcharts); // Initialize the map module

if (typeof window !== "undefined") {
  window.proj4 = window.proj4 || proj4;
}

const mapOptions = {
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
    min: 0,
    max: 100,
    stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
    // labels: {
    //     format: '{point.value}'
    // }
  },

  series: [
    {
      data: [{
        lat: -0.789275,
        lon: 113.921326,
        value: 10},    
    ],
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
    },
    {
      type: 'mappoint',
      colorKey: 'value',
      mapData: mapDataIE,
      tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}'
      },
      dataLabels: {
        enabled: true,
        format: '{point.value}'
    },
      data:[{
        value: 10,
        lat: -0.789275,
        lon: 113.921326},    
      ],
      colorAxis: 0,
    }
  ]
};

class Maps extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      mapOptions: mapOptions,
      flag: true,
    };
  }

  render() {
    return (
      <Fragment>
        <HighchartsReact
          constructorType={"mapChart"}
          highcharts={Highcharts}
          options={this.state.mapOptions}
        />
      </Fragment>
    );
  }
}

export default Maps;
