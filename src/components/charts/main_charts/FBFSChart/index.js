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

    this.getChartOptions(options).data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    return options;
  }

  updateData(chartData) {
    if (!chartData || !chartData.length) return;

    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.foreignerBuyVolume })),
      chartData.map(item => ({ x: item.time, y: item.foreignerSellVolume }))
    ])
  }

  appendData(data) {
    if (!data || !data.length) return;
    this.chart.appendData([
      data.map(item => ({ x: item.time, y: item.foreignerBuyVolume })),
      data.map(item => ({ x: item.time, y: item.foreignerSellVolume }))
    ])
  }
}