import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class LineChart extends BaseChart {

  getChartOptions() {

    var fontSize = 11;
    var labelFontSize = 10;

    const options = {
      theme: "light1",
      animationEnabled: true,
      zoomEnabled: true,
      panEnabled: true,
      colorSet: "customColorSet1",
      rangeChanging: this.onRangeChanged,
      legend: {
        horizontalAlign: "right", // "center" , "right"
        verticalAlign: "top",  // "top" , "bottom"
        fontSize: fontSize,
        fontWeight: "normal",
        itemclick: (e) => {
          e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
          this.renderChart();
        }
      },
      normalized: true,
      title: {
        text: this.getChartName(),
        fontSize: fontSize,
        fontFamily:'Oswald',
        horizontalAlign: "left"
      },
      toolTip:{
        content:"{y}" ,
        fontSize: fontSize,
        backgroundColor: "#f4d5a6",
        updated: this.onToolTipUpdated,
        hidden: this.onToolTipHidden
      },
      axisX: {
        crosshair: {
          enabled: true,
          updated: this.onCrosshairXUpdated,
          hidden: this.onCrosshairXHidden,
          thickness: 0.5,
        },
        valueFormatString: "HH:mm",
        interval: 5,
        intervalType: "minute",
        includeZero: false,
        labelFontSize: labelFontSize,
        lineThickness: 0.4,
        tickLength: 0,
        margin: 10,
      },
      axisY: [{
        gridThickness: 0.1,
        lineThickness: 0.4,
        tickLength: 0,
        crosshair: {
          enabled: true,
          shared: true,
          updated: this.onCrosshairYUpdated,
          hidden: this.onCrosshairYHidden,
          thickness: 0.5
        },
        includeZero: false,
        labelFontSize: labelFontSize

      }],
      axisY2:{
        tickLength:0,
        labelFontSize: labelFontSize,
        gridThickness: 0.1,
        lineThickness: 0.4,
      },
      data: [{
        hoveredMarkerSize: 0.5,
        markerSize: 0,
        type: "line",
        lineThickness: 1,
        showInLegend: true,
        legendText: this.getChartLegendText(),
        xValueType: "dateTime",
        yValueFormatString: "#,##0.00"
      }]
    }
    return options;
  }

  updateInterval() {
    var axisX = this.chart.axisX[0];

    var minViewport = axisX.get("viewportMinimum");
    var maxViewport = axisX.get("viewportMaximum");
    var minuteDiffs = parseInt((maxViewport - minViewport) / 1000 / 60);

    var chartInterval = 0;
    if (minuteDiffs <= 5) {
      chartInterval = 1;
    }
    else if (minuteDiffs <= 30) {
      chartInterval = 2;
    }
    else if (minuteDiffs <= 40) {
      chartInterval = 5;
    }
    else if (minuteDiffs <= 60) {
      chartInterval = 10;
    }
    else if (minuteDiffs <= 120) {
      chartInterval = 15;
    }
    else if (minuteDiffs <= 240) {
      chartInterval = 20;
    } else {
      chartInterval = 30;
    }

    this.chart.options.axisX.interval = chartInterval;

    return chartInterval;
  }

  buildChart() {
    this.chart.container.addEventListener("wheel", (event) => {
      event.preventDefault();

      var chart = this.chart;

      var axisX = chart.axisX[0];
      var currentViewportMin = axisX.get("viewportMinimum");
      var currentViewportMax = axisX.get("viewportMaximum");
      var currentMinuteDiffs = parseInt((currentViewportMax - currentViewportMin) / 1000 / 60);

      var interval = 5 * 60 * 1000;
    
      var newViewportMin, newViewportMax;
    
      if (event.deltaY < 0) {
        newViewportMin = currentViewportMin + interval;
        newViewportMax = currentViewportMax - interval;
      }
      else if (event.deltaY > 0) {
        newViewportMin = currentViewportMin - interval;
        newViewportMax = currentViewportMax + interval;
      }

      if (newViewportMin < this.minDateTimestamp) newViewportMin = this.minDateTimestamp;
      if (newViewportMax > this.currentViewportMax) newViewportMax = this.currentViewportMax;

      var minuteDiffs = parseInt((newViewportMax - newViewportMin) / 1000 / 60);

      if (currentMinuteDiffs !== minuteDiffs && minuteDiffs >= 5) {
        chart.options.axisX.viewportMinimum = newViewportMin;
        chart.options.axisX.viewportMaximum = newViewportMax;
        var chartInterval = this.updateInterval();

        this.syncViewports(chartInterval);
        this.renderChart();
      }
    });
  }

  setDataPoints() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.dataPoints[0] = chartData.map(item => ({ x: item.time, y: item.price }));
  }

  setChartData() {
    this.setDataPoints();
    this.moveDataPointsToChart(this.dataPoints);

    if (this.dataPoints.length && this.dataPoints[0].length)
    {
      var chartData = this.dataPoints[0];

      this.minDateTimestamp = chartData[chartData.length - 1].x.getTime();
      this.maxDateTimestamp = chartData[0].x.getTime();

      var minDate = new Date(this.minDateTimestamp);
      var maxDate = new Date(minDate.getTime() + (60 * 60000));
      if (maxDate.getTime() > this.maxDateTimestamp) maxDate = new Date(this.maxDateTimestamp);

      var axisX = this.chart.options.axisX;
      axisX.viewportMinimum = minDate;
      axisX.viewportMaximum = maxDate;

      axisX.scaleBreaks = {
        customBreaks: [{
          lineThickness: 0,
          collapsibleThreshold: "0%",
          spacing: 0,
          startValue: new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 11, 30, 0),
          endValue: new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 13, 0, 0)
        }]
      };

      this.renderChart();
    }

    this.filterData = false;
    this.renderChart();
    this.filterData = true;

    this.updateChartsInfo(true);
  }
}