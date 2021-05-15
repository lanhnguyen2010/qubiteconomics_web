import React from "react";
import ChartInfoEventBus from "components/widgets/ChartInfo/Event";

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
    this.options = {};

    this.otherChartRefs = [];

    this.syncViewports = this.debounce(this.__syncViewports.bind(this), 5);
    this.onRangeChanged = this.debounce(this.__onRangeChanged.bind(this), 5);

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

    this.updateChartsInfo = this.debounce(this.__updateChartsInfo.bind(this), 100);

    // Chart index (1, 2, 3, etc)
    this.index = 0;

    // Original data points
    this.dataPoints = [];
    this.dataPointsConfigs = [];

    this.filterData = true;
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

  setChartData() {
  }

  getChartName() {
    return "";
  }

  getChartKey() {
    return this.getChartName();
  }

  getChartLegendText() {
    return ""
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }

  registerOtherCharts(ref) {
    this.otherChartRefs.push(ref);
  }

  getChartInfo() {
    let info = {};

    if (!this.chart.legend) {
      return;
    }

    let values = [];

    let xMin = this.chart.axisX[0].viewportMinimum;
    let xMax = this.chart.axisX[0].viewportMaximum;

    this.chart.legend.dataSeries.forEach(legend => {
      if (!legend.dataPoints.length) {
        return;
      }

      var fromY = 0;
      var toY = 0;

      var length = legend.dataPoints.length;
      var i;

      for (i = length - 1; i >= 0; i--) {
        if (legend.dataPoints[i].x >= xMin) {
          fromY = legend.dataPoints[i].y;
          break;
        }
      }
      for (i = 0; i < length; i++) {
        if (legend.dataPoints[i].x <= xMax) {
          toY = legend.dataPoints[i].y;
          break;
        }
      }

      values.push({
        name: legend.legendText,
        range: [fromY, toY]
      })
    });

    if (values.length) {
      info = {
        name: this.getChartKey(),
        time: [xMin, xMax],
        values
      }
    }

    return info;
  }

  __updateChartsInfo(onlyThisChart) {
    setTimeout(() => {
      ChartInfoEventBus.dispatch("setValue", {
        index: this.getIndex(),
        info: this.getChartInfo()
      });
  
      if (!onlyThisChart)
      {
        for (var i = 0; i < this.otherChartRefs.length; i++) {
          let chartRef = this.otherChartRefs[i];
          ChartInfoEventBus.dispatch("setValue", {
            index: chartRef.current.getIndex(),
            info: chartRef.current.getChartInfo()
          });
        }
      }
    }, 100);
  }

  __syncViewports(chartInterval) {
    let xMin = this.chart.axisX[0].viewportMinimum;
    let xMax = this.chart.axisX[0].viewportMaximum;

    this.otherChartRefs.forEach((chartRef) => {
      let chart = chartRef.current.chart;

      chart.options.axisX.viewportMinimum = xMin;
      chart.options.axisX.viewportMaximum = xMax;

      if (chartInterval) chart.options.axisX.interval = chartInterval;
      this.renderChart(chartRef);
    })

    this.updateChartsInfo();
  }

  renderChart(chartRef) {
    let context = this;
    if (chartRef) context = chartRef.current;

    if (this.filterData) context.limitDataPoints();
    setTimeout(() => {
      context.chart.render();
      context.swithToPanMode();
    }, 1);
  }

  __dispatchEvents(event) {
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      chart.container.getElementsByClassName("canvasjs-chart-canvas")[1].dispatchEvent(event);
    }
  }

  __onToolTipUpdated(event) {
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      chart.toolTip.showAtX(event.entries[0].xValue);
    }
  }

  __onToolTipHidden(event) {
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      chart.toolTip.hide();
    }
  }

  __onCrosshairXUpdated(event) {
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      if (!chart.axisX[0].crosshair) {
        continue;
      }
      chart.axisX[0].crosshair.showAt(event.value);
    }
  }

  __onCrosshairXHidden(event) {
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
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

    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      if (!chart.axisY[0].crosshair) {
        continue;
      }
      var cHeight = chart.bounds.y2 - chart.bounds.y1;
      var cY = yPercentage * cHeight;
      chart.axisY[0].crosshair.showAt(chart.axisY[0].convertPixelToValue(cY));
    }
  }

  __onCrosshairYHidden(event) {
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      if (!chart.axisY[0].crosshair) {
        continue;
      }
      chart.axisY[0].crosshair.hide();
    }
  }

  __onRangeChanged(event) {
    this.otherChartRefs.forEach((chartRef) => {
      let chart = chartRef.current.chart;
      if (event.trigger === "reset") {
        chart.options.axisX.viewportMinimum = chart.options.axisX.viewportMaximum = null;
        chart.options.axisY.viewportMinimum = chart.options.axisY.viewportMaximum = null;
      } else if (chart !== event.chart) {
        chart.options.axisX.viewportMinimum = event.axisX[0].viewportMinimum;
        chart.options.axisX.viewportMaximum = event.axisX[0].viewportMaximum;
        chart.options.axisX.interval = event.axisX[0].interval;
      }
      this.renderChart(chartRef);
    })

    this.updateChartsInfo();
  }

  swithToPanMode() {
    var parentElement = this.chart.container.getElementsByClassName("canvasjs-chart-toolbar")[0];
    var childElement = parentElement.getElementsByTagName("button")[0];
    if (childElement.getAttribute("state") === "pan") childElement.click();
  }

  limitDataPoints() {
    if (this.dataPoints.length) {
      let chart = this.chart;

      var minX = chart.axisX[0].viewportMinimum;
      var maxX = chart.axisX[0].viewportMaximum;
      let range = Math.round(maxX - minX);
      if (!parseInt(range)) return;

      let minutes = range / 1000 / 60;

      let step = 1;
      if (minutes <= 30) step = 1;
      else if (minutes <= 60) step = 3;
      else if (minutes <= 180) step = 4;
      else if (minutes <= 300) step = 5;
      else step = 6;

      var showFullInRange = minutes <= 120;
      var stepOutSide = 5;

      this.dataPoints.forEach((dps, dpsIndex) => {
        let filteredDPs = [];
        let done = false;
        for (var i = 0; i < dps.length;) {
          if (done) break;
          filteredDPs.push(dps[i]);

          var filter = !this.dataPointsConfigs[dpsIndex] || this.dataPointsConfigs[dpsIndex].filter !== false;

          if (dps[i].x.getTime() <= maxX && dps[i].x.getTime() >= minX) {
            if (!filter || showFullInRange) {
              i++;
            } else {
              i += step;
              if (i >= dps.length) {
                i--;
                done = true;
              }
            }
          } else {
            i += stepOutSide;
            if (i >= dps.length) {
              i--;
              done = true;
            }
          }
        }
        chart.options.data[dpsIndex].dataPoints = filteredDPs;
      })
    }
  }

  moveDataPointsToChart(dataPoints) {
    dataPoints = dataPoints || this.dataPoints;
    if (dataPoints && dataPoints.length) {
      dataPoints.forEach((dps, i) => {
        this.chart.options.data[i].dataPoints = dps;
      });
    }
  }

  createEvent(type, screenX, screenY, clientX, clientY) {
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
    return function () {
      var context = this, args = arguments;
      var later = function () {
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
      <CanvasJSChart options={this.getChartOptions()} onRef={ref => this.chart = ref} containerProps={containerProps} />
    )
  }
}