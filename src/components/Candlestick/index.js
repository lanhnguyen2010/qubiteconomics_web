import BaseChart from "components/charts/BaseChart";
import { createChart, CrosshairMode, isBusinessDay } from 'lightweight-charts';
import moment from 'moment';

import './CandlestickStyles.css';

export default class Candlestick extends BaseChart {

  constructor(props) {
    super(props);

    this.className = "Candlestick";
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
  }

  addTooltip() {
    var container = document.createElement('div');
    document.body.appendChild(container);
    const height = this.chartContainerRef.current.clientHeight;

    var toolTipHeight = 140;
    var toolTipMargin = 15;

    var toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip-2';
    container.appendChild(toolTip);

    this.chart.subscribeCrosshairMove((param) => {
      if (!param.time) {
        toolTip.style.display = 'none';
        return;
      }

      var dateStr = isBusinessDay(param.time) ? this.businessDayToString(param.time) : moment(new Date(param.time * 1000)).format("DD MMM YY hh:mm");

      toolTip.style.display = 'block';
      var price = param.seriesPrices.get(this.chartSeries);
      var volume = param.seriesPrices.get(this.volumeSeries);

      if (price) {
        toolTip.innerHTML = '<div style="color: rgba(255, 70, 70, 1)">' + dateStr +'</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> Open: ' + Math.round(price.open * 100) / 100 + '</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> Close: ' + Math.round(price.close * 100) / 100 + '</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> Low: ' + Math.round(price.low * 100) / 100 + '</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> High: ' + Math.round(price.high * 100) / 100 + '</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> Volume: ' + Math.round(volume * 100) / 100 + '</div>';
      }

      var y = param.point.y;

      var left = param.point.x + 100;
      var top = y + toolTipMargin;
      if (top > height - toolTipHeight) {
        top = y - toolTipHeight - toolTipMargin;
      }

      toolTip.style.left = left + 'px';
      toolTip.style.top = param.point.y + 'px';
    })
  }

  setChartData() {
    /*
    this.chartSeries.setData(this.props.data.priceData);
    this.volumeSeries.setData(this.props.data.volumeData);
    */

    this.chartSeries.setData(this.generateDummyData(false));
    this.volumeSeries.setData(this.generateDummyData(true));
  }
}