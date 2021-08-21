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
    this.setCorlor(this.chart.dataPoints);
  }

  appendData(chartData) {
    if (!chartData || !chartData.PS || !chartData.VNIndex30) return;

    this.chart.appendData([
      chartData.VNIndex30.map(item => ({ x: item.time, y: item.last })),
      chartData.PS.map(item => ({ x: item.time, y: item.price }))
    ])

    this.setCorlor(this.chart.dataPoints);
  }


  setCorlor(chartData) {
    var isPSOnTop = true;
    this.chart.getAxisXOptions().stripLines = [];
    var PSData = chartData[1];
    var VNIndex30Data = chartData[0];
    var lastValue = PSData[0].x;
    var lastIndex = 0;
    for (var i = 0; i < PSData.length; i++) {
      if (PSData[i]) {
        var nearestPoint = this.getNearestPoint(lastIndex, PSData[i].x, VNIndex30Data);
        lastIndex = nearestPoint.index;
        if (isPSOnTop) {
          if ((lastIndex > 0 && nearestPoint.dataPoint.y >= PSData[i].y && ((PSData[i].x - lastValue) > 1000*60)) || i == PSData.length - 1) {
            isPSOnTop = false;
            this.chart.getAxisXOptions().stripLines.push({
              startValue: lastValue,
              endValue: PSData[i].x,
              color: "red",
              thickness:0,
              opacity: .3
            })
            lastValue = PSData[i].x;

          }
        }
        else {
          if ((lastIndex > 0 && nearestPoint.dataPoint.y <= PSData[i].y && ((PSData[i].x - lastValue) > 1000*60)) || i == PSData.length - 1) {
            isPSOnTop = true;
            this.chart.getAxisXOptions().stripLines.push({
              startValue: lastValue,
              endValue: PSData[i].x,
              color: "green",
              thickness:0,
              opacity: .3
            })
            lastValue = PSData[i].x;

          }
        }
      }
    }
  }

  getNearestPoint(lastIndex, time, data){
    for (var i = lastIndex; i < data.length; i++){
      if(data[i].x > time){
        return {
          index: i,
          dataPoint: data[i]
        }
      }
    }
    return {
      index: 0
    }
  }


}