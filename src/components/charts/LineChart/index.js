import BaseChart from "components/charts/BaseChart";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import './styles.css';

export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);

    this.className = "LineSeries";
  }

  buildChart() {
    // Create axes
    var dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"

    series.tooltip.pointerOrientation = "vertical";

    this.chart.cursor.snapToSeries = series;
    this.chart.cursor.xAxis = dateAxis;

    dateAxis.events.on("startendchanged", (ev) => {
      var start = new Date(ev.target.minZoomed);
      var end = new Date(ev.target.maxZoomed);

      this.otherCharts.forEach(chart => {
        chart.xAxes.getIndex(0).zoomToDates(start, end);
      });
    })
  }

  setChartData() {
    //this.chart.data = this.props.data.openPrice;

    am4core.ready(() => {
      var data = this.generateDummyData(true);
      this.chart.data = data;
    })
  }
}