import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class LineChart extends BaseChart {

  getChartOptions() {
    const options = {
      theme: "light1",
      animationEnabled: true,
      zoomEnabled: true,
      panEnabled: true,
      colorSet: "customColorSet1",
      rangeChanged: this.onRangeChanged,
      legend: {
        horizontalAlign: "right", // "center" , "right"
        verticalAlign: "top",  // "top" , "bottom"
        fontSize: 9,
        fontWeight: "normal",
        itemclick: (e) => {
          e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
          e.chart.render();
          this.swithToPanMode(e.chart);
        }
      },
      title: {
        text: this.getChartName(),
        fontSize: 10,
        fontFamily:'Oswald',
        horizontalAlign: "left"
      },
      toolTip:{
        content:"{y}" ,
        fontSize: 10,
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
        labelFontSize: 6,
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
        labelFontSize: 6

      }],
      axisY2:{
        tickLength:0,
        labelFontSize: 6,
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
        yValueFormatString: "#,##0.00",
        dataPoints: this.dataPoints
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
    if (minuteDiffs <= 40) {
      chartInterval = 3;
    }
    else if (minuteDiffs <= 60) {
      chartInterval = 5;
    }
    else if (minuteDiffs <= 200) {
      chartInterval = 10;
    } else {
      chartInterval = 20;
    }

    this.chart.axisX[0].set("interval", chartInterval);

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

      if (currentMinuteDiffs !== minuteDiffs && minuteDiffs >= 20) {
        chart.axisX[0].set("viewportMinimum", newViewportMin);
        chart.axisX[0].set("viewportMaximum", newViewportMax);

        var chartInterval = this.updateInterval();

        this.syncViewports(chartInterval);
      }
    });
  }

  setDataPoints()
  {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.price }));
  }

  setChartData() {
    this.setDataPoints();

    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    if (chartData.length)
    {
      var axisX = this.chart.axisX[0];

      var minDate = new Date(chartData[chartData.length - 1].time);
      var maxDate = new Date(minDate.getTime() + (60 * 60000));

      axisX.set("viewportMinimum", minDate);
      axisX.set("viewportMaximum", maxDate);

      this.minDateTimestamp = chartData[chartData.length - 1].time.getTime();
      this.maxDateTimestamp = chartData[0].time.getTime();

      axisX.set("scaleBreaks", {
        customBreaks: [{
          lineThickness: 0,
          collapsibleThreshold: "0%",
          spacing: 0,
          startValue: new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 11, 30, 0),
          endValue: new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 13, 0, 0)
        }]
      });

      this.updateInterval();
    }

    this.chart.render();
    this.swithToPanMode(this.chart);
  }
}