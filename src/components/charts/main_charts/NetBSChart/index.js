import LineChart from "components/charts/LineChart";

export default class NetBSChart extends LineChart {

  initChartInfo() {
    return {
      key: "netBS",
      name: "Net BS",
      legends: [
        {
          key: "NetBS",
          name: "NetBS"
        }
      ]
    }
  }

  updateData() {
    let chartData = this.props.data.chartData;
    if (!chartData || !chartData.length) return;

    var revesedData = [...chartData].reverse();
    this.chart.updateData([
      revesedData.map(item => ({ x: item.time, y: item.NetBS }))
    ])
  }
}