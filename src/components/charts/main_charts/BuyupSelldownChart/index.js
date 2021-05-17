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

    options.data[0].legendText = this.chartInfo.legends[1].name;

    options.data.push({
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[2].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    });
    options.data.unshift({
      type: "scatter",
      lineThickness: 1,
      showInLegend: true,
      axisYType: "secondary",
      legendText: this.chartInfo.legends[0].name,
      fillOpacity: .5,
      axisYIndex: 1,
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


    this.chart.updateData([
      bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label})),
      chartData.map(item => ({ x: item.time, y: item.BU })),
      chartData.map(item => ({ x: item.time, y: item.SD }))
    ])
  }

  appendData(data) {
    if (data && data.bubblesData && data.chartData){
      this.chart.appendData([
        data.bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius/2, name: item.label})),
        data.chartData.map(item => ({ x: item.time, y: item.BU })),
        data.chartData.map(item => ({ x: item.time, y: item.SD }))
      ])
    }
  }
}