import LineChart from "components/charts/LineChart";
export default class BuyupSelldownChart extends LineChart {

  initChartInfo() {
    return {
      key: "buyUp",
      name: "Buyup, Selldown",
      legends: [
        {
          key: "Arbit",
          name: "Arbit",
          filter: false
        },
        {
          key: "BU",
          name: "BU"
        },
        {
          key: "SD",
          name: "SD"
        }
      ]
    }
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);

    this.getChartOptions(options).data[0].legendText = this.chartInfo.legends[1].name;
    this.getChartOptions(options).data.unshift({
      type: "scatter",
      axisYType: "primary",
      axisYIndex: 0,
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[0].name,
      fillOpacity: .5,
      xValueType: "dateTime",
      color: "#6666ff",
      yValueFormatString: "#,##0.00",
      legendMarkerType: "circle",
    })

    options.minMarginLeft = 30;
    options.minMarginRight = 50;

    return options;
  }

  updateData(data) {
    if (!data) return;

    let bubblesData = data.bubblesData;
    let chartData = data.chartData;
    if (!bubblesData || !bubblesData.length || !chartData || !chartData.length) return;

    this.chart.updateData([
      bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/5, name: item.label})),
    ])
  }

  appendData(data) {
    if (data && data.bubblesData && data.chartData) {
      let date = data.bubblesData[0].time;
      var startTime =  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 30, 0);
      var endTime =  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0);

      this.chart.appendData([
        data.bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label})),
        data.chartData.map(item => ({ x: item.time, y: item.BU })).filter(x => x.x > startTime && x.x < endTime),
        data.chartData.map(item => ({ x: item.time, y: item.SD })).filter(x => x.x > startTime && x.x < endTime)
      ])
    }
  }
}