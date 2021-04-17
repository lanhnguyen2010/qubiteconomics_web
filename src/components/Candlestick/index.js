import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { createChart, CrosshairMode, isBusinessDay } from 'lightweight-charts';

import { areaData } from './areaData';

import './CandlestickStyles.css';

function Candlestick({data, chartRef}) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const chartSeries = useRef();
  const volumeSeries = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
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
    chartRef(chart);
    chartSeries.current = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
      timeVisible: true
    });
    
    volumeSeries.current = chart.current.addHistogramSeries({
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
    document.body.style.position = 'relative';

    var container = document.createElement('div');
    document.body.appendChild(container);
    const width = chartContainerRef.current.clientWidth;
    const height = chartContainerRef.current.clientHeight;
    
    function businessDayToString(businessDay) {
      return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
    }

    var toolTipWidth = 100;
    var toolTipHeight = 80;
    var toolTipMargin = 15;

    var toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip-2';
    container.appendChild(toolTip);

    chart.current.subscribeCrosshairMove(function(param) {
      if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        toolTip.style.display = 'none';
        return;
      }

      var dateStr = isBusinessDay(param.time)
        ? businessDayToString(param.time)
        : moment(new Date(param.time * 1000)).format("DD MMM YY hh:mm");
    
      toolTip.style.display = 'block';
      var price = param.seriesPrices.get(chartSeries.current);
      var volume = param.seriesPrices.get(volumeSeries.current);

      if (price){

        toolTip.innerHTML = '<div style="color: rgba(255, 70, 70, 1)">' + dateStr +'</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> Open: ' + Math.round(price.open * 100) / 100 + '</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> High: ' + Math.round(price.high * 100) / 100 + '</div>' +
          '<div style="font-size: 12px; margin: 4px 0px"> Close: ' + Math.round(price.close * 100) / 100 + '</div>' +
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
    });
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });


    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);
  
  
  useEffect(() => {

    chartSeries.current.setData(data.priceData);
    console.log("stock data", data);
    volumeSeries.current.setData(data.volumeData);
  },[data]);


  return (
    
    <div className="Candlestick">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}
export default Candlestick
