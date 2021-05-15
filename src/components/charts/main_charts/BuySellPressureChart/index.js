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

    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[1].name,
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
      revesedData.map(item => ({ x: item.time, y: item.buyPressure })),
      revesedData.map(item => ({ x: item.time, y: item.sellPressure }))
    ])
  }
}