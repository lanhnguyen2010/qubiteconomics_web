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

    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: this.chartInfo.legends[2].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    options.data.push({
      type: "line",
      showInLegend: true,
      lineThickness: 1,
      legendText: this.chartInfo.legends[3].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    return options;
  }

  updateData() {
    let chartData = this.props.data.chartData;
    if (!chartData || !chartData.length) return;

    var revesedData = [...chartData].reverse();
    this.chart.updateData([
      revesedData.map(item => ({ x: item.time, y: item.BidV })),
      revesedData.map(item => ({ x: item.time, y: item.AskV })),
      revesedData.map(item => ({ x: item.time, y: item.NetBA })),
      revesedData.map(item => ({ x: item.time, y: item.SMA }))
    ])
  }
}