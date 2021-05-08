import React from "react";

import CanvasJSReact from 'lib/canvasjs.stock.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;

CanvasJS.addColorSet("customColorSet1",
    [//colorSet Array
      "#4661EE",
      "#EC5657",
      "#1BCDD1",
      "#8FAABB",
      "#B08BEB",
      "#3EA0DD",
      "#F5A52A",
      "#23BFAA",
      "#FAA586",
      "#EB8CC6",
    ]);
export default class BaseChart extends React.Component {

  constructor(props) {
    super(props);

    this.chart = null;
    this.dataPoints = [];
    this.options = {};

    this.otherCharts = [];

    this.syncViewports = this.debounce(this.__syncViewports, 10);
    this.dispatchEvents = this.debounce(this.__dispatchEvents, 10);
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

  __syncViewports(chartInterval) {
    var xMin = this.chart.axisX[0].viewportMinimum;
    var xMax = this.chart.axisX[0].viewportMaximum;

    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];

      chart.options.axisX.viewportMinimum = xMin;
      chart.options.axisX.viewportMaximum = xMax;

      if (chartInterval) {
        chart.axisX[0].set("interval", chartInterval);
      }

      chart.render();
    }
  }

  __dispatchEvents(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      chart.container.getElementsByClassName("canvasjs-chart-canvas")[1].dispatchEvent(event);
    }
  }

  createEvent(type, screenX, screenY, clientX, clientY){
    var event = new MouseEvent(type, {
      view: window,
      bubbles: false,
      cancelable: true,
      screenX: screenX,
      screenY: screenY,
      clientX: clientX,
      clientY: clientY
    });
    return event;
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