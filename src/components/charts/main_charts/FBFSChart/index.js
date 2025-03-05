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
        },
        {
          key: "NET",
          name: "NET"
        }
      ]
    }
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);

    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[2].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })
    return options;
  }

  updateData(chartData) {
    if (!chartData || !chartData.FB || !chartData.FS) return;
    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.fbVolume })),
      chartData.map(item => ({ x: item.time, y: item.fsVolume })),
      chartData.map(item => ({ x: item.time, y: item.net }))
    ])
  }

  appendData(data) {
    if (!data || !data.FB || !data.FS) return;
    this.chart.appendData([
      data.FB.map(item => ({ x: item.time, y: item.volume })),
      data.FS.map(item => ({ x: item.time, y: item.volume }))
    ])
  }
}