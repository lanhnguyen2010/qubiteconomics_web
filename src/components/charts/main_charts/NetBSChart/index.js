import LineChart from "components/charts/LineChart";

export default class NetBSChart extends LineChart {


  getChartLegendText(){
    return "NetBS";
  }

  getChartName() {
    return "";
  }

  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.dataPoints[0] = chartData.map(item => ({ x: item.time, y: item.NetBS }));
  }
}