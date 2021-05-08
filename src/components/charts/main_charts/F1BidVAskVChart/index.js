import LineChart from "components/charts/LineChart";

export default class F1BidVAskVChart extends LineChart {

  constructor(props) {
    super(props);
  }

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
      yValueFormatString: "#,##0.00",
      dataPoints: this.dataPoints
    })
    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: "NetBA",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00",
      dataPoints: this.dataPoints
    })
    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: "SMA",
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00",
      dataPoints: this.dataPoints
    })

    return options;
  }
  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.BidV }));
    this.chart.options.data[1].dataPoints = chartData.map(item => ({ x: item.time, y: item.AskV}));
    this.chart.options.data[2].dataPoints = chartData.map(item => ({ x: item.time, y: item.NetBA }));
    this.chart.options.data[3].dataPoints = chartData.map(item => ({ x: item.time, y: item.SMA }));
    console.log("F1 BidV, AskV", chartData)
  }
}