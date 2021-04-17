import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import './styles.css';
function LineChart({data, chartRef}) {
    const chartContainerRef = useRef();
    const chart = useRef();
    const lineSeries = useRef();
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
    
        lineSeries.current = chart.current.addLineSeries({
          upColor: '#4bffb5',
          downColor: '#ff4976',
          borderDownColor: '#ff4976',
          borderUpColor: '#4bffb5',
          wickDownColor: '#838ca1',
          wickUpColor: '#838ca1',
        });
      }, []);
        
  useEffect(() => {


    lineSeries.current.setData(data.openPrice);
  },[data]);

  return (
    <div className="LineSeries">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default LineChart;