import LineChart from "components/charts/LineChart";

export default class BuySellPressureChart extends LineChart {

  initChartInfo() {
    return {
      key: "buySell",
      name: "BuySell Pressure",
      legends: [
        {
          key: "buyPressure",
          name: "Buy Pressure"
        },
        {
          key: "sellPressure",
          name: "Sell Pressure"
        }
      ]
    }
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);

    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      axisYIndex: 1,
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })

    options.minMarginRight = 50;

    return options;
  }

  updateData(chartData) {
    // let chartData = this.props.data.chartData;
    if (!chartData || !chartData.length) return;

    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.buyPressure })),
      chartData.map(item => ({ x: item.time, y: item.sellPressure }))
    ])
  }

  appendData(data) {
    if (!data || !data.length) return;

    this.chart.appendData([
      data.map(item => ({ x: item.time, y: item.buyPressure })),
      data.map(item => ({ x: item.time, y: item.sellPressure }))
    ])
  }
}