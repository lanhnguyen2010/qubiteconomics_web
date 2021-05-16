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

    this.minViewportTime = 0;
    this.maxViewportTime = 0;
    this.atRightSide = true;

    this.ready = false;
  }

  register(mgr) {
    this.chartsManager.push(mgr);
  }

  setViewport(minTime, maxTime) {
    if (!this.minViewportTime || this.minViewportTime !== minTime) this.minViewportTime = parseInt(minTime);
    if (!this.maxViewportTime || this.maxViewportTime !== maxTime) this.maxViewportTime = parseInt(maxTime);
    this.chartsManager.forEach(mgr => mgr.setViewport(this.minViewportTime, this.maxViewportTime));
  }

  setAtRightSide(value) {
    this.atRightSide = value;
  }

  getMaxDpsTime() {
    return Math.max(...this.chartsManager.map(mgr => mgr.maxDpsTime));
  }

  shift() {
    if (this.atRightSide) {
      let maxDpsTime = this.getMaxDpsTime();
      let diff = maxDpsTime - this.maxViewportTime;
      this.setViewport(this.minViewportTime + diff, maxDpsTime);
    }
  }

  calculateInterval() {
    var minuteDiffs = parseInt((this.maxViewportTime - this.minViewportTime) / 1000 / 60);
    var interval = 0;
    if (minuteDiffs <= 5) {
      interval = 1;
    }
    else if (minuteDiffs <= 30) {
      interval = 2;
    }
    else if (minuteDiffs <= 40) {
      interval = 5;
    }
    else if (minuteDiffs <= 60) {
      interval = 20;
    }
    else if (minuteDiffs <= 120) {
      interval = 15;
    }
    else if (minuteDiffs <= 240) {
      interval = 20;
    } else {
      interval = 30;
    }
    this.chartsManager.forEach(mgr => mgr.setInterval(interval));
  }

  fireChartInfoChangesEvent(specificChartIndex) {
  }

  showTooltipXAt(triggerIndex, xValue) {
    this.chartsManager.forEach(mgr => { 
      if (mgr.getIndex() != triggerIndex && mgr.chart.toolTip.enabled) {
        mgr.chart.toolTip.showAtX(xValue)
      }
    });
  }

  hideTooltipX(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() != triggerIndex && mgr.chart.toolTip.enabled) {
        mgr.chart.toolTip.hide();
      }
    });
  }

  showCrosshairXAt(triggerIndex, xValue) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() != triggerIndex && mgr.chart.axisX[0].crosshair) {
        mgr.chart.axisX[0].crosshair.showAt(xValue);
      }
    });
  }

  hideCrosshairX(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() != triggerIndex && mgr.chart.axisX[0].crosshair) {
        mgr.chart.axisX[0].crosshair.hide();
      }
    });
  }

  showCrosshairYAt(triggerIndex, yPercentage) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() != triggerIndex && mgr.chart.axisY[0].crosshair) {
        var cHeight = mgr.chart.bounds.y2 - mgr.chart.bounds.y1;
        var cY = yPercentage * cHeight;
        mgr.chart.axisY[0].crosshair.showAt(mgr.chart.axisY[0].convertPixelToValue(cY));
      }
    });
  }

  hideCrosshairY(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() != triggerIndex && mgr.chart.axisY[0].crosshair) {
        mgr.chart.axisY[0].crosshair.hide();
      }
    });
  }

  renderCharts(forceRender, notifyChanges) {
    this.chartsManager.forEach(mgr => {
      mgr.renderChart(forceRender, notifyChanges);
    });
  }

  fireReadyEvent(index) {
    this.chartsManager[index].renderChart(true, true);
  }

  isReady() {
    if (!this.ready) {
      this.ready = this.chartsManager.every(mgr => mgr.ready);
    }
    return this.ready;
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

  getDefaultOptions() {
    return {
      rangeChanging: (event) => this.onRangeChanged(event),
      legend: {
        itemclick: (e) => {
          e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
          this.renderChart();
        }
      },
      toolTip:{
        updated: (event) => this.onToolTipUpdated(event),
        hidden: (event) => this.onToolTipHidden(event)
      },
      axisX: {
        crosshair: {
          enabled: true,
          updated: (event) => this.onCrosshairXUpdated(event),
          hidden: (event) => this.onCrosshairXHidden(event),
          thickness: 0.5,
        }
      },
      axisY: [{
        crosshair: {
          enabled: true,
          shared: true,
          updated: (event) => this.onCrosshairYUpdated(event),
          hidden: (event) => this.onCrosshairYHidden(event),
          thickness: 0.5
        }
      }],
      data: []
    }
  }

  registerEvents() {
    this.chart.container.addEventListener("wheel", (event) => {
      event.preventDefault();

      var chart = this.chart;

      var axisX = chart.axisX[0];
      var currentViewportMin = axisX.get("viewportMinimum");
      var currentViewportMax = axisX.get("viewportMaximum");
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
      if (newViewportMax > this.maxDpsTime) newViewportMax = this.maxDpsTime;

      var minuteDiffs = parseInt((newViewportMax - newViewportMin) / 1000 / 60);

      if (currentMinuteDiffs !== minuteDiffs && minuteDiffs >= 5) {
        this.getManager().setViewport(newViewportMin, newViewportMax);
        this.getManager().setAtRightSide(newViewportMax == this.maxDpsTime);
        this.getManager().calculateInterval();
      }

      this.getManager().renderCharts(false, true);
    });
  }

  configureChartRelation(id, index) {
    this.relationId = id;
    this.index = index;

    this.getManager().register(this);
  }

  getManager() {
    return XCanvasJSManager.getInstance(this.relationId);
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

  updateData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;

    this.dataPoints = [];
    dataPointsList.forEach(dps => this.dataPoints.push(dps));

    this.dataPoints.forEach((dps, index) => {
      this.chart.options.data[index].dataPoints = dps;

      var minDpsTime = dps[0].x.getTime();
      var maxDpsTime = dps[dps.length - 1].x.getTime();

      if (index === 0) {
        this.minDpsTime = minDpsTime;
        this.maxDpsTime = maxDpsTime;
      } else {
        if (this.minDpsTime > minDpsTime) this.minDpsTime = minDpsTime;
        if (this.maxDpsTime < maxDpsTime) this.maxDpsTime = maxDpsTime;
      }
    });

    var minDisplayTime = this.maxDpsTime - (60 * 60000);
    var maxDisplayTime = this.maxDpsTime;
    if (minDisplayTime < this.minDpsTime) minDisplayTime = this.minDpsTime;

    this.getManager().setViewport(minDisplayTime, maxDisplayTime);
    this.getManager().calculateInterval();

    var date = new Date(this.maxDpsTime);
    this.chart.options.axisX.scaleBreaks = {
      customBreaks: [{
        lineThickness: 0,
        collapsibleThreshold: "0%",
        spacing: 0,
        startValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 30, 0),
        endValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0)
      }]
    };

    if (this.chart.data && this.chart.data[0] && this.chart.data[0].dataPoints){
      let dataY = this.chart.data[0].dataPoints.map(i => i.y);
      let maxY = Math.max(...dataY);
      if(maxY > 0 && maxY <1000){
        this.chart.axisY[0].set("margin", 8);
      }
    }

    if (!this.ready) this.getManager().fireReadyEvent(this.getIndex());
  }

  appendData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;

    // Append data
    dataPointsList.forEach((dps, index) => {
      this.dataPoints[index].push(...dps);
      this.chart.options.data[index].dataPoints = this.dataPoints[index];

      var maxDpstime = dps[dps.length - 1].x.getTime();
      if (index === 0) {
        this.maxDpsTime = maxDpstime;
      } else {
        if (this.maxDpsTime < maxDpstime) this.maxDpsTime = maxDpstime;
      }
    });
  }

  setViewport(minTime, maxTime) {
    var axisX = this.chart.options.axisX;

    if (!axisX.viewportMinimum || axisX.viewportMinimum.getTime() !== minTime) {
      this.hasPendingChanges = true;
      axisX.viewportMinimum = new Date(minTime);
    }

    if (!axisX.viewportMaximum || axisX.viewportMaximum.getTime() !== maxTime) {
      this.hasPendingChanges = true;
      axisX.viewportMaximum = new Date(maxTime);
    }
  }

  setInterval(value) {
    if (this.chart.options.axisX.interval !== value) {
      this.hasPendingChanges = true;
      this.chart.options.axisX.interval = value;
    }
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
      if (!legend.dataPoints || !legend.dataPoints.length) return;

      var fromY = 0;
      var toY = 0;

      var length = legend.dataPoints.length;
      var i;

      for (i = 0; i < length; i++) {
        if (legend.dataPoints[i].x >= xMin) {
          fromY = legend.dataPoints[i].y;
          break;
        }
      }

      for (i = length - 1; i >= 0; i--) {
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
        name: this.chartInfo.key,
        time: [xMin, xMax],
        values
      }
    }

    return info;
  }

  swithToPanMode() {
    var parentElement = this.chart.container.getElementsByClassName("canvasjs-chart-toolbar")[0];
    var childElement = parentElement.getElementsByTagName("button")[0];
    if (childElement.getAttribute("state") === "pan") childElement.click();
  }

  limitDataPoints() {
    if (!this.dataPoints || !this.dataPoints.length) return;

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

        var filter = !this.chartInfo.legends[dpsIndex].filter !== false;

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

  renderChart(forceRender, notifyChanges) {
    if (forceRender || this.hasPendingChanges) {
      this.hasPendingChanges = false;

      this.limitDataPoints();
      this.chart.render();
      this.swithToPanMode();

      if (notifyChanges) {
        this.fireChartInfoChangesEvent();
      }
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

  fireChartInfoChangesEvent() {
    this.event.dispatch("setValue", {
      index: this.getIndex(),
      info: this.getChartInfo()
    });
  }

  dispatchEvents(event) {
    /*
    for (var i = 0; i < this.otherChartRefs.length; i++) {
      let chart = this.otherChartRefs[i].current.chart;
      chart.container.getElementsByClassName("canvasjs-chart-canvas")[1].dispatchEvent(event);
    }
    */
  }

  onToolTipUpdated(event) {
    this.getManager().showTooltipXAt(this.getIndex(), event.entries[0].xValue);
  }

  onToolTipHidden() {
    this.getManager().hideTooltipX(this.getIndex());
  }

  onCrosshairXUpdated(event) {
    this.getManager().showCrosshairXAt(this.getIndex(), event.value);
  }

  onCrosshairXHidden() {
    this.getManager().hideCrosshairX(this.getIndex());
  }

  onCrosshairYUpdated(event) {
    var y = this.chart.axisY[0].convertValueToPixel(event.value);
    var height = this.chart.bounds.y2 - this.chart.bounds.y1;
    var yPercentage = y / height;
    this.getManager().showCrosshairYAt(this.getIndex(), yPercentage);
  }

  onCrosshairYHidden() {
    this.getManager().hideCrosshairY(this.getIndex());
  }

  onRangeChanged(event) {
    this.getManager().setViewport(event.axisX[0].viewportMinimum, event.axisX[0].viewportMaximum);
    this.getManager().setAtRightSide(event.axisX[0].viewportMaximum == this.maxDpsTime);
    this.getManager().renderCharts(false, true);
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
}

export {
  EventBus as XCanvasInfoEvent,
  XCanvasJSManager,
  XCanvasJS
}