import _ from "lodash";
import BaseChart from "components/charts/BaseChart";

export default class BuyUpBubbleChart extends BaseChart {
  constructor(props) {
    super(props);
    this.uniqueCodes = [];
    this.codeToIndex = {};
  }

  
  prepareDataPoints(rawData, sizeProp = "markerSize") {
    const minMarkerSize = 5;
    const maxMarkerSize = 20;

    // Build a unique list of codes and update the mapping
    this.uniqueCodes = [...new Set(rawData.map((d) => d.code))];
    this.uniqueCodes.forEach((code, i) => {
      this.codeToIndex[code] = i + 1;
    });

    // Map each data object into a CanvasJS dataPoint,
    // clamping the markerSize between minMarkerSize and maxMarkerSize.
    const dataPoints = rawData.map((item) => ({
      x: new Date(item.time),
      y: this.codeToIndex[item.code],
      [sizeProp]: Math.max(minMarkerSize, Math.min(item.radius, maxMarkerSize)),
      code: item.code,
      last: item.last,
      matchedVol: item.matchedVol,
      time: `${new Date(item.time).getHours()}:${new Date(
        item.time
      ).getMinutes()}`,
    }));
    console.log("dataPoints", dataPoints);
    return dataPoints;
  }

  initChartInfo() {
    const baseInfo = super.initChartInfo();
    return {
      ...baseInfo,
      disableScaleBreaks: true,
      key: "buyUpBubble",
      name: "BuyUp Bubble Chart",
      legends: [{ key: "buyUpBubble", name: "BuyUp Bubbles" }],
    };
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);
    const chart = this.getChartOptions(options);
    const rawData = this.props.data || [];
    const labelFontSize = 10;
    const fontFamily = "Roboto,sans-serif";
    const fontSize = 11;

    // Use prepareDataPoints to generate the dataPoints with markerSize
    const dataPoints = this.prepareDataPoints(rawData, "markerSize");

    _.merge(chart, {
      title: {
        text: this.chartInfo.name,
        fontSize: fontSize,
        fontWeight: "bold",
        fontFamily: fontFamily,
        horizontalAlign: "left",
        padding: {
          left: 10,
          top: 5,
          bottom: 5,
        },
      },
      axisX: {
        labelFontSize: labelFontSize,
        labelFontFamily: fontFamily,
        lineThickness: 0.4,
        tickLength: 0,
        margin: 0,
      },
      axisY2: {
        interval: 1,
        tickLength:0,
        labelFontSize: labelFontSize,
        gridThickness: 0,
        lineThickness: 0,
        labelFontFamily: fontFamily,
        margin: 20,
        stripLinesOptions: {
          labelPlacement: "outside",
          labelFontSize: 8,
          lineDashType: "dot",
          thickness: 0.7,
          opacity: 5,
          trimText : false,
          fixedWidth: 30
        },
        disableAutoInterval: true,
        labelFormatter: (e) => {
          const idx = e.value - 1;
          return idx >= 0 && idx < this.uniqueCodes.length
            ? this.uniqueCodes[idx]
            : "";
        },
      },

      data: [
        {
          axisYType: "secondary",
          legendMarkerType: "circle",
          fillOpacity: 0.5,
          color: "#6666ff",
          lineThickness: 1,
          type: "scatter",
          toolTipContent:
            "Time: {time}<br/>Code: {code}<br/>Price: {last}<br/>Total: {matchedVol}",
          dataPoints: dataPoints,
        },
      ],
    });

    return options;
  }

  updateData(chartData) {
    if (!chartData || !chartData.length) return;
    const dataPoints = this.prepareDataPoints(chartData, "markerSize");
    this.chart.updateData([dataPoints]);
  }

  appendData(data) {
    if (!data || !data.length) return;
    const dataPoints = this.prepareDataPoints(data, "markerSize");
    this.chart.appendData([dataPoints]);
  }
}
