import LineChart from "components/charts/LineChart";

export default class NETBUSDChart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "NET BUSD";
  }

  getChartLegendText() {
    return "Net BUSD";
  }

  getChartOptions(){
    let options = super.getChartOptions();
    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "SMA",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00",
      dataPoints: this.dataPoints
    })
    return options;
  }
  setDataPoints() {
    let chartData = this.props.data.chartData;
    console.log("NETBUSDChart", this.chart.options.data)

    if (!chartData) chartData = [];
    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.NetBUSD }));
    this.chart.options.data[1].dataPoints = chartData.map(item => ({ x: item.time, y: item.SMA }));
    console.log("NETBUSDChart", this.chart.options.data)
  }
}