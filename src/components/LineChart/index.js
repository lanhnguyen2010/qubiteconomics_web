import BaseChart from "components/charts/BaseChart";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import './styles.css';

export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);

    this.className = "LineSeries";
  }

  createChart() {
    am4core.ready(() => {
      var chart = this.chart = am4core.create(this.chartContainerRef.current, am4charts.XYChart);

      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;

      chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"

      series.tooltip.pointerOrientation = "vertical";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.snapToSeries = series;
      chart.cursor.xAxis = dateAxis;
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