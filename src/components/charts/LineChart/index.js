import _ from "lodash";
import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class LineChart extends BaseChart {

  initChartOptions(options) {
    options = super.initChartOptions(options);

    var fontSize = 11;
    var labelFontSize = 10;
    var fontFamily = 'Roboto,sans-serif'

    options = _.merge(options, {
        legend: {
          horizontalAlign: "right",
          verticalAlign: "top",
          fontSize: fontSize,
          fontWeight: "normal",
          fontFamily: fontFamily
        },
        title: {
          text: this.chartInfo.name,
          fontSize: fontSize,
          fontWeight: 'bold',
          fontFamily: fontFamily,
          horizontalAlign: "left"
        },
        toolTip:{
          content:"{y}" ,
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontWeight: 'normal',
          animationEnabled: false,
          backgroundColor: "transparent",
          borderThickness: 0,
          shared: true,
          contentFormatter: function (e) {
            let tooltip = '<div style="font-size: 10px;">';
            if (e.entries) {
                for (var i = 0; i < e.entries.length; i++) {
                    if(e.entries[i].dataPoint) {
                        if(!e.entries[i].dataSeries.color){
                            e.entries[i].dataSeries.color = '#4661EE';
                        }
                        let div = '<div style="padding-right: 5px; display: inline-block; color:' + e.entries[i].dataSeries.color + '">' + e.entries[i].dataPoint.y.toFixed(2) + '</div>'
                        tooltip = tooltip.concat(div);
                    }
                }
            }
            return tooltip.concat('</div>');
          }
        },
        axisX: {
          valueFormatString: "HH:mm",
          interval: 5,
          intervalType: "minute",
          includeZero: false,
          labelFontSize: labelFontSize,
          labelFontFamily: fontFamily,
          lineThickness: 0.4,
          tickLength: 0,
          margin: 10,
        },
        axisY: [{
          gridThickness: 0.1,
          lineThickness: 0.4,
          tickLength: 0,
          labelFontSize: labelFontSize,
          labelFontFamily: fontFamily
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

    var reversedData = [...chartData];
    this.chart.updateData([
      reversedData.map(item => ({ x: item.time, y: item.price }))
    ])
  }

  appendData(data) {
      if (data){
          this.chart.appendData([
              data.map(item => ({ x: item.time, y: item.price }))
          ])
      }
  }

}