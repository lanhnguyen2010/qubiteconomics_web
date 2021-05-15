import LineChart from "components/charts/LineChart";

export default class VN30DerivativeChart extends LineChart {

  initChartInfo() {
    return {
      key: "vn30index",
      name: "VN30Index PS",
      legends: [
        {
          key: "CS",
          name: "Co so"
        }
      ]
    }
  }

}