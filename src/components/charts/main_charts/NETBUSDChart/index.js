import LineChart from "components/charts/LineChart";

export default class NETBUSDChart extends LineChart {

  initChartInfo() {
    return {
      key: "netBUSD",
      name: "NET BUSD",
      legends: [
        {
          key: "unwind",
          name: "Unwind",
          filter: false
        },
        {
          key: "netBUSD",
          name: "Net BUSD",
        },
        {
          key: "SMA",
          name: "SMA"
        }
      ]
    }
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);

    options.data[0].legendText = this.chartInfo.legends[1].name
    options.data[0].color = "green";

    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      axisYIndex: 0,
      legendText: this.chartInfo.legends[2].name,
      xValueType: "dateTime",
      color: "#6666ff",
      yValueFormatString: "#,##0.00"
    })
    options.data.unshift({
      type: "scatter",
      lineThickness: 1,
      showInLegend: true,
      axisYType: "secondary",
      legendText: this.chartInfo.legends[0].name,
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

  updateData() {
    let bubblesData = this.props.data.bubblesData;
    let chartData = this.props.data.chartData;
    if (!bubblesData || !bubblesData.length || !chartData || !chartData.length) return;

    this.chart.updateData([
      bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius / 2, name: item.label})),
      chartData.map(item => ({ x: item.time, y: item.NetBUSD })),
      chartData.map(item => ({ x: item.time, y: item.SMA }))
    ])
  }

  appendData(data) {
    if (!data) return;
    let bubblesData = data.bubblesData;
    let chartData = data.chartData;
    if (!bubblesData || !bubblesData.length || !chartData || !chartData.length) return;

    this.chart.appendData([
      bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius / 2, name: item.label})),
      chartData.map(item => ({ x: item.time, y: item.NetBUSD })),
      chartData.map(item => ({ x: item.time, y: item.SMA }))
    ])
  }
}