import LineChart from "components/charts/LineChart";

export default class BuyupSelldownChart extends LineChart {

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
      yValueFormatString: "#,##0.00"
    });
    options.data.unshift({
      type: "scatter",
      lineThickness: 1,
      showInLegend: true,
      axisYType: "secondary",
      legendText: "Arbit",
      fillOpacity: .7,
      axisYIndex: 1,
      xValueType: "dateTime",
      color: "#6666ff",
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

    this.dataPoints[1] = chartData.map(item => ({ x: item.time, y: item.BU }));
    this.dataPoints[2] = chartData.map(item => ({ x: item.time, y: item.SD }));
  }
}