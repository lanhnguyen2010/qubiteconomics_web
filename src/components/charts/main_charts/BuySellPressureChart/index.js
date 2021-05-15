import LineChart from "components/charts/LineChart";

export default class BuySellPressureChart extends LineChart {

  getChartName() {
    return "BuySell Pressure";
  }

  getChartLegendText() {
    return "buy Pressure";
  }

  getChartOptions(){
    let options = super.getChartOptions();
    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "sell Pressure",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    return options;
  }

  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.dataPoints[0] = chartData.map(item => ({ x: item.time, y: item.buyPressure }));
    this.dataPoints[1] = chartData.map(item => ({ x: item.time, y: item.sellPressure }));
  }
}