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

    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })

    options.minMarginLeft = 30;
    options.minMarginRight = 50;

    return options;
  }

  updateData(chartData) {
    if (!chartData || !chartData.PS || !chartData.VNIndex30) return;

    this.chart.updateData([
      chartData.VNIndex30.map(item => ({ x: item.time, y: item.last })),
      chartData.PS.map(item => ({ x: item.time, y: item.price }))
      
    ])
  }

  appendData(chartData) {
    if (!chartData || !chartData.PS || !chartData.VNIndex30) return;

    this.chart.appendData([
      chartData.VNIndex30.map(item => ({ x: item.time, y: item.last })),
      chartData.PS.map(item => ({ x: item.time, y: item.price }))    
    ])
  }

}