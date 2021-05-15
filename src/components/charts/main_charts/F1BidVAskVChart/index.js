import LineChart from "components/charts/LineChart";

export default class F1BidVAskVChart extends LineChart {

  getChartName() {
    return "";
  }

  getChartOptions(){
    let options = super.getChartOptions();
    options.data[0].showInLegend = true;
    options.data[0].legendText = "BidV";

    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: "AskV",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: "NetBA",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: "SMA",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })

    return options;
  }
  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.dataPoints[0] = chartData.map(item => ({ x: item.time, y: item.BidV }));
    this.dataPoints[1] = chartData.map(item => ({ x: item.time, y: item.AskV}));
    this.dataPoints[2] = chartData.map(item => ({ x: item.time, y: item.NetBA }));
    this.dataPoints[3] = chartData.map(item => ({ x: item.time, y: item.SMA }));
  }
}