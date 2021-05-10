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
      toolTipContent: "<b>{name}</b>",
      dataPoints: this.dataPoints
    })
    return options;
  }
  setDataPoints() {

    let bubblesData = this.props.data.bubblesData;
    if (!bubblesData) bubblesData = [];

    this.chart.options.data[0].dataPoints = bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label}));

    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[1].dataPoints = chartData.map(item => ({ x: item.time, y: item.BU }));
    this.chart.options.data[2].dataPoints = chartData.map(item => ({ x: item.time, y: item.SD }));
  }
}