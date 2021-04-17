import React from "react";
import { createChart, CrosshairMode } from 'lightweight-charts';

import './CandlestickStyles.css';

export default class Candlestick extends React.Component {

  constructor(props) {
    super(props);

    this.chartContainerRef = React.createRef();
  }

  componentDidMount() {
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

    this.chartSeries = this.chart.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
      timeVisible: true
    });
    this.volumeSeries = this.chart.addHistogramSeries({
      color: '#186233',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    this.chartSeries.setData(this.props.data.priceData);
    this.volumeSeries.setData(this.props.data.volumeData);
  }

  componentDidUpdate() {
    this.chartSeries.setData(this.props.data.priceData);
    this.volumeSeries.setData(this.props.data.volumeData);
  }

  render() {
    return (
      <div className="Candlestick">
        <div ref={this.chartContainerRef} className="chart-container" />
      </div>
    )
  }
}