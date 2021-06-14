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

    this.getChartOptions(options).data.push({
      axisY2Type: "secondary",
      axisYType: "secondary",
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[2].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    });
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
    return options;
  }

  updateData(data) {
    if (!data) return;

    let bubblesData = data.bubblesData;
    let chartData = data.chartData;
    if (!bubblesData || !bubblesData.length || !chartData || !chartData.length) return;

    var startTime =  new Date(2021, 1, 1, 9, 30, 0);
    var endTime =  new Date(2021, 1, 1, 14, 30, 0);
    var maxBU = Math.max.apply(Math, chartData.filter(x => x.time <= startTime).map(item => item.BU));
    var maxSD = Math.max.apply(Math, chartData.filter(x => x.time <= startTime).map(item => item.SD));
    this.chart.updateData([
      bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label})),
      chartData.map(item => ({ x: item.time, y: item.BU })).filter(x => x.x > startTime && x.x < endTime),
      chartData.map(item => ({ x: item.time, y: item.SD })).filter(x => x.x > startTime && x.x < endTime )
    ])
    this.chart.chart.options.charts[0].axisX.stripLines=[{
      value: startTime,
      label: maxBU.toFixed(2) + ", " + maxSD.toFixed(2)
    }]
  }

  appendData(data) {
    if (data && data.bubblesData && data.chartData){
      var startTime =  new Date(2021, 1, 1, 9, 30, 0);
      var endTime =  new Date(2021, 1, 1, 14, 30, 0);

      this.chart.appendData([
        data.bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label})),
        data.chartData.map(item => ({ x: item.time, y: item.BU })).filter(x => x.x > startTime && x.x < endTime),
        data.chartData.map(item => ({ x: item.time, y: item.SD })).filter(x => x.x > startTime && x.x < endTime)
      ])
    }
  }
}