import LineChart from "components/charts/LineChart";

export default class NetBSChart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartLegendText(){
    return "NetBS";
  }

  getChartName() {
    return "";
  }

  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.NetBS }));
  }
}