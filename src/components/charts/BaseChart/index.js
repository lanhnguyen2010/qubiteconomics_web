import React from "react";

import CanvasJSReact from 'lib/canvasjs.stock.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class BaseChart extends React.Component {

  constructor(props) {
    super(props);

    this.chart = null;
    this.dataPoints = [];
    this.options = {};

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
    // this.chart = am4core.create(this.chartContainerRef.current, this.getChartType());
    //this.chart.dateFormatter.inputDateFormat = "HH:mm:ss";
  }

  __initChartBehavior() {
    // this.chart.cursor = new am4charts.XYCursor();
    // this.chart.cursor.behavior = "panX";
  }

  getChartOptions() {
  }

  getChartType() {
    // return am4charts.XYChart;
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
      <div>
        <CanvasJSChart options={this.getChartOptions()} onRef={ref => this.chart = ref} />
      </div>
    )
  }
}