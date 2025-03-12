import LineChart from "components/charts/LineChart";
export default class NETBUSDChart extends LineChart {

  initChartInfo() {
    return {
      key: "netBUSD",
      name: "NET BUSD",
      legends: [
        {
          key: "netBUSD",
          name: "Net BUSD"
        },
        {
          key: "cumulatedNetBUSD",
          name: "Cumulated Net BUSD"
        }
      ]
    }
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);

    this.getChartOptions(options).data.push({
      axisYType: "secondary",
      axisYIndex: 1,
      type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: this.chartInfo.legends[1].name,
      xValueType: "dateTime",
      yValueFormatString: "#,##0.00"
    })

    options.minMarginRight = 50;

    return options;
  }

  updateData(chartData) {
    if (!chartData || !chartData.length) return;

    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.net })),
      chartData.map(item => ({ x: item.time, y: item.cumSum }))
    ])
  }

  appendData(data) {
    if (!data || !data.length) return;

    this.chart.appendData([
      data.map(item => ({ x: item.time, y: item.net })),
      data.map(item => ({ x: item.time, y: item.cumSum }))
    ])
  }
}

// export default class NETBUSDChart extends LineChart {

//   initChartInfo() {
//     return {
//       key: "netBUSD",
//       name: "NET BUSD",
//       legends: [
//         {
//           key: "unwind",
//           name: "Unwind",
//           filter: false
//         },
//         {
//           key: "netBUSD",
//           name: "Net BUSD"
//         },
//         {
//           key: "SMA",
//           name: "SMA"
//         }
//       ]
//     }
//   }

//   initChartOptions(options) {
//     options = super.initChartOptions(options);

//     this.getChartOptions(options).data[0].legendText = this.chartInfo.legends[1].name
//     this.getChartOptions(options).data[0].color = "green";

//     this.getChartOptions(options).data.push({
//       axisYType: "secondary",
//       type: "line",
//       lineThickness: 1,
//       showInLegend: true,
//       legendText: this.chartInfo.legends[2].name,
//       xValueType: "dateTime",
//       color: "#6666ff",
//       yValueFormatString: "#,##0.00"
//     })
//     this.getChartOptions(options).data.unshift({
//       type: "scatter",
//       lineThickness: 1,
//       showInLegend: true,
//       axisYType: "primary",
//       legendText: this.chartInfo.legends[0].name,
//       fillOpacity: .5,
//       xValueType: "dateTime",
//       color: "#ff6666",
//       yValueFormatString: "#,##0.00",
//       legendMarkerType: "circle",
//     })

//     options.minMarginLeft = 30;
//     options.minMarginRight = 50;

//     return options;
//   }

//   updateData(data) {
//     let bubblesData = data.bubblesData;
//     let chartData = data.chartData;
//     if (!bubblesData || !bubblesData.length || !chartData || !chartData.length) return;

//     this.chart.updateData([
//       bubblesData.map(item => ({ x: item.time, y: item.y, markerSize: item.radius / 2, name: item.label})),
//       chartData.map(item => ({ x: item.time, y: item.NetBUSD })),
//       chartData.map(item => ({ x: item.time, y: item.SMA }))
//     ])
//   }

//   appendData(data) {
//     if (!data) return;
//     let bubblesData = data.bubblesData;
//     let chartData = data.chartData;
//     if (!bubblesData || !bubblesData.length || !chartData || !chartData.length) return;

//     this.chart.appendData([
//       chartData.map(item => ({ x: item.time, y: item.NetBUSD })),
//       chartData.map(item => ({ x: item.time, y: item.SMA }))
//     ])
//   }
// }