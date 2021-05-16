import _ from "lodash";
import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class LineChart extends BaseChart {

  initChartOptions(options) {
    options = super.initChartOptions(options);

    var fontSize = 11;
    var labelFontSize = 10;

    options = _.merge(options, {
        legend: {
          horizontalAlign: "right",
          verticalAlign: "top",
          fontSize: fontSize,
          fontWeight: "normal"
        },
        title: {
          text: this.chartInfo.name,
          fontSize: fontSize,
          fontFamily:'Oswald',
          horizontalAlign: "left"
        },
        toolTip:{
          content:"{y}" ,
          fontSize: fontSize,
          fontWeight: 'normal',
          animationEnabled: false,
          backgroundColor: "transparent",
          borderThickness: 0,
          shared: true
        },
        axisX: {
          valueFormatString: "HH:mm",
          interval: 5,
          intervalType: "minute",
          includeZero: false,
          labelFontSize: labelFontSize,
          lineThickness: 0.4,
          tickLength: 0,
          margin: 10,
        },
        axisY: [{
          gridThickness: 0.1,
          lineThickness: 0.4,
          tickLength: 0,
          labelFontSize: labelFontSize
        }],
        axisY2:{
          tickLength:0,
          labelFontSize: labelFontSize,
          gridThickness: 0.1,
          lineThickness: 0.4,
        },
        data: [{
          hoveredMarkerSize: 0.5,
          markerSize: 0,
          type: "line",
          lineThickness: 1,
          showInLegend: true,
          legendText: this.chartInfo.legends[0].name,
          xValueType: "dateTime",
          yValueFormatString: "#,##0.00"
        }]
    })
    return options;
  }

  updateData() {
    let chartData = this.props.data.chartData;
    if (!chartData || !chartData.length) return;

    var reversedData = [...chartData].reverse();

    this.chart.updateData([
      reversedData.map(item => ({ x: item.time, y: item.price }))
    ])
  }

}