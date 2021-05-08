import BaseChart from "components/charts/BaseChart";
export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);
  }

  buildChart() {
  }

  getChartName() {
    return "";
  }

  getChartOptions() {
    const options = {
      theme: "light1",
      animationEnabled: true,
      title: {
        text: this.getChartName()
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        valueFormatString: "HH:mm:ss",
        interval: 1,
        intervalType: "hour",
        includeZero: false,

        tickLength: 2,
        tickColor: "red",

        scaleBreaks: {
          customBreaks: [{
            lineThickness: 0,
            collapsibleThreshold: "0%",
            spacing: 0,
            startValue: new Date(2021, 1, 1, 11, 30, 0),
            endValue: new Date(2021, 1, 1, 13, 0, 0)
          }]
        }
      },
      axisY: {
        crosshair: {
          enabled: true
        },
        includeZero: false
      },
      data: [{
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "#,##0.00",
        dataPoints: this.dataPoints
      }],
      navigator: {
        backgroundColor: "#D3D3D3"
      }
    }
    return options;
  }

  setChartData() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.price }));
    this.chart.render();
  }
}