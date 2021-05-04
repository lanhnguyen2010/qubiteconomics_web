import React from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default class BaseChart extends React.Component {

  constructor(props) {
    super(props);

    this.className = "chart";
    this.chartContainerRef = React.createRef();

    this.otherCharts = [];
  }

  componentDidMount() {
      this.__initChart();
      this.__initChartBehavior();

      this.buildChart();
      this.setChartData();

      this.bindResizeEvents();
      this.addTooltip();

  }

  componentDidUpdate() {
    this.setChartData();
  }

  __initChart() {
    this.chart = am4core.create(this.chartContainerRef.current, this.getChartType());
    this.chart.dateFormatter.inputDateFormat = "HH:mm:ss";
  }

  __initChartBehavior() {
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.behavior = "panX";
  }

  getChartType() {
    return am4charts.XYChart;
  }

  buildChart() {
  }

  setChartData(){
  }

  bindResizeEvents() {
  }

  addTooltip() {
  }

  registerOtherCharts(chart) {
    this.otherCharts.push(chart);
  }

  render() {
    return (
      <div className={this.className}>
        <div ref={this.chartContainerRef} className="chart-container" />
      </div>
    )
  }
}