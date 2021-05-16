import LineChart from "components/charts/LineChart";

export default class VN30DerivativeChart extends LineChart {

  initChartInfo() {
    return {
      key: "vn30index",
      name: "VN30Index PS",
      legends: [
        {
          key: "CS",
          name: "Co so"
        },
        {
          key: "PS",
          name: "Phai sinh"
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
    let chartData = this.props.data;
    if (!chartData || !chartData.PS || !chartData.VNIndex30) return;

    var data = [
      chartData.PS.map(item => ({ x: item.time, y: item.price })),
      chartData.VNIndex30.map(item => ({ x: item.time, y: item.last }))
    ]

    this.chart.updateData(data)
  }

}