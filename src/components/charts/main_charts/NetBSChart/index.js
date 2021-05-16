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

    this.chart.updateData([
      chartData.map(item => ({ x: item.time, y: item.NetBS }))
    ])
  }

  appendData(data) {
    if (!data || !data.length) return;
    this.chart.appendData([
      data.map(item => ({ x: item.time, y: item.NetBS }))
    ])
  }
}