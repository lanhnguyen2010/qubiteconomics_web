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
    options.data.unshift({
      type: "bubble",
      lineThickness: 1,
      showInLegend: true,
      axisYType: "secondary",
      legendText: "unwind",
      fillOpacity: .7,
      axisYIndex: 1,
      xValueType: "dateTime",
      color: "#6666ff",
      yValueFormatString: "#,##0.00",
      legendMarkerType: "circle",
      toolTipContent: "<b>{name}</b>",
      dataPoints: this.dataPoints
    })
    options.axisY.unshift({
      gridThickness: 0.2,
      includeZero: false
    });
    return options;
  }
  setDataPoints() {
    let bubblesData = this.props.data.bubblesData;
    if (!bubblesData) bubblesData = [];

    this.chart.options.data[0].dataPoints = bubblesData.map(item => ({ x: item.time, y: item.y, name: item.label}));
    //this.chart.options.data[0].dataPoints = bubblesData.map(item => ({ x: item.time, y: item.y, z: item.radius, name: item.label}));

    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[1].dataPoints = chartData.map(item => ({ x: item.time, y: item.NetBUSD }));
    this.chart.options.data[2].dataPoints = chartData.map(item => ({ x: item.time, y: item.SMA }));
    console.log("NETBUSDChart", this.chart.options.data)
  }
}