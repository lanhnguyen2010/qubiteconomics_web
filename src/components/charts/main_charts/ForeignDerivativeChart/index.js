import LineChart from "components/charts/LineChart";

export default class ForeignDerivativeChart extends LineChart {

  initChartInfo() {
    return {
      key: "foreignDerivative",
      name: "Foreign Derivative",
      legends: [
        {
          key: "FB",
          name: "FB Foreign"
        },
        {
          key: "FS",
          name: "FS Foreign"
        },
        {
          key: "NetForeign",
          name: "Net Foreign"
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

  // initChartOptions(options) {
  //   options = super.initChartOptions(options);
  //   options.minMarginRight = 50;
  //   return options;
  // }

  updateData(chartData) {
    if (!chartData) return;
    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.fb })),
      chartData.map(item => ({ x: item.time, y: item.fs })),
      chartData.map(item => ({ x: item.time, y: item.net }))
    ])
  }

  appendData(chartData) {
    if (!chartData) return;
    this.chart.appendData([
      chartData.map(item => ({ x: item.time, y: item.fb })),
      chartData.map(item => ({ x: item.time, y: item.fs })),
      chartData.map(item => ({ x: item.time, y: item.net }))
    ])
  }

}