import * as xanotation from './xanotation.js';

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

    this.debug = new URL(window.location.href).searchParams.get("debug") == "true";
    this.selected = -1;
    this.priorityChartIndex = 4;
  }

  register(mgr) {
    this.chartsManager.push(mgr);
  }

  acquireRenderLock() {
    this.lockRender = true;
  }

  releaseRenderLock() {
    this.lockRender = false;
  }

  setViewRange(minTime, maxTime) {
    this.minViewRangeTime = minTime;
    this.maxViewRangeTime = maxTime;

    if (minTime > 0 && maxTime > 0) {
      this.chartsManager.forEach(mgr => {
        mgr.syncViewRange();
      });
  
      if (this.debug) {
        console.log("Range", this.minViewRangeTime, new Date(this.minViewRangeTime), this.maxViewRangeTime, new Date(this.maxViewRangeTime))  
      }
    }
  }

  setViewport(minTime, maxTime) {
    this.minViewportTime = minTime;
    this.maxViewportTime = maxTime;

    this.chartsManager.forEach(mgr => {
      var navigator = mgr.getOptions().navigator;
      navigator.slider.minimum = this.minViewportTime;
      navigator.slider.maximum = this.maxViewportTime;
    });

    if (this.debug) {
      console.log("View", this.minViewportTime, new Date(this.minViewportTime), this.maxViewportTime, new Date(this.maxViewportTime))
    }

    this.calculateInterval();
    this.calculateInterval(true);
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

    minTime = minTime - (15 * 60 * 1000);
    maxTime = maxTime + (15 * 60 * 1000);

    this.setViewRange(minTime, maxTime);
    if (syncViewport || !this.minViewportTime) {
      this.setViewport(minTime, maxTime);
    }
  }

  triggerRender() {
    if (!this.lockRender && this.renderQueue.length) {
      let chartIndex = this.renderQueue.shift();
      let chartRenderInfo = this.registeredRenderCharts[chartIndex];

      // Render
      if (!this.chartsManager[chartIndex] || !this.chartsManager[chartIndex].ready) {
        // Not ready yet, register again to render later
        this.registerRender(chartIndex, chartRenderInfo.notifyChanges);
      } else {
        this.chartsManager[chartIndex].render(chartRenderInfo.notifyChanges);
      }
    }

    {
      setTimeout(() => {
        this.triggerRender();
      }, 100);
    }
  }

  registerRender(index, notifyChanges) {
    var item = this.registeredRenderCharts[index];
    if (!item) {
      this.registeredRenderCharts[index] = {
        notifyChanges
      }
    } else {
      this.registeredRenderCharts[index] = {
        notifyChanges: notifyChanges || item.notifyChanges
      }
    }
    this.renderQueue.push(index);
  }

  registerRenderCharts(notifyChanges, triggerIndex, forceRenderTrigger) {
    if (forceRenderTrigger && this.chartsManager[triggerIndex]) {
      this.renderChart(triggerIndex);

      // The main chart with slider, should priority update to have better feedback
      if (triggerIndex !== this.priorityChartIndex) this.renderChart(this.priorityChartIndex);
    }

    this.chartsManager.forEach(mgr => {
      if (forceRenderTrigger) {
        if (triggerIndex === mgr.getIndex() || this.priorityChartIndex === mgr.getIndex()) {
          return;
        }
      }
      this.registerRender(mgr.getIndex(), notifyChanges);
    });
  }

  renderChart(chartIndex) {
    // Remove from queue
    var index = this.renderQueue.indexOf(chartIndex);
    if (index !== -1) this.renderQueue.splice(index, 1);

    // Render it
    if (this.chartsManager[chartIndex]) {
      this.chartsManager[chartIndex].render(true);
    }
  }

  calculateInterval(slider) {
    let minViewport = this.minViewportTime || this.minViewRangeTime;
    let maxViewport = this.maxViewportTime || this.maxViewRangeTime;

    // Slider mode, use the range time
    if (slider) {
      minViewport = this.minViewRangeTime;
      maxViewport = this.maxViewRangeTime;
    }

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

    let diffTime = maxViewport - minViewport;

    let breaks = this.chartsManager[0].getAxisXOptions().scaleBreaks.customBreaks;
    breaks.forEach(breakItem => {
      let start = breakItem.startValue;
      let end = breakItem.endValue;

      if (minViewport < start && maxViewport > end) {
        diffTime -= (end - start);
      }
    });

    diffTime /= 1000 * 60;
    diffTime = this.roundNumber(diffTime, true, 1000);

    let intervalType = "minute";
    let labelWidth = 80;
    let labelAngle = 0;

    if (diffTime < 180) {
      intervalType = "second"
      labelWidth = 120;
    } else if (diffTime > 480) {
      intervalType = "hour"
      labelWidth = 200;
      labelAngle = -10;
    } else {
      diffTime /= 60;
    }

    let width = 0;
    for (var i = 0; i < this.chartsManager.length; i++) {
      let mgr = this.chartsManager[i];
      if (mgr.ready && mgr.chart.container) {
        width = mgr.chart.container.clientWidth;
        if (width) {
          break;
        }
      }
    }

    let steps = width / labelWidth;
    if (steps <= 0) steps = 1;

    let diff = diffTime;
    if (intervalType === "second") {
      diff = diffTime * 60;
    } else if (intervalType === "hour") {
      diff = diffTime / 60;
    }

    let interval = parseInt(diff / steps);
    if (interval > 20) {
      interval = this.roundNumber(interval, true, 1000);
    }
    if (interval < 0) interval = 1;

    let labelFormat = "HH:mm";
    if (intervalType === "second") {
      labelFormat = "HH:mm:ss";
    } else if (intervalType === "hour") {
      labelFormat = "DD-MM HH:mm";
    }

    this.log(() => `Interval is ${interval} ${intervalType} with diffs: ${diff}, steps ${steps}, width: ${width} over labelW = ${labelWidth}. Diff in mn ${diffTime}. Format: ${labelFormat}`);

    this.chartsManager.forEach(mgr => {
      let axisX = slider ? mgr.getOptions().navigator.axisX : mgr.getAxisXOptions();
      axisX.interval = interval;
      axisX.intervalType = intervalType;
      axisX.valueFormatString = labelFormat;
      axisX.labelMaxWidth = labelWidth;
      axisX.labelAngle = labelAngle;
    });
  }

  roundNumber(orgValue, up, interval) {
    let newValue = orgValue
    if (interval < 100) {
      if (up) {
        newValue = Math.ceil(newValue);
      } else {
        newValue = Math.floor(newValue);
      }
    } else {
      let value = parseInt(newValue);
      let mod10 = Math.abs(value % 10);
      if (mod10 === 0 || mod10 === 5) return value;

      newValue = parseInt(newValue / 10) * 10;

      if (up) {
        if (mod10 < 5) newValue += 5;
        else newValue += 10;
      } else {
        if (mod10 > 5) newValue -= 5;
      }
    }

    return newValue;
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

  dispatchEvent(orgTriggerIndex, event) {

    let triggerIndex = Math.abs(orgTriggerIndex);

    // Remove events
    if (event.type === "mouseout") {
      this.hideCrosshair(orgTriggerIndex);
      return;
    }

    // Show events
    let orgX = event.offsetX;
    let orgY = event.offsetY;

    let orgChartMgr = this.chartsManager[triggerIndex];
    var orgChart = orgChartMgr.getChart();
    if (!orgChart) return;

    var oriElBounds =  orgChart.container.getBoundingClientRect();
    var ratioY = orgY * 1.0 / oriElBounds.height;
    var xValue = orgChartMgr.getAxisX().convertPixelToValue(orgX);

    this.chartsManager.forEach(mgr => {
      if (!mgr.ready || mgr.getIndex() === orgTriggerIndex) return;

      let chart = mgr.getChart();
      if (!chart) return;

      let axisX = mgr.getAxisX();
      let axisY = mgr.getAxisY();

      let chartElBounds = mgr.chart.container.getBoundingClientRect();
      let clientY = chartElBounds.height * ratioY;
      let clientX = axisX.convertValueToPixel(xValue);
      let yValue = axisY.convertPixelToValue(clientY);

      chart.toolTip.mouseMoveHandler(clientX, clientY);
      axisX.crosshair.showAt(xValue);
      axisY.crosshair.showAt(yValue);
    });
  }

  hideCrosshair(orgTriggerIndex) {
    this.chartsManager.forEach(mgr => {
      if (!mgr.ready || mgr.getIndex() === orgTriggerIndex) return;
      if (!mgr.getChart()) return;

      mgr.getAxisX().crosshair.hide();
      mgr.getAxisY().crosshair.hide();
      mgr.getChart().toolTip.hide();
    });
    return;
  }

  log(fMsg) {
    if (this.debug) {
      console.log(fMsg());
    }
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
    this.ignorePrerender = false;
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

  getAxisX() {
    if (!this.getChart()) return null;
    return this.getChart().axisX[0];
  }

  getAxisY() {
    if (!this.getChart()) return null;
    return this.getChart().axisY2[0];
  }

  getAxisXOptions() {
    return this.getChartOptions().axisX;
  }

  getAxisYOptions() {
    return this.getChartOptions().axisY2;
  }

  getOptions() {
    return this.chart.options;
  }

  getDefaultOptions() {
    return {
      rangeChanging: (event) => this.onRangeChanging(event),
      rangeChanged: (event) => this.onRangeChanged(event),
      minMarginLeft: 20,
      minMarginRight: 20,
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
              label: '',
              hidden: () => {
                this.crosshairShowed = false;
                this.getManager().hideCrosshair(this.getIndex());
              },
              updated: () => {
                this.crosshairShowed = true;
              }
            }
          },
          axisY: { },
          axisY2: {
            crosshair: {
              enabled: true,
              shared: true,
              thickness: 0.5,
              hidden: () => {
                this.crosshairShowed = false;
                this.getManager().hideCrosshair(this.getIndex());
              },
              updated: () => {
                this.crosshairShowed = true;
              }
            }
            /*,labelFormatter: function(e){
              return  "‎‎‎‎‏‏‎ ‎  " + e.value;
            }*/
          },
          data: []
        }
      ],
      navigator: {
        enabled: true,
        height: 0.001,
        width: 0.1,
        slider: {
        },
        axisX: {
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

    this.chart.container.addEventListener("mousemove", (event) => {
      if (!this.ready) return;
      if (this.crosshairShowed) {
        this.getManager().dispatchEvent(this.getIndex(), event);
      }
    });

    this.chart.container.addEventListener("mouseout", (event) => {
      if (!this.ready) return;
      if (this.crosshairShowed) {
        this.getManager().dispatchEvent(this.getIndex(), event);
      }
    });

    this.chart.container.addEventListener("mouseup", () => {
      this.getManager().chartsManager.forEach(mgr => {
        if (mgr.markerArea) {
          mgr.markerArea.close();
          mgr.markerArea.setCurrentMarker();
        }
      })
    });
  }

  activeMarker() {
    if (!this.markerArea) {
      this.markerArea = new xanotation.MarkerArea(this.chart.container);

      this.markerArea.availableMarkerTypes = [
        xanotation.LineMarker,
        xanotation.ArrowMarker,
        xanotation.HighlightMarker,
        xanotation.CalloutMarker,
        xanotation.MeasurementMarker,
        xanotation.CurveMarker
      ]
    }

    this.markerArea.show();
  }

  log(fMsg) {
    if (this.manager.debug) {
      console.log(this.chartInfo.key + ": " + fMsg());
    }
  }

  __onZooming(event) {
    let mgr = this.getManager();
    try
    {
      mgr.acquireRenderLock();

      var viewportMin = mgr.minViewportTime;
      var viewportMax = mgr.maxViewportTime;

      let axisX = this.getAxisXOptions();
      let interval = 0;
      if (axisX.intervalType === "hour") {
        interval = axisX.interval * 60 * 60 * 1000;
      } else if (axisX.intervalType === "second") {
        interval = axisX.interval * 1000;
      } else {
        interval = axisX.interval * 60 * 1000;
      }

      var newViewportMin, newViewportMax;

      if (event.deltaY < 0) {
        newViewportMin = viewportMin + interval;
        newViewportMax = viewportMax - interval;
      }
      else if (event.deltaY > 0) {
        newViewportMin = viewportMin - interval;
        newViewportMax = viewportMax + interval;
      }

      if (newViewportMin < mgr.minViewRangeTime) newViewportMin = mgr.minViewRangeTime;
      if (newViewportMax > mgr.maxViewRangeTime) newViewportMax = mgr.maxViewRangeTime;

      mgr.setViewport(newViewportMin, newViewportMax);
      mgr.registerRenderCharts(true, this.getIndex(), true);
    }
    finally
    {
      mgr.releaseRenderLock();
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
    if (!dataPointsList || !dataPointsList.length) {
      this.getManager().registerRender(this.getIndex());
      return;
    }

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

    this.setScaleBreaks();

    if (this.manager.debug) {
      console.log(this.chartInfo, new Date(this.minDpsTime), new Date(this.maxDpsTime));
    }

    if (!this.ready) {
      this.ready = true;
      this.getManager().fireReadyEvent(this.getIndex());
    }
    else {
      this.getManager().registerRender(this.getIndex(), false);
    }
  }

  setScaleBreaks() {
    // Scale breaks
    let breaks = [];
    let fromDate = new Date(this.minDpsTime); fromDate.setHours(0, 0, 0);
    let toDate = new Date(this.maxDpsTime); toDate.setHours(0, 0, 0);

    while (fromDate <= toDate) {
      let date = fromDate;
      breaks.push({
        lineThickness: 0,
        collapsibleThreshold: "0%",
        spacing: 0,
        startValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
        endValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 29, 0)
      })
      breaks.push({
          lineThickness: 0,
          collapsibleThreshold: "0%",
          spacing: 0,
          startValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 29, 0),
          endValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 59, 0)
      })
      breaks.push({
        lineThickness: 0,
        collapsibleThreshold: "0%",
        spacing: 0,
        startValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 29, 0),
        endValue: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
      })

      fromDate.setDate(fromDate.getDate() + 1);
    }
    this.getAxisXOptions().scaleBreaks = {
      customBreaks: breaks
    };
    this.getOptions().navigator.axisX.scaleBreaks = this.getAxisXOptions().scaleBreaks;

    // this.log(() => `Breakdowns ${stringify(breaks)}`)
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

    this.setScaleBreaks();
  }

  syncViewRange() {
    let minViewRangeTime = this.getManager().minViewRangeTime;
    let maxViewRangeTime = this.getManager().maxViewRangeTime;

    this.getChartOptions().data.forEach((data) => {
      let dps = data.dataPoints;
      if (!dps || !dps.length) {
        return;
      }

      if (this.minDpsTime > minViewRangeTime) {
        dps.unshift({
          x: new Date(minViewRangeTime),
          y: null,
          fake: true
        })
      }

      if (this.maxDpsTime < maxViewRangeTime) {
        dps.push({
          x: new Date(maxViewRangeTime),
          y: null,
          fake: true
        })
      }
    });
  }

  buildStripLine(dataY, index) {
    if (!dataY) return {}

    const axisY = this.getAxisYOptions();
    if (!this.getChart() || !this.getChart().data || !this.getChart().data[index]) return;

    const chartData = this.getChart().data;

    if (!axisY.stripLines || !axisY.stripLines.length){
      axisY.stripLines = [];
      for( var i = 0; i < this.getChartOptions().data.length; i++){
        axisY.stripLines.push({});
      }
    }
    if (this.getChartOptions().data[index].type === 'scatter') return;

    let finalStripline;
    if (axisY.stripLines[index] && axisY.stripLines[index].value) {
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

  buildCustomStripLine(dataY, index) {
    if (!dataY) return {}

    const axisY = this.getAxisYOptions();
    if (!this.getChart() || !this.getChart().data || !this.getChart().data[index]) return;

    const chartData = this.getChart().data;

    if (!axisY.stripLines || !axisY.stripLines.length){
      axisY.stripLines = [];
      for( var i = 0; i < this.getChartOptions().data.length; i++){
        axisY.stripLines.push({});
      }
    }
    if (this.getChartOptions().data[index].type === 'scatter') return;

    let finalStripline;
    if (axisY.stripLines[index] && axisY.stripLines[index].value) {
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

  getChartInfo() {
    let info = {};

    if (!this.getChart().legend) {
      return;
    }

    let values = [];

    let xMin = this.getAxisX().viewportMinimum;
    let xMax = this.getAxisX().viewportMaximum;

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

    let minY = null, maxY= null;
    let minViewportY = null, maxViewportY = null;

    this.dataPoints.forEach((dps, dpsIndex) => {
      let filteredDPs = [];
      var filter = this.chartInfo.legends[dpsIndex].filter !== false;

      let dpsLength = dps.length;
      let sharedY = this.getChartOptions().data[dpsIndex].axisYIndex !== 0;

      for (var i = 0; i < dpsLength;) {
        filteredDPs.push(dps[i]);
        let valueX = dps[i].x.getTime();
        let valueY = dps[i].y;

        if (sharedY) {
          if (valueY !== null) {
            if (minY === null) {
              minY = maxY = valueY;
            } else {
              if (minY > valueY) minY = valueY;
              if (maxY < valueY) maxY = valueY;
            }
          }
        }

        // Visible range
        if (valueX >= minX && valueX <= maxX) {
          if (valueY !== null) {
            stripLinesValue[dpsIndex] = valueY;

            if (sharedY) {
              if (minViewportY === null) {
                minViewportY = maxViewportY = valueY;
              } else {
                if (minViewportY > valueY) minViewportY = valueY;
                if (maxViewportY < valueY) maxViewportY = valueY;
              }
            }
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
    if (minY !== null && this.chart.container) {
      let height = this.chart.container.clientHeight;
      let steps = parseInt((height - 25) / 40);
      if (steps < 5) steps = 5;

      let padding = parseInt(((maxY - minY) / height) * 5);
      minY -= padding;
      maxY += padding;
      minViewportY -= padding;
      maxViewportY += padding;

      minY = this.roundNumber(minY, false);
      maxY = this.roundNumber(maxY, true);
      minViewportY = this.roundNumber(minViewportY, false);
      maxViewportY = this.roundNumber(maxViewportY, true);

      let interval = Math.abs(parseInt((maxViewportY - minViewportY) / steps));
      interval = this.roundNumber(interval, true, 100);

      minY = this.roundNumber(minY, false, interval);
      maxY = this.roundNumber(maxY, true, interval);
      minViewportY = this.roundNumber(minViewportY, false, interval);
      maxViewportY = this.roundNumber(maxViewportY, true, interval);

      let axisY = this.getAxisYOptions();
      axisY.minimum = minY;
      axisY.maximum = maxY;
      axisY.viewportMinimum = minViewportY;
      axisY.viewportMaximum = maxViewportY;
      axisY.interval = interval;
    }

    this.dataPoints.forEach((_, index) => {
      // We moved the stripline manually on UI, skip it
      let value = stripLinesValue[index];
      if (!isNaN(parseInt(value))) {
        this.buildStripLine(value, index);
      }
    })
  }

  render(notifyChanges) {
    if (!this.ignorePrerender) {
    this.beforeRender();
    }
    this.chart.render();

    if (notifyChanges) {
      this.event.dispatch("setValue", {
        index: this.getIndex(),
        info: this.getChartInfo()
      });
    }
  }

  onRangeChanged(event) {
    if (event.trigger === "reset") {
      this.getManager().setViewport(this.manager.minViewRangeTime, this.manager.maxViewRangeTime);
      this.getManager().registerRenderCharts(true, this.getIndex(), true);
    } else if (event.trigger === "marker") {
      this.activeMarker();
    }
  }

  __onRangeChanging(event) {
    this.getManager().acquireRenderLock();
    try
    {
      this.getManager().setViewport(event.minimum, event.maximum);
      this.getManager().registerRenderCharts(true, this.getIndex());
    }
    finally
    {
      this.getManager().releaseRenderLock();
    }
  }

  roundNumber(orgValue, up, interval) {
    let newValue = orgValue
    if (interval < 100) {
      if (up) {
        newValue = Math.ceil(newValue);
      } else {
        newValue = Math.floor(newValue);
      }
    } else {
      let value = parseInt(newValue);
      let mod10 = Math.abs(value % 10);
      if (mod10 === 0 || mod10 === 5) return value;

      newValue = parseInt(newValue / 10) * 10;

      if (up) {
        if (mod10 < 5) newValue += 5;
        else newValue += 10;
      } else {
        if (mod10 > 5) newValue -= 5;
      }
    }

    return newValue;
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