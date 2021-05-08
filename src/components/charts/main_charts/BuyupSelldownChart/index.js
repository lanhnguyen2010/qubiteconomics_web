import LineChart from "components/charts/LineChart";

export default class BuyupSelldownChart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "Buyup, Selldown";
  }

  getChartLegendText() {
    return "BU";
  }

  getChartOptions(){
    let options = super.getChartOptions();
    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "SD",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00",
      dataPoints: this.dataPoints
    })
    return options;
  }
  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.BU }));
    this.chart.options.data[1].dataPoints = chartData.map(item => ({ x: item.time, y: item.SD }));
    console.log("BuyupSelldownChart", this.chart.options.data)
  }
}