import BaseChart from "components/charts/BaseChart";

import "./styles.css";
export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "";
  }

  getChartOptions() {
    const options = {
      theme: "light1",
      animationEnabled: true,
      zoomEnabled: true,
      panEnabled: true,
      title: {
        text: this.getChartName()
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        valueFormatString: "HH:mm",
        interval: 5,
        intervalType: "minute",
        includeZero: false,

        tickLength: 2,
        tickColor: "red",
      },
      axisY: {
        crosshair: {
          enabled: true
        },
        includeZero: false
      },
      data: [{
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "#,##0.00",
        dataPoints: this.dataPoints
      }],

      rangeChanged: () => this.syncViewports()
    }
    return options;
  }

  buildChart() {
    this.chart.container.addEventListener("wheel", (event) => {
      event.preventDefault();

      var chart = this.chart;

      var axisX = chart.axisX[0];
      var viewportMin = axisX.get("viewportMinimum");
      var viewportMax = axisX.get("viewportMaximum");
      var interval = 5 * 60 * 1000;
    
      var newViewportMin, newViewportMax;
    
      if (event.deltaY < 0) {
        newViewportMin = viewportMin + interval;
        newViewportMax = viewportMax - interval;
      }
      else if (event.deltaY > 0) {
        newViewportMin = viewportMin - interval;
        newViewportMax = viewportMax + interval;
      }

      if (newViewportMin >= chart.axisX[0].get("minimum") && newViewportMax <= chart.axisX[0].get("maximum") && (newViewportMax - newViewportMin) >= (2 * interval)) {
        chart.axisX[0].set("viewportMinimum", newViewportMin, false);
        chart.axisX[0].set("viewportMaximum", newViewportMax);

        this.syncViewports();
      }
    });

    ["mousemove", "mouseup", "mousedown", "mouseout"].forEach(evt => {
      /*
      this.chart.container.addEventListener(evt, (event) => {
        this.dispatchEvents(this.createEvent(
          event.type,
          event.screenX + this.chart.get("width"),
          event.screenY, 
          event.clientX + this.chart.get("width"),
          event.clientY
        ));
      });
      */
    });

    setTimeout(() => {
      var parentElement = this.chart.container.getElementsByClassName("canvasjs-chart-toolbar")[0];
      var childElement = parentElement.getElementsByTagName("button")[0];
      if (childElement.getAttribute("state") === "pan") {
        childElement.click();
      }
    }, 1500)
  }

  setChartData() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];
    console.log(this.getChartName() + " Chart data: ", chartData)

    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.price }));

    if (chartData.length)
    {
      var axisX = this.chart.axisX[0];

      var minDate = new Date(chartData[chartData.length - 1].time);
      var maxDate = new Date(minDate.getTime() + (60 * 60000));
      console.log(minDate, maxDate);

      axisX.set("viewportMinimum", minDate);
      axisX.set("viewportMaximum", maxDate);

      axisX.set("scaleBreaks", {
        customBreaks: [{
          lineThickness: 0,
          collapsibleThreshold: "0%",
          spacing: 0,
          startValue: new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 11, 30, 0),
          endValue: new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 13, 0, 0)
        }]
      })
    }

    this.chart.render();

    /*
    var chartCv = this.chart.container.getElementsByClassName("canvasjs-chart-canvas")[0];
    var ctx = chartCv.getContext("2d");
    ctx.fillRect(chartCv.width - 200, chartCv.height - 20, 200, 100);
    */
  }
}