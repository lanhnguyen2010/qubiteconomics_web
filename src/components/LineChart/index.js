import BaseChart from "components/charts/BaseChart";
import { createChart, CrosshairMode, isBusinessDay } from 'lightweight-charts';
import moment from 'moment';

import './styles.css';

export default class LineChart extends BaseChart {

  constructor(props) {
    super(props);

    this.className = "LineSeries";
  }

  createChart() {
    this.chart = createChart(this.chartContainerRef.current, {
      width: this.chartContainerRef.current.clientWidth,
      height: this.chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        secondsVisible: false
      },
    });

    this.chartLineSeries = this.chart.addLineSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });
  }

  setChartData() {
    this.chartLineSeries.setData(this.props.data.openPrice);

    // var data = this.generateDummyData(true);
    // this.chartLineSeries.setData(data);
  }
}