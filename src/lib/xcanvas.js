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

    this.mouseDown = 0;
    document.addEventListener("mousedown", () => { this.mouseDown++; });
    document.addEventListener("mouseup", () => { this.mouseDown--; });

    this.renderQueue = [];
    this.registeredRenderCharts = {};
    this.triggerRender();
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
      this.setViewport(this.minViewportTime, maxDpsTime);
    }
  }

  clear() {
    this.chartsManager.forEach(mgr => {
      mgr.clear();
    });
    this.ready = false;
  }

  triggerRender() {
    if (this.renderQueue.length) {
      let chartIndex = this.renderQueue.shift();
      let chart = this.registeredRenderCharts[chartIndex];
      this.registeredRenderCharts[chartIndex] = null;

      // Render
      if (!this.chartsManager[chartIndex] || !this.chartsManager[chartIndex].ready) {
        // Not ready yet, register again to render later
        this.registerRender(chart, chart.forceRender, chart.notifyChanges);
      } else {
        // Good state, let's render
        this.chartsManager[chartIndex].render(chart.forceRender, chart.notifyChanges);
      }
    }

    setTimeout(() => {
      this.triggerRender();
    }, 10);
  }

  registerRender(index, forceRender, notifyChanges) {
    var item = this.registeredRenderCharts[index];
    if (!item) {
      this.renderQueue.push(index);
      this.registeredRenderCharts[index] = {
        forceRender,
        notifyChanges
      }
    } else {
      this.registeredRenderCharts[index] = {
        forceRender: forceRender || item.forceRender,
        notifyChanges: notifyChanges || item.notifyChanges
      }
    }
  }

  registerRenderCharts(forceRender, notifyChanges, forceRenderIndex) {
    if (forceRenderIndex) {
      this.chartsManager[forceRenderIndex].render(forceRender, notifyChanges);
    }
    this.chartsManager.forEach(mgr => {
      if (forceRenderIndex && forceRenderIndex === mgr.getIndex()) return;

      this.registerRender(mgr.getIndex(), forceRender, notifyChanges);
    });
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

  showTooltipXAt(triggerIndex, xValue) {
    this.chartsManager.forEach(mgr => { 
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.chart.toolTip.enabled) {
        mgr.chart.toolTip.showAtX(xValue)
      }
    });
  }

  hideTooltipX(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.chart.toolTip.enabled) {
        mgr.chart.toolTip.hide();
      }
    });
  }

  showCrosshairXAt(triggerIndex, xValue) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.chart.axisX[0].crosshair) {
        mgr.chart.axisX[0].crosshair.showAt(xValue);
      }
    });
  }

  hideCrosshairX(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.chart.axisX[0].crosshair) {
        mgr.chart.axisX[0].crosshair.hide();
      }
    });
  }

  showCrosshairYAt(triggerIndex, yPercentage) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.chart.axisY[0].crosshair) {
        var cHeight = mgr.chart.bounds.y2 - mgr.chart.bounds.y1;
        var cY = yPercentage * cHeight;
        mgr.chart.axisY[0].crosshair.showAt(mgr.chart.axisY[0].convertPixelToValue(cY));
      }
    });
  }

  hideCrosshairY(triggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      if (mgr.chart.axisY[0].crosshair) {
        mgr.chart.axisY[0].crosshair.hide();
      }
    });
  }

  fireReadyEvent() {
    if (this.isReady()) {
      let maxWidth1 = 0;
      this.chartsManager.forEach(mgr => {
        if (mgr.chart.axisY[0]) {
          var width1 = mgr.chart.axisY[0].bounds.x2 - mgr.chart.axisY[0].bounds.x1;
          if (maxWidth1 < width1) maxWidth1 = width1;
        }
      });
  
      this.chartsManager.forEach(mgr => {
        if (maxWidth1 > 0) {
          var diff = maxWidth1;
          if (mgr.chart.axisY[0]) {
            var diff = maxWidth1 - mgr.chart.axisY[0].bounds.x2;
          }
          if (diff > 0) mgr.chart.axisY[0].set("margin", diff);
        }
      });
    }
  }

  isReady() {
    if (!this.ready) {
      this.ready = this.chartsManager.every(mgr => mgr.ready);
    }
    return this.ready;
  }

  isMouseDown() {
    return this.mouseDown !== 0;
  }

  dispatchEvent(triggerIndex, event, customEventType, triggerSelf) {
    var orgChart = this.chartsManager[triggerIndex].chart;
    var oriElBounds =  event.target.getBoundingClientRect();
    var orgChartBoundsY = orgChart.axisY[0].bounds; // y1(top), x2 (left), height

    var xValue = orgChart.axisX[0].convertPixelToValue(parseInt(event.clientX - oriElBounds.x));
    var ratioY = (event.clientY - oriElBounds.y - orgChartBoundsY.y1) * 1.0 / orgChartBoundsY.height;

    this.chartsManager.forEach(mgr => {
      if (!triggerSelf && mgr.getIndex() === triggerIndex) return;

      var zone = mgr.chart.container.getElementsByClassName("canvasjs-chart-canvas")[1];
      var elBounds = zone.getBoundingClientRect();

      var chartBoundsY = mgr.chart.axisY[0].bounds;
      var chartClientY = elBounds.y + (chartBoundsY.height * ratioY);

      var clientX = elBounds.x + mgr.chart.axisX[0].convertValueToPixel(xValue);
      var clientY = chartClientY + chartBoundsY.y1;

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

    this.onRangeChanged = this.debounce(this.__onRangeChanged.bind(this), 20);
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
      this.chart.options.data[index].dataPoints = [];
    });
    this.__init();
  }

  getDefaultOptions() {
    return {
      rangeChanging: (event) => this.onRangeChanged(event),
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
  }

  registerEvents() {
    this.chart.container.addEventListener("wheel", (event) => {
      if (!this.ready || this.manager.isMouseDown()) return;

      event.preventDefault();
      this.onZooming(event);
    });

    ["mousemove", "mouseout"].forEach(evtName => {
      this.chart.container.addEventListener(evtName, (event) => {
        if (!this.ready || this.manager.isMouseDown()) return;

        this.getManager().dispatchEvent(this.getIndex(), event);
      });
    })
  }

  __onZooming(event) {
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
      this.getManager().setAtRightSide(newViewportMax === this.maxDpsTime);
      this.getManager().calculateInterval();
    }

    this.getManager().registerRenderCharts(false, true, this.getIndex());
    this.getManager().dispatchEvent(this.getIndex(), event, "mousemove", true);
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

  updateData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;

    this.dataPoints = [];
    dataPointsList.forEach(dps => this.dataPoints.push(dps));

    let stripLines = []

    this.dataPoints.forEach((dps, index) => {
      if (!dps.length) return;

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
        stripLines.push(this.buildStripLine(dps[dps.length - 1].y, index))
    })
    this.chart.options.axisY[0].stripLines = stripLines;

    if (!this.minDpsTime || !this.maxDpsTime) return;

    if (!this.ready) {
      this.ready = true; this.getManager().fireReadyEvent(this.getIndex());
    }

    this.getManager().setViewport(this.minDpsTime, this.maxDpsTime);
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

    if (!this.ready) { this.ready = true; this.getManager().fireReadyEvent(this.getIndex()); }

    this.getManager().registerRender(this.getIndex(), true, true);
  }

  appendData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;
    let stripLines = []
    // Append data
    dataPointsList.forEach((dps, index) => {
      if (!dps.length) return;

      // Remove redundant points
      let newFromTime = dps[0].x.getTime();
      const currentDps = this.dataPoints[index];
      let pushFromIndex = currentDps.length - 1;
      for (var i = pushFromIndex; i >= 0; i--) {
        if (currentDps[i].x < newFromTime) {
          break;
        }
        pushFromIndex = i;
      }

      // Append new points
      if (pushFromIndex + 1 <= currentDps.length - 1) {
        this.dataPoints[index].splice(pushFromIndex + 1);
      }

      this.dataPoints[index].push(...dps);
      this.chart.options.data[index].dataPoints = this.dataPoints[index];

      var maxDpstime = dps[dps.length - 1].x.getTime();
      if (index === 0) {
        this.maxDpsTime = maxDpstime;
      } else {
        if (this.maxDpsTime < maxDpstime) this.maxDpsTime = maxDpstime;
      }
      if (this.chart.options.data[index].type === 'line'){
        stripLines.push(this.buildStripLine(dps[dps.length - 1].y, index));
      }
    });
    this.chart.options.axisY[0].stripLines = stripLines;
  }

  buildStripLine(dataY, index) {
    let color = this.chart.data[index].color;
    if (!color){
      color = this.chart.data[index].lineColor;
    }
    return {
      value: dataY,
      color: color,
      labelFontColor: color,
      label: dataY.toFixed(2),
      labelPlacement: "outside",
      labelBackgroundColor: "none",
      labelFontSize: 8,
      lineDashType: "dot",
      opacity: .7
    }
  }

  setViewport(minTime, maxTime) {
    if (!this.ready) return;

    var axisX = this.chart.options.axisX;

    if (!axisX.viewportMinimum || axisX.viewportMinimum.getTime() !== minTime) {
      this.hasPendingChanges = true;
      axisX.viewportMinimum = new Date(minTime);
    }

    if (!axisX.viewportMaximum || axisX.viewportMaximum.getTime() !== maxTime) {
      this.hasPendingChanges = true;
      axisX.viewportMaximum = new Date(maxTime);

      this.dataPoints.forEach((dps, index) => {
        if (dps[dps.length - 1].x.getTime() < maxTime) {
          // Append an empty point to sync the time-range
          var emptyPoint = {...dps[dps.length - 1]};
          emptyPoint.x = new Date(maxTime);
          emptyPoint.y = null;
          dps.push(emptyPoint);

          this.chart.options.data[index].dataPoints = this.dataPoints[index];
        }
      });
    }
  }

  setInterval(value) {
    if (!this.ready) return;

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
      var filter = this.chartInfo.legends[dpsIndex].filter !== false;

      for (var i = 0; i < dps.length;) {
        if (done) break;

        filteredDPs.push(dps[i]);

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

  render(forceRender, notifyChanges) {
    if (forceRender || this.hasPendingChanges) {
      this.hasPendingChanges = false;

      this.limitDataPoints();
      this.chart.render();
      this.swithToPanMode();

      if (notifyChanges) {
        this.event.dispatch("setValue", {
          index: this.getIndex(),
          info: this.getChartInfo()
        });
      }
    }
  }

  __onRangeChanged(event) {
    if (!this.manager.isMouseDown()) return;

    this.manager.setViewport(event.axisX[0].viewportMinimum, event.axisX[0].viewportMaximum);
    this.manager.setAtRightSide(event.axisX[0].viewportMaximum === this.maxDpsTime);
    this.manager.registerRenderCharts(false, true, this.getIndex());
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