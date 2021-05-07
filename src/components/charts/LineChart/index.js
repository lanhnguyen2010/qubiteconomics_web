import BaseChart from "components/charts/BaseChart";

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

import './styles.css';

export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);

    // this.className = "LineSeries";
  }

  buildChart() {
    // Create axes
    // var dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.minGridDistance = 60;
    // dateAxis.renderer.grid.template.location = 0.5;
    // dateAxis.renderer.labels.template.location = 0.5;
    // dateAxis.skipEmptyPeriods = true;

    // dateAxis.baseInterval = {
    //   "timeUnit": "second",
    //   "count": 5
    // };

    // this.chart.yAxes.push(new am4charts.ValueAxis());

    // // Create series
    // var series = this.chart.series.push(new am4charts.LineSeries());
    // series.dataFields.valueY = "price";
    // series.dataFields.dateX = "time";
    // series.tooltipText = "{price}"

    // series.tooltip.pointerOrientation = "vertical";

    // this.chart.cursor.snapToSeries = series;
    // this.chart.cursor.xAxis = dateAxis;

    // dateAxis.events.on("startendchanged", (ev) => {
    //   var start = new Date(ev.target.minZoomed);
    //   var end = new Date(ev.target.maxZoomed);

    //   this.otherCharts.forEach(chart => {
    //     chart.xAxes.getIndex(0).zoomToDates(start, end);
    //   });
    // })

  }

  getChartType() {
    return "line"
  }

  setChartData() {
    // am4core.ready(() => {
    //   console.log(this.props.data.chartData)
    //   this.chart.data = this.props.data.chartData;
    // })
  
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    
    const aaaaaa = chartData.map((i) => ({ x: i.time, y: i.price }));
    console.log("dataPoint", aaaaaa);
    this.options = { 
      animationEnabled: true,
			exportEnabled: true,
      title:{
				text: "Vnindex30/PS"
			},
      data: [
        {
          type: "line",
          lineThickness: 2,
          // toolTipContent: "Time: {x}, Price: {y}",
          dataPoints: aaaaaa
        }
      ] }
  }
}