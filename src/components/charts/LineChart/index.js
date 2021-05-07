import BaseChart from "components/charts/BaseChart";

import './styles.css';
export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);
  }

  buildChart() {
  }

  getChartName() {
    return "Chart Name";
  }

  getChartOptions() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: this.getChartName()
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Price",
        crosshair: {
          enabled: true
        }
      },
      data: [{
        type: "line",
        xValueFormatString: "HH:mm:ss",
        yValueFormatString: "#,##0.00",
        dataPoints: this.dataPoints,
        interval: 5
      }]
    }
    return options;
  }

  setChartData() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    chartData.map(item => this.dataPoints.push({ x: item.time, y: item.price }));
    this.chart.render();
  }
}