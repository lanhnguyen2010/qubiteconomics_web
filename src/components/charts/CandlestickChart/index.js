import _ from "lodash";
import moment from "moment-timezone";
import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class CandlestickChart extends BaseChart {

  initChartOptions(options) {
    options = {
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY2:{
            tickLength:0,
            gridThickness: 0,
            lineThickness: 0,
            margin: 20
          },
          data: [{
            axisYType: "secondary",
            hoveredMarkerSize: 0.5,
            markerSize: 0,
            type: "candlestick",
            lineThickness: 1,
            showInLegend: false,
            xValueType: "dateTime",
            name: "Price (in USD)",
            yValueFormatString: "$#,###.##",
            risingColor: "rgb(14, 203, 129)",
            fallingColor: "#f6465d",
            dataPointWidth: 2,
          },
          {
            axisYType: "secondary",
            name: "Min-Max",
            type: "rangeSplineArea",
            xValueType: "dateTime",
            yValueFormatString: "#$#,###.##",
            fillOpacity: 0.1,
            color: 'blue',
            lineThickness: 0.1,
          }
          ,
          {
            axisYType: "secondary",
            name: "AVG",
            type: "spline",
            xValueFormatString: "YYYY",
            yValueFormatString: "#,###.##°C",
          }
        ]
          
        },
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY2:{
            tickLength:0,
            gridThickness: 0,
            lineThickness: 0,
            margin: 20
          },
          
          height: 100,
          toolTip: {
            shared: true
          },
          legend: {
            verticalAlign: "top"
          },
          data: [{
            showInLegend: false,
            name: "Volume",
            yValueFormatString: "$#,###.##",
            color: "rgb(14, 203, 129)",
            axisYType: "secondary",
          }]
        }
      ],
      dataPointWidth: 2,
      navigator: {
        data: [{          
        }],
        slider: {
          minimum: new Date(2018, 4, 1),
          maximum: new Date(2018, 8, 1)
        }
      }
    }
    return options;
  }

  mergeOptions(from, to) {
    return _.merge(from, to);
  }

  updateData(chartData) {
    if (!chartData || !chartData.length) return;
    var dataPoints = chartData.map(item => ({ x: new Date(item.date), y: [Number(item.open), Number(item.high), Number(item.low), Number(item.close)] }));
    var dataPointsVolume = chartData.map(item => ({ x: new Date(item.date), y: Number(item.volume_ltc)}));
    var dataPoints2 = chartData.map(item => ({ x: new Date(item.date), y: Number(item.close)}));
    this.chart.getChartOptions().data[0].dataPoints = dataPoints;

    //Band min max
    var dataPointsHighLow = chartData.map(item => ({ x: new Date(item.date), y: [Number(item.low) - 20, Number(item.high) + 20]  }));
    this.chart.getChartOptions().data[1].dataPoints = dataPointsHighLow;

    //AVG
    var dataPointsAVG = chartData.map(item => ({ x: new Date(item.date), y: (Number(item.low)+ Number(item.high))/2 }));
    this.chart.getChartOptions().data[2].dataPoints = dataPointsAVG;


    this.getFullChartsOptions().navigator.data[0].dataPoints = dataPoints2;
    this.getFullChartsOptions().charts[1].data[0].dataPoints = dataPointsVolume;
    this.chart.ignorePrerender = true;
    this.changeBorderColor();
    this.chart.render();
  }

  changeBorderColor(){
    var dataSeries;
    for( var i = 0; i < this.chart.getChartOptions().data.length; i++){
        dataSeries = this.chart.getChartOptions().data[i];
        for(var j = 0; j < dataSeries.dataPoints.length; j++){
          dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j].y[0] <= dataSeries.dataPoints[j].y[3]) ? (dataSeries.risingColor ? dataSeries.risingColor : dataSeries.color) : (dataSeries.fallingColor ? dataSeries.fallingColor : dataSeries.color);
        }
    }
  }

  appendData(data) {

  }

}