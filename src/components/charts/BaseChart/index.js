import React from "react";
import _ from "lodash";
import { XCanvasJS } from "utils/xcanvas";
import CanvasJSReact from 'lib/canvasjs.stock.react';

const CanvasJSChart = CanvasJSReact.CanvasJSStockChart;
const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet1",
[
  "#4661EE",
  "#EC5657",
  "green",
  "#8FAABB",
  "#B08BEB",
  "#3EA0DD",
  "#F5A52A",
  "#23BFAA",
  "#FAA586",
  "#EB8CC6",
]);

export default class BaseChart extends React.Component {

  constructor(props) {
    super(props);

    // Init chart references
    this.chartJS = null;
    this.chart = new XCanvasJS();

    this.chartInfo =  this.initChartInfo();
    this.chartOptions = this.initChartOptions(this.chart.getDefaultOptions());
  }

  componentDidMount() {
    this.chart.init(this.chartJS, this.chartInfo, this.chartOptions);
    this.chart.registerEvents();
  }

  componentDidUpdate() {
  }

  updateData() {
  }

  appendData() {
  }

  initChartInfo() {
    return {
      name: "Chart"
    };
  }

  initChartOptions(options) {
    options = _.merge(options, {
      theme: "light1",
      animationEnabled: true,
      animationDuration: 1500,
      colorSet: "customColorSet1",
      charts: [
        {
          zoomEnabled: true,
          panEnabled: true,
        }
      ]
    })
    return options;
  }

  activeSlider(options) {
    options = options || this.chartOptions;
    options = this.mergeOptions(options, {
      navigator: {
        enabled: true,
        height: 0,
        width: 0,
        slider: {
        },
        axisX: {
        }
      },
    })
  }

  getChartOptions(options) {
    return options.charts[0];
  }

  getFullChartsOptions(){
    return this.chartOptions;
  }

  configureChartRelation(id, index) {
    this.chart.configureChartRelation(id, index);
  }

  setIndex(index) {
    this.chart.setIndex(index);
  }

  registerRender() {
    this.chart.getManager().registerRender(this.chart.getIndex());
  }

  render() {
    const containerProps = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    return (
      <CanvasJSChart options={this.chartOptions} onRef={ref => this.chartJS = ref} containerProps={containerProps} />
    )
  }
}