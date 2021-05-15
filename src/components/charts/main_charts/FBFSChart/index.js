import LineChart from "components/charts/LineChart";

export default class FBFSChart extends LineChart {

  getChartName() {
    return "";
  }

  getChartLegendText() {
    return "FB";
  }

  getChartOptions(){
    let options = super.getChartOptions();
    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "FS",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    return options;
  }

  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.dataPoints[0] = chartData.map(item => ({ x: item.time, y: item.foreignerBuyVolume }));
    this.dataPoints[1] = chartData.map(item => ({ x: item.time, y: item.foreignerSellVolume }));
  }
}