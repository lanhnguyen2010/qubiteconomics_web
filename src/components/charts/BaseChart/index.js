import React from "react";

import CanvasJSReact from 'lib/canvasjs.stock.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;

CanvasJS.addColorSet("customColorSet1",
    [//colorSet Array
      "#4661EE",
      "#EC5657",
      "green",
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

    this.syncViewports = this.debounce(this.__syncViewports.bind(this), 100);

    this.onToolTipUpdated = this.debounce(this.__onToolTipUpdated.bind(this), 5);
    this.onToolTipHidden = this.debounce(this.__onToolTipHidden.bind(this), 5);

    /*
    this.onCrosshairXUpdated = this.__onCrosshairXUpdated.bind(this);
    this.onCrosshairXHidden = this.__onCrosshairXHidden.bind(this);
    this.onCrosshairYUpdated = this.__onCrosshairYUpdated.bind(this);
    this.onCrosshairYHidden = this.__onCrosshairYHidden.bind(this);
    */
    this.onCrosshairXUpdated = this.debounce(this.__onCrosshairXUpdated.bind(this), 5);
    this.onCrosshairXHidden = this.debounce(this.__onCrosshairXHidden.bind(this), 5);
    this.onCrosshairYUpdated = this.debounce(this.__onCrosshairYUpdated.bind(this), 5);
    this.onCrosshairYHidden = this.debounce(this.__onCrosshairYHidden.bind(this), 5);

    this.onRangeChanged = this.debounce(this.__onRangeChanged.bind(this), 100);
  }

  componentDidMount() {
    this.buildChart();
    this.setChartData();
  }

  componentDidUpdate() {
    this.setChartData();
  }

  getChartOptions() {
  }

  buildChart() {
  }

  setChartData(){
  }

  getChartName() {
    return "";
  }

  getChartLegendText() {
    return ""
  }

  registerOtherCharts(chart) {
    this.otherCharts.push(chart);
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
      this.swithToPanMode(chart);
    }
  }

  __dispatchEvents(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      chart.container.getElementsByClassName("canvasjs-chart-canvas")[1].dispatchEvent(event);
    }
  }

  __onToolTipUpdated(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      chart.toolTip.showAtX(event.entries[0].xValue);
    }
  }

  __onToolTipHidden(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      chart.toolTip.hide();
    }
  }

  __onCrosshairXUpdated(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      if (!chart.axisX[0].crosshair) {
        continue;
      }
      chart.axisX[0].crosshair.showAt(event.value);
    }
  }

  __onCrosshairXHidden(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      if (!chart.axisX[0].crosshair) {
        continue;
      }
      chart.axisX[0].crosshair.hide();
    }
  }

  __onCrosshairYUpdated(event) {
    var y = this.chart.axisY[0].convertValueToPixel(event.value);
    var height = this.chart.bounds.y2 - this.chart.bounds.y1;
    var yPercentage = y / height;

    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      if (!chart.axisY[0].crosshair) {
        continue;
      }
      var cHeight = chart.bounds.y2 - chart.bounds.y1;
      var cY = yPercentage * cHeight;
      chart.axisY[0].crosshair.showAt(chart.axisY[0].convertPixelToValue(cY));
    }
  }

  __onCrosshairYHidden(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      if (!chart.axisY[0].crosshair) {
        continue;
      }
      chart.axisY[0].crosshair.hide();
    }
  }

  __onRangeChanged(event) {
    for (var i = 0; i < this.otherCharts.length; i++) {
      let chart = this.otherCharts[i];
      if (event.trigger === "reset") {
        chart.options.axisX.viewportMinimum = chart.options.axisX.viewportMaximum = null;
        chart.options.axisY.viewportMinimum = chart.options.axisY.viewportMaximum = null;
      } else if (chart !== event.chart) {
        chart.options.axisX.viewportMinimum = event.axisX[0].viewportMinimum;
        chart.options.axisX.viewportMaximum = event.axisX[0].viewportMaximum;
        chart.options.axisX.interval = event.axisX[0].interval;
      }

      chart.render();
      this.swithToPanMode(chart);
    }
  }

  swithToPanMode(chart) {
    var parentElement = chart.container.getElementsByClassName("canvasjs-chart-toolbar")[0];
    var childElement = parentElement.getElementsByTagName("button")[0];
    if (childElement.getAttribute("state") === "pan") childElement.click();
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