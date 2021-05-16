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
      this.setViewport(this.minViewportTime, maxDpsTime);
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

  renderCharts(forceRender, notifyChanges) {
    this.chartsManager.forEach(mgr => {
      mgr.renderChart(forceRender, notifyChanges);
    });
  }

  fireReadyEvent(triggerIndex) {
    this.chartsManager[triggerIndex].renderChart(true, true);
  }

  isReady() {
    if (!this.ready) {
      this.ready = this.chartsManager.every(mgr => mgr.ready);
    }
    return this.ready;
  }

  dispatchEvent(triggerIndex, event, customEventType) {
    var orgZone = event.target.getBoundingClientRect();
    var diffX = event.clientX - orgZone.x;
    var diffY = event.clientY - orgZone.y;

    this.chartsManager.forEach(mgr => {
      if (mgr.getIndex() === triggerIndex) return;

      var zone = mgr.chart.container.getElementsByClassName("canvasjs-chart-canvas")[1];
      var chartZone = zone.getBoundingClientRect();

      zone.dispatchEvent(this.createEvent(
        customEventType || event.type,
        event.screenX,
        event.screenY,
        chartZone.x + diffX,
        chartZone.y + diffY
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
          this.renderChart(true);
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
        this.getManager().setAtRightSide(newViewportMax === this.maxDpsTime);
        this.getManager().calculateInterval();
      }

      this.getManager().renderCharts(false, true);
      this.getManager().dispatchEvent(-1, event, "mousemove");
    });

    ["mousemove", "mouseup", "mousedown", "mouseout"].forEach(evtName => {
      this.chart.container.addEventListener(evtName, (event) => {
        this.getManager().dispatchEvent(this.getIndex(), event);
      });
    })
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

  registerOtherCharts(ref) {
    this.otherChartRefs.push(ref);
  }

  updateData(dataPointsList) {
    if (!dataPointsList || !dataPointsList.length) return;

    this.dataPoints = [];
    dataPointsList.forEach(dps => this.dataPoints.push(dps));

    this.dataPoints.forEach((dps, index) => {
      try {
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
      } catch (e){}
    });

    var minDisplayTime = this.minDpsTime;
    var maxDisplayTime = this.maxDpsTime;

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

    try {
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
    } catch (e) {
      
    }
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

  fireChartInfoChangesEvent() {
    this.event.dispatch("setValue", {
      index: this.getIndex(),
      info: this.getChartInfo()
    });
  }

  onRangeChanged(event) {
    this.manager.setViewport(event.axisX[0].viewportMinimum, event.axisX[0].viewportMaximum);
    this.manager.setAtRightSide(event.axisX[0].viewportMaximum === this.maxDpsTime);
    this.manager.renderCharts(false, true);
  }
}

export {
  EventBus as XCanvasInfoEvent,
  XCanvasJSManager,
  XCanvasJS
}