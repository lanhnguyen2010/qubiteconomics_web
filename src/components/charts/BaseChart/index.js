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

    this.syncViewports = this.debounce(this.__syncViewports, 10);
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

  syncHandler() {
    this.syncViewports();
  }

  __syncViewports() {
    var xMin = this.chart.axisX[0].viewportMinimum;
    var xMax = this.chart.axisX[0].viewportMaximum;
    var yMin = this.chart.axisY[0].viewportMinimum;
    var yMax = this.chart.axisY[0].viewportMaximum;

    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];

      chart.options.axisX.viewportMinimum = xMin;
      chart.options.axisX.viewportMaximum = xMax;
      
      chart.options.axisY.viewportMinimum = yMin;
      chart.options.axisY.viewportMaximum = yMax;

      setTimeout(function() {
        chart.render();
      }, 10)
    }
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  render() {
    const containerProps = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };

    return (
      <CanvasJSChart options={this.getChartOptions()} onRef={ref => this.chart = ref} containerProps = {containerProps} />
    )
  }
}