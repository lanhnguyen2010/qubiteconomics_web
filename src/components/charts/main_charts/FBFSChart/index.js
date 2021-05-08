import LineChart from "components/charts/LineChart";

export default class FBFSChart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "BuySell Pressure";
  }
  getChartOptions(){
    let options = super.getChartOptions();
    options.data.push({
      type: "line",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00",
      dataPoints: this.dataPoints
    })
    return options;
  }
  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.foreignerBuyVolume }));
    this.chart.options.data[1].dataPoints = chartData.map(item => ({ x: item.time, y: item.foreignerSellVolume }));
  }
}