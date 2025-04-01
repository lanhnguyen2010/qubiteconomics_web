import _ from "lodash";
import moment from "moment-timezone";
import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class LineChart extends BaseChart {

  initChartOptions(options) {
    options = super.initChartOptions(options);
    console.log('options', options);

    var fontSize = 11;
    var labelFontSize = 10;
    var fontFamily = 'Roboto,sans-serif';

    const enableStripeLine = (e) => {
      let color = e.chart.data[e.dataSeriesIndex].color;
      if (!color) {
        color = e.chart.data[e.dataSeriesIndex].lineColor;
      }
      if (!color) {
        color = e.chart.data[e.dataSeriesIndex]._colorSet[e.dataSeriesIndex];
      }

      var item = e.chart.options.axisY2.stripLines[e.dataSeriesIndex];
      item.thickness = 0.7;
      item.labelFontColor = 'white';
      item.labelBackgroundColor = color;
    };
  
    const disableStripeLine = (e) => {
      var item = e.chart.options.axisY2.stripLines[e.dataSeriesIndex];
      item.thickness = 0;
      item.labelFontColor = 'transparent';
      item.labelBackgroundColor = 'none';
    };

    options = _.merge(options, {
      charts: [
        {
          legend: {
            horizontalAlign: "right",
            verticalAlign: "top",
            fontSize: fontSize,
            fontWeight: "normal",
            fontFamily: fontFamily,
            cursor: "pointer",
            itemclick: function (e) {
              const isScatter = e.chart.data[e.dataSeriesIndex].type === 'scatter'
              const isLineVisible = typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible;
              const isStripLinesVisible = e.chart.options.axisY2.stripLines && e.chart.options.axisY2.stripLines[e.dataSeriesIndex].thickness !== 0;
              if (isLineVisible && isStripLinesVisible) {
                if (!isScatter) {
                  disableStripeLine(e);
                } else {
                  e.dataSeries.visible = false;
                }
              } else if (isLineVisible && !isStripLinesVisible) {
                e.dataSeries.visible = false;
              } else {
                if (!isScatter) {
                  enableStripeLine(e);
                }
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          title: {
            text: this.chartInfo.name,
            fontSize: fontSize,
            fontWeight: 'bold',
            fontFamily: fontFamily,
            horizontalAlign: "left",
            padding: {
              left: 10,
              top: 5,
              bottom: 5
            }
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
                  if (e.entries.length) {
                    const time = moment(new Date(e.entries[0].dataPoint.x)).format("HH:mm:ss");
                    const divX = '<div style="padding-right: 5px; display: inline-block; color: black">' + time + '</div>';
                    tooltip = tooltip.concat(divX);
                  }
                  for (var i = 0; i < e.entries.length; i++) {
                    let entry = e.entries[i];
                    if (entry.dataPoint) {
                        if(entry.dataSeries.visible) {
                            if (!entry.dataSeries.color) {
                                entry.dataSeries.color = '#4661EE';
                            }
                            if (entry.dataPoint.y != null) {
                              let label = typeof entry.dataPoint.y == 'number' ? entry.dataPoint.y.toFixed(2) : entry.dataPoint.y;
                              if (entry.dataPoint.name){
                                  label = entry.dataPoint.name;
                              }
                              let div = '<div style="padding-right: 5px; display: inline-block; color:' + entry.dataSeries.color + '">' + label + '</div>'
                              tooltip = tooltip.concat(div);
                            }
                        }
                    }
                  }
              }
              return tooltip.concat('</div>');
            }
          },
          axisX: {
            interval: 30,
            intervalType: "minute",
            valueFormatString: "DD-MM HH:mm",
            labelFontSize: labelFontSize,
            labelFontFamily: fontFamily,
            lineThickness: 0.4,
            tickLength: 0,
            margin: 0
          },
          axisY: {
            gridThickness: 0,
            lineThickness: 0,
            tickLength: 0,
            labelFontSize: labelFontSize,
            labelFontFamily: fontFamily,
            stripLinesOptions: {
              labelPlacement: "outside",
              labelFontSize: 8,
              lineDashType: "dot",
              thickness: 0.7,
              opacity: 5,
              trimText : false
            },
            margin: 20
          },
          axisY2:{
            tickLength:0,
            labelFontSize: labelFontSize,
            gridThickness: 0,
            lineThickness: 0,
            labelFontFamily: fontFamily,
            margin: 20,
            stripLinesOptions: {
              labelPlacement: "outside",
              labelFontSize: 8,
              lineDashType: "dot",
              thickness: 0.7,
              opacity: 5,
              trimText : false,
              fixedWidth: 30
            }
          },
          data: [{
            axisYType: "secondary",
            hoveredMarkerSize: 0.5,
            markerSize: 0,
            type: "line",
            lineThickness: 1,
            showInLegend: true,
            legendText: this.chartInfo.legends[0].name,
            xValueType: "dateTime",
            yValueFormatString: "#,##0.00"
          }]
        }
      ]
    })
    return options;
  }

  mergeOptions(from, to) {
    return _.merge(from, to);
  }

  updateData(chartData) {
    if (!chartData || !chartData.length) return;
    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.price }))
    ])
  }

  appendData(data) {
    if (data && data.length) {
      this.chart.appendData([
        data.map(item => ({ x: item.time, y: item.price }))
      ])
    }
  }

}