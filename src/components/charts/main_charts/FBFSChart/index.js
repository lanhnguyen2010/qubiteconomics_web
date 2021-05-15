import LineChart from "components/charts/LineChart";

export default class FBFSChart extends LineChart {

  initChartInfo() {
    return {
      key: "fbfs",
      name: "FB FS",
      legends: [
        {
          key: "FB",
          name: "FB"
        },
        {
          key: "FS",
          name: "FS"
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
      revesedData.map(item => ({ x: item.time, y: item.foreignerBuyVolume })),
      revesedData.map(item => ({ x: item.time, y: item.foreignerSellVolume }))
    ])
  }
}