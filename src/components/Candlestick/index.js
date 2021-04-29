import BaseChart from "components/charts/BaseChart";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import './CandlestickStyles.css';
export default class Candlestick extends BaseChart {

  constructor(props) {
    super(props);

    this.className = "Candlestick";
  }

  createChart() {
    var chart = this.chart = am4core.create(this.chartContainerRef.current, am4charts.XYChart);

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    var series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.simplifiedProcessing = true;
    series.tooltipText = "Open: ${openValueY.value}\nLow: ${lowValueY.value}\nHigh: ${highValueY.value}\nClose: ${valueY.value}";

    chart.cursor = new am4charts.XYCursor();

    // a separate series for scrollbar
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    lineSeries.defaultState.properties.visible = false;

    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;
  }

  addTooltip() {
  }

  setChartData() {
    // this.chartSeries.setData(this.props.data.priceData);
    // this.volumeSeries.setData(this.props.data.volumeData);

    this.chart.data = this.generateDummyData(false);
  }
}