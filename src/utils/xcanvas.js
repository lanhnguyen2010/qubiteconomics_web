class EventBus {
  on (event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  }
  
  dispatch (event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  remove (event, callback) {
    document.removeEventListener(event, callback);
  }
}

const _ChartsManagerInstance = {};

class XCanvasJSManager {

  constructor() {
    this.chartsManager = [];

    this.minViewRangeTime = 0;
    this.maxViewRangeTime = 0;
    this.minViewportTime = 0;
    this.maxViewportTime = 0;

    this.ready = false;
    this.filterData = false;

    this.renderQueue = [];
    this.registeredRenderCharts = {};
    this.triggerRender();
  }

  register(mgr) {
    this.chartsManager.push(mgr);
  }

  setViewport(minTime, maxTime) {
    this.minViewportTime = minTime || this.minViewRangeTime;
    this.maxViewportTime = maxTime || this.maxViewRangeTime;

    this.chartsManager.forEach(mgr => {
      var slider = mgr.getOptions().navigator.slider;
      slider.minimum = this.minViewportTime;
      slider.maximum = this.maxViewportTime;
    });
  }

  getMaxDpsTime() {
    return Math.max(...this.chartsManager.map(mgr => mgr.maxDpsTime));
  }

  isAtRightSide() {
    return this.maxViewportTime === this.maxViewRangeTime;
  }

  clear() {
    this.minViewRangeTime = 0;
    this.maxViewRangeTime = 0;
    this.minViewportTime = 0;
    this.maxViewportTime = 0;

    this.chartsManager.forEach(mgr => {
      mgr.clear();
    });
    this.ready = false;
  }

  initViewRange() {
    var syncViewport = this.maxViewRangeTime - this.maxViewportTime <= (10 * 60 * 1000);

    let minTime, maxTime;
    this.chartsManager.forEach((mgr, index) => {
      if (index === 0) {
        minTime = mgr.minDpsTime;
        maxTime = mgr.maxDpsTime;
      } else {
        if (minTime > mgr.minDpsTime) minTime = mgr.minDpsTime;
        if (maxTime < mgr.maxDpsTime) maxTime = mgr.maxDpsTime;
      }
    })

    this.minViewRangeTime = minTime - 5 * 60 * 1000;
    this.maxViewRangeTime = maxTime + 10 * 60 * 1000;

    this.chartsManager.forEach(mgr => {
      var slider = mgr.getOptions().navigator.slider;
      slider.minimum = this.minViewRangeTime;
      slider.maximum = this.maxViewRangeTime;
    });

    if (syncViewport) {
      this.setViewport(this.minViewportTime, this.maxViewRangeTime);
    }
  }

  triggerRender() {
    if (this.renderQueue.length) {

      let chartIndex = this.renderQueue.shift();
      let chartRenderInfo = this.registeredRenderCharts[chartIndex];
      this.registeredRenderCharts[chartIndex] = null;

      // Render
      if (!this.chartsManager[chartIndex] || !this.chartsManager[chartIndex].ready) {
        // Not ready yet, register again to render later
        this.registerRender(chartIndex, chartRenderInfo.notifyChanges);
      } else {
        // Good state, let's render
        this.calculateInterval();

        this.chartsManager[chartIndex].render(chartRenderInfo.notifyChanges);
      }
    }

    setTimeout(() => {
      this.triggerRender();
    }, 3);
  }

  registerRender(index, notifyChanges) {
    var item = this.registeredRenderCharts[index];
    if (!item) {
      this.renderQueue.push(index);
      this.registeredRenderCharts[index] = {
        notifyChanges
      }
    } else {
      this.registeredRenderCharts[index] = {
        notifyChanges: notifyChanges || item.notifyChanges
      }
    }
  }

  registerRenderCharts(notifyChanges, forceRenderIndex) {
    if (forceRenderIndex) {
      this.chartsManager[forceRenderIndex].render(notifyChanges);
    }
    this.chartsManager.forEach(mgr => {
      if (forceRenderIndex && forceRenderIndex === mgr.getIndex()) return;
      this.registerRender(mgr.getIndex(), notifyChanges);
    });
  }

  calculateInterval() {
    var maxViewport = this.maxViewportTime;
    var minViewport = this.minViewportTime;

    if (!minViewport || !maxViewport) {
      // Not ready, take the min/max from charts
      this.chartsManager.forEach(mgr => {
        if (!mgr.ready) return;
        if (!minViewport || minViewport > mgr.minDpsTime) {
          minViewport = mgr.minDpsTime;
        }
        if (!maxViewport || maxViewport < mgr.maxDpsTime) {
          maxViewport = mgr.maxDpsTime;
        }
      });
    }

    var minuteDiffs = parseInt((maxViewport - minViewport) / 1000 / 60);
    var interval = 0;
    if (minuteDiffs <= 20) {
      interval = 1;
    }
    else if (minuteDiffs <= 40) {
      interval = 2;
    }
    else if (minuteDiffs <= 80) {
      interval = 5;
    }
    else if (minuteDiffs <= 120) {
      interval = 10;
    }
    else if (minuteDiffs <= 240) {
      interval = 15;
    } else {
      interval = 20;
    }
    this.chartsManager.forEach(mgr => mgr.setInterval(interval));
  }

  showTooltipXAt(triggerIndex, xValue) {
    this.chartsManager.forEach(mgr => { 
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.getChart().toolTip.enabled) {
        mgr.getChart().toolTip.showAtX(xValue)
      }
    });
  }

  hideTooltipX(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.getChart().toolTip.enabled) {
        mgr.getChart().toolTip.hide();
      }
    });
  }

  showCrosshairXAt(triggerIndex, xValue) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.getChart().axisX[0].crosshair) {
        mgr.getChart().axisX[0].crosshair.showAt(xValue);
      }
    });
  }

  hideCrosshairX(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.getChart().axisX[0].crosshair) {
        mgr.getChart().axisX[0].crosshair.hide();
      }
    });
  }

  showCrosshairYAt(triggerIndex, yPercentage) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.getChart().axisY[0].crosshair) {
        var cHeight = mgr.getChart().bounds.y2 - mgr.getChart().bounds.y1;
        var cY = yPercentage * cHeight;
        mgr.getChart().axisY[0].crosshair.showAt(mgr.getChart().axisY[0].convertPixelToValue(cY));
      }
    });
  }

  hideCrosshairY(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.getChart().axisY[0].crosshair) {
        mgr.getChart().axisY[0].crosshair.hide();
      }
    });
  }

  getMinValidDpsTime() {
    return Math.min(...this.chartsManager.map(mgr => mgr.getMaxValidDpsTime()));
  }

  fireReadyEvent() {
    if (this.isReady()) {
      this.initViewRange();
      this.registerRenderCharts(true);
    }
  }

  isReady() {
    if (!this.ready) {
      this.ready = this.chartsManager.every(mgr => mgr.ready);
    }
    return this.ready;
  }

  dispatchEvent(triggerIndex, event, customEventType, triggerSelf) {
    var orgChart = this.chartsManager[triggerIndex].getChart();
    if (!orgChart) return;

    var oriElBounds =  orgChart.container.getBoundingClientRect();
    var orgChartBoundsY = orgChart.axisY[0].bounds; // y1(top), x2 (left), height

    var xValue = orgChart.axisX[0].convertPixelToValue(parseInt(event.clientX - oriElBounds.x));
    var ratioY = (event.clientY - oriElBounds.y - orgChartBoundsY.y1) * 1.0 / orgChartBoundsY.height;

    this.chartsManager.forEach(mgr => {
      if (!mgr.ready) return;
      if (!triggerSelf && mgr.getIndex() === triggerIndex) return;
      if (!mgr.getChart()) return;

      var zone = mgr.chart.container.getElementsByClassName("canvasjs-chart-canvas")[1];
      var elBounds = zone.getBoundingClientRect();

      var chartBoundsY = mgr.getChart().axisY[0].bounds;
      var chartClientY = elBounds.y + (chartBoundsY.height * ratioY);

      var clientX = parseInt(elBounds.x + mgr.getChart().axisX[0].convertValueToPixel(xValue));
      var clientY = parseInt(chartClientY + chartBoundsY.y1);

      zone.dispatchEvent(this.createEvent(
        customEventType || event.type,
        event.screenX,
        event.screenY,
        clientX,
        clientY
      ));
    });
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
}

XCanvasJSManager.getInstance = function(key) {
  if (!(key in _ChartsManagerInstance)) {
    _ChartsManagerInstance[key] = new XCanvasJSManager();
  }
  return _ChartsManagerInstance[key];
}

class XCanvasJS {
  constructor() {
    this.event = new EventBus();
    this.__init();

    this.onRangeChanging = this.debounce(this.__onRangeChanging.bind(this), 20);
    this.onZooming = this.debounce(this.__onZooming.bind(this), 20);
  }

  __init() {
    this.dataPoints = [];

    this.minDpsTime = 0;
    this.maxDpsTime = 0;

    this.ready = false;
  }

  init(chart, chartInfo, chartOptions) {
    this.chart = chart;
    this.chartInfo = chartInfo;
    this.chartOptions = chartOptions;
  }

  clear() {
    this.dataPoints.forEach((_, index) => {
      this.getChartOptions().data[index].dataPoints = [];
    });
    this.__init();
  }

  getChart() {
    return this.chart.charts[0];
  }

  getChartOptions() {
    return this.chart.options.charts[0];
  }

  getOptions() {
    return this.chart.options;
  }

  getDefaultOptions() {
    return {
      rangeChanging: (event) => this.onRangeChanging(event),
      rangeChanged: (event) => this.onRangeChanged(event),
      charts: [
        {
          legend: {
            itemclick: (e) => {
              e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
              this.getManager().registerRender(this.getIndex(), true);
            },
            cursor: "pointer"
          },
          axisX: {
            crosshair: {
              enabled: true,
              thickness: 0.5,
              label:''
            }
          },
          axisY: [{
            crosshair: {
              enabled: true,
              shared: true,
              thickness: 0.5
            }
          }],
          data: []
        }
      ],
      navigator: {
        enabled: true,
        height: 0.001,
        width: 0.1,
        slider: {
        }
      },
      rangeSelector: {
        enabled: false
      }
    }
  }

  registerEvents() {
    this.chart.container.addEventListener("wheel", (event) => {
      if (!this.ready) return;

      event.preventDefault();
      this.onZooming(event);
    });

    ["mousemove", "mouseout"].forEach(evtName => {
      this.chart.container.addEventListener(evtName, (event) => {
        if (!this.ready) return;

        this.getManager().dispatchEvent(this.getIndex(), event);
      });
    })
  }

  __onZooming(event) {
    var axisX = this.getChartOptions().axisX;
    var currentViewportMin = axisX.viewportMinimum;
    var currentViewportMax = axisX.viewportMaximum;
    var currentMinuteDiffs = parseInt((currentViewportMax - currentViewportMin) / 1000 / 60);

    var interval = 10 * 60 * 1000;
  
    var newViewportMin, newViewportMax;
  
    if (event.deltaY < 0) {
      newViewportMin = currentViewportMin + interval;
      newViewportMax = currentViewportMax - interval;
    }
    else if (event.deltaY > 0) {
      newViewportMin = currentViewportMin - interval;
      newViewportMax = currentViewportMax + interval;
    }

    if (newViewportMin < this.minDpsTime) newViewportMin = this.minDpsTime;
    if (newViewportMax >= this.maxDpsTime) newViewportMax = this.maxDpsTime;

    var minuteDiffs = parseInt((newViewportMax - newViewportMin) / 1000 / 60);

    if (minuteDiffs >= 30 || (currentMinuteDiffs < 30 && currentMinuteDiffs < minuteDiffs)) {
      this.getManager().setViewport(newViewportMin, newViewportMax);
      this.getManager().registerRenderCharts(true, this.getIndex());
    }
  }

  configureChartRelation(id, index) {
    this.relationId = id;
    this.index = index;

    this.manager = XCanvasJSManager.getInstance(this.relationId);
    this.manager.register(this);
  }

  getManager() {
    return this.manager;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }

  getMaxValidDpsTime() {
    let maxValidDpsTime = 0;
    this.dataPoints.forEach((dps) => {
      if (!dps.length) return;
      for (var i = dps.length - 1; i >= 0; i--) {
        if (dps[i].y !== null) {
          var maxDpsTime = dps[i].x.getTime();
          if (maxValidDpsTime === 0) {
            maxValidDpsTime = maxDpsTime;
          } else {
            if (maxValidDpsTime < maxDpsTime) maxValidDpsTime = maxDpsTime;
          }
          break;
        }
      }
    })
    return maxValidDpsTime;
  }

  updateData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;

    this.dataPoints = [];
    dataPointsList.forEach(dps => this.dataPoints.push(dps));

    let iFirstIndex = -1;
    this.dataPoints.forEach((dps, index) => {
      if (!dps.length) {
        return;
      }
      if (iFirstIndex === -1) {
        iFirstIndex = index;
      }


      var minDpsTime = dps[0].x.getTime();
      var maxDpsTime = dps[dps.length - 1].x.getTime();

      this.getChartOptions().data[index].dataPoints = dps;

      if (index === iFirstIndex) {
        this.minDpsTime = minDpsTime;
        this.maxDpsTime = maxDpsTime;
      } else {
        if (this.minDpsTime > minDpsTime) this.minDpsTime = minDpsTime;
        if (this.maxDpsTime < maxDpsTime) this.maxDpsTime = maxDpsTime;
      }
    })

    if (!this.minDpsTime || !this.maxDpsTime) return;

    var date = new Date(this.maxDpsTime);
    this.getChartOptions().axisX.scaleBreaks = {
      customBreaks: [{
        lineThickness: 0,
        collapsibleThreshold: "0%",
        spacing: 0,
        startValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 30, 0),
        endValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0)
      }]
    };

    if (!this.ready) {
      this.ready = true;
      this.getManager().fireReadyEvent(this.getIndex());
    }

    this.getManager().registerRender(this.getIndex(), false);
  }

  getLastValidPoint(dps) {
    for (var i = dps.length; i >= 0; i--) {
      if (dps[i].y !== null) {
        return dps[i].y;
      }
    }
  }

  appendData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;

    // Append data
    dataPointsList.forEach((dps, index) => {
      if (!dps.length) return;

      // Remove redundant points
      let newFromTime = dps[0].x.getTime();
      let newToTime = dps[dps.length - 1].x.getTime();
      let currentDps = this.dataPoints[index];

      if (!currentDps) {
        currentDps = this.dataPoints[index] = dps;
      } else if (currentDps.length) {

        // Remove null points
        for (var i = currentDps.length - 1; i >= 0 && i >= currentDps.length - 50; i--) {
          if (currentDps[i].y === null) {
            currentDps.splice(i, 1);
          }
        }

        let pushFromIndex = currentDps.length - 1;
        for (i = pushFromIndex; i >= 0; i--) {
          if (currentDps[i].x < newFromTime) {
            break;
          }
          pushFromIndex = i;
        }
  
        // Remove outdated points
        if (pushFromIndex + 1 <= currentDps.length - 1) {
          currentDps.splice(pushFromIndex + 1);
        }

        // Append new points
        currentDps.push(...dps);

        // Update max dps time
        if (this.maxDpsTime < newToTime) this.maxDpsTime = newToTime;
      }

      this.getChartOptions().data[index].dataPoints = currentDps;
    });
  }

  buildStripLine(dataY, index) {
    if (!dataY) return {}

    const axisY = this.getChartOptions().axisY[0];
    const chartData = this.getChart().data;
    if (!axisY.stripLines || !axisY.stripLines.length){
      axisY.stripLines = [];
      for( var i = 0; i < this.getChartOptions().data.length; i++){
        axisY.stripLines.push({});
      }
    }
    if (this.getChartOptions().data[index].type === 'scatter') return;

    let finalStripline;
    if (axisY.stripLines[index] && this.getChartOptions().axisY[0].stripLines[index].value) {
      //use old stripLines
      axisY.stripLines[index].value = dataY
      axisY.stripLines[index].label= dataY ? dataY.toFixed(2) : "0"
    } else {
      // create new
      let color = chartData[index].color;
      if (!color) {
        color = chartData[index].lineColor;
      }
      if (!color) {
        color = chartData[index]._colorSet[index];
      }
      const baseOptions = axisY.stripLinesOptions
      const stripLineOptions = {
        value: dataY,
        color: color,
        labelFontColor: "white",
        label: dataY ? dataY.toFixed(2) : "0",
        labelBackgroundColor: color
      }

      finalStripline = {...baseOptions, ...stripLineOptions};

      //invisible
      //kep the stripline because it can be enable later
      if (!chartData[index].visible) {
        finalStripline.thickness = 0;
      }
      axisY.stripLines[index] = finalStripline;
    }
  }

  setInterval(value) {
    if (!this.ready) return;

    if (this.getChartOptions().axisX.interval !== value) {
      this.hasPendingChanges = true;
      this.getChartOptions().axisX.interval = value;
    }
  }

  getChartInfo() {
    let info = {};

    if (!this.getChart().legend) {
      return;
    }

    let values = [];

    let xMin = this.getChart().axisX[0].viewportMinimum;
    let xMax = this.getChart().axisX[0].viewportMaximum;

    let fromX = xMin;
    let toX = xMax;

    this.getChart().legend.dataSeries.forEach(legend => {
      if (!legend.dataPoints || !legend.dataPoints.length) return;

      var fromY = 0;
      var toY = 0;

      var length = legend.dataPoints.length;
      var i;

      for (i = 0; i < length; i++) {
        if (legend.dataPoints[i].x >= xMin && legend.dataPoints[i].y !== null) {
          fromY = legend.dataPoints[i].y;
          fromX = legend.dataPoints[i].x;
          break;
        }
      }

      for (i = length - 1; i >= 0; i--) {
        if (legend.dataPoints[i].x <= xMax && legend.dataPoints[i].y !== null) {
          toY = legend.dataPoints[i].y;
          toX = legend.dataPoints[i].x
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
        name: this.chartInfo.key,
        time: [fromX, toX],
        values
      }
    }

    return info;
  }

  swithToPanMode() {
    let callback = true;
    if (this.ready && this.chart && this.chart.container) {
      var parentElement = this.chart.container.getElementsByClassName("canvasjs-chart-toolbar")[0];
      if (parentElement) {
        var childElement = parentElement.getElementsByTagName("button")[0];
        if (childElement) {
          if (childElement.getAttribute("state") === "pan") childElement.click();
          if (childElement.getAttribute("state") !== "pan") {
            callback = false;
          }
        }
      }
    }
    if (callback) {
      setTimeout(() => { this.swithToPanMode(); }, 5);
    }
  }

  beforeRender() {
    if (!this.dataPoints || !this.dataPoints.length) return;

    var minX = this.manager.minViewportTime;
    var maxX = this.manager.maxViewportTime;
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
    let stripLinesValue = [];

    this.dataPoints.forEach((dps, dpsIndex) => {
      let filteredDPs = [];
      var filter = this.chartInfo.legends[dpsIndex].filter !== false;

      let dpsLength = dps.length;
      for (var i = 0; i < dpsLength;) {
        filteredDPs.push(dps[i]);
        let valueX = dps[i].x.getTime();

        // Take the latest visible Y
        // Build stripline
        if (valueX >= minX && valueX <= maxX) {
          if (dps[i].y !== null) {
            stripLinesValue[dpsIndex] = dps[i].y;
          }
        }

        if (!this.filterData) {
          i++;
          continue;
        }

        // Always take first and last fixed points
        if (i <= 50 || i >= dpsLength - 100) {
          i++;
          continue;
        }

        if (valueX >= minX && valueX <= maxX) {
          if (!filter || showFullInRange) {
            i++;
          } else {
            i += step;
          }
        } else {
          i += stepOutSide;
        }
      }

      this.getChartOptions().data[dpsIndex].dataPoints = filteredDPs;
    })

    const stripLines = [];
    this.dataPoints.forEach((_, index) => {
      let value = stripLinesValue[index];
      if (!isNaN(parseInt(value))
        && this.getChartOptions().data[index].type !== 'scatter'
        && this.getChartOptions().data[index].visible) {
        stripLines[index] = this.buildStripLine(value, index);
      }

      if (!stripLines[index]) stripLines[index] = {};
    })

    this.getChartOptions().axisY[0].stripLines = stripLines;
  }

  render(notifyChanges) {
    this.beforeRender();
    this.chart.render();
    this.swithToPanMode();

    if (notifyChanges) {
      this.event.dispatch("setValue", {
        index: this.getIndex(),
        info: this.getChartInfo()
      });
    }
  }

  onRangeChanged(event) {
    if (event.trigger === "reset") {
      let minDpsTime = Math.min(...this.manager.chartsManager.map(mgr => { return mgr.minDpsTime }));
      let maxDpsTime = Math.min(...this.manager.chartsManager.map(mgr => { return mgr.maxDpsTime }));

      this.getManager().setViewport(minDpsTime, maxDpsTime);
      this.getManager().registerRenderCharts(true, this.getIndex());
    }
  }

  __onRangeChanging(event) {
    this.getManager().setViewport(event.minimum, event.maximum);
    this.getManager().registerRenderCharts(true, this.getIndex());
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
      var context = this;
      var args = arguments;
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
}

export {
  EventBus as XCanvasInfoEvent,
  XCanvasJSManager,
  XCanvasJS
}