import LineChart from "components/charts/LineChart";

export default class F1BidVAskVChart extends LineChart {

  initChartInfo() {
    return {
      key: "F1BidVAskV",
      name: "F1 BidV AskV, Selldown",
      legends: [
        {
          key: "BidV",
          name: "BidV"
        },
        {
          key: "AskV",
          name: "AskV"
        },
        {
          key: "NetBA",
          name: "NetBA"
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

    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      axisYIndex: 0,
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: this.chartInfo.legends[2].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: this.chartInfo.legends[3].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    return options;
  }

  updateData(chartData) {
    if (!chartData || !chartData.length) return;

    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.BidV })),
      chartData.map(item => ({ x: item.time, y: item.AskV })),
      chartData.map(item => ({ x: item.time, y: item.NetBA })),
      chartData.map(item => ({ x: item.time, y: item.SMA }))
    ])
  }
  appendData(data) {
    if (!data || !data.length) return;

    this.chart.appendData([
      data.map(item => ({ x: item.time, y: item.BidV })),
      data.map(item => ({ x: item.time, y: item.AskV })),
      data.map(item => ({ x: item.time, y: item.NetBA })),
      data.map(item => ({ x: item.time, y: item.SMA }))
    ])
  }
}