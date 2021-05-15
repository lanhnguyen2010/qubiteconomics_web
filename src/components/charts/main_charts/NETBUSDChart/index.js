import LineChart from "components/charts/LineChart";

export default class NETBUSDChart extends LineChart {

  getChartName() {
    return "NET BUSD";
  }

  getChartLegendText() {
    return "Net BUSD";
  }

  getChartOptions(){
    let options = super.getChartOptions();
    options.data[0].color = "green";
    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      axisYIndex: 0,
      legendText: "SMA",
      xValueType: "dateTime",
      color: "#6666ff",
      yValueFormatString: "#,##0.00"
    })
    options.data.unshift({
      type: "scatter",
      lineThickness: 1,
      showInLegend: true,
      axisYType: "secondary",
      legendText: "unwind",
      fillOpacity: .7,
      axisYIndex: 1,
      xValueType: "dateTime",
      color: "#ff6666",
      yValueFormatString: "#,##0.00",
      legendMarkerType: "circle",
      toolTipContent: "<b>{name}</b>"
    })
    return options;
  }

  setDataPoints() {
    let bubblesData = this.props.data.bubblesData;
    if (!bubblesData) bubblesData = [];

    this.dataPoints[0] = bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label}));
    this.dataPointsConfigs[0] = { filter: false };

    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.dataPoints[1] = chartData.map(item => ({ x: item.time, y: item.NetBUSD }));
    this.dataPoints[2] = chartData.map(item => ({ x: item.time, y: item.SMA }));
  }
}