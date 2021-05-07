import BaseChart from "components/charts/BaseChart";

import './styles.css';
export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);
  }

  buildChart() {
    var chart = this.chart;
    this.chart.addEventListener("wheel", (e) => {
      e.preventDefault();
      
      if(e.clientX < chart.plotArea.x1 || e.clientX > chart.plotArea.x2 || e.clientY < chart.plotArea.y1 || e.clientY > chart.plotArea.y2)
        return;
        
      var axisX = chart.axisX[0];
      var viewportMin = axisX.get("viewportMinimum"),
          viewportMax = axisX.get("viewportMaximum"),
          interval = axisX.get("minimum");
    
      var newViewportMin, newViewportMax;
    
      if (e.deltaY < 0) {
        newViewportMin = viewportMin + interval;
        newViewportMax = viewportMax - interval;
      }
      else if (e.deltaY > 0) {
        newViewportMin = viewportMin - interval;
        newViewportMax = viewportMax + interval;
      }
    
      if(newViewportMin >= chart.axisX[0].get("minimum") && newViewportMax <= chart.axisX[0].get("maximum") && (newViewportMax - newViewportMin) > (2 * interval)){
        chart.axisX[0].set("viewportMinimum", newViewportMin, false);
        chart.axisX[0].set("viewportMaximum", newViewportMax);
      }
    });
  }

  getChartName() {
    return "";
  }

  getChartOptions() {
    const options = {
      theme: "light1",
      animationEnabled: true,
      title: {
        text: this.getChartName()
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        valueFormatString: "HH:mm:ss",
        interval: 1,
        intervalType: "hour",
        includeZero: false,

        tickLength: 2,
        tickColor: "red"
      },
      axisY: {
        title: "Price",
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
      navigator: {
        backgroundColor: "#D3D3D3"
      }
    }
    return options;
  }

  setChartData() {
    let chartData = this.props.data.chartData;
    if (!chartData) chartData = [];

    this.chart.options.data[0].dataPoints = chartData.map(item => ({ x: item.time, y: item.price }));
    this.chart.render();
  }
}