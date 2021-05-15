import LineChart from "components/charts/LineChart";

export default class SuuF1Chart extends LineChart {

  initChartInfo() {
    return {
      key: "suuF1",
      name: "Suu F1",
      legends: [
        {
          key: "Last",
          name: "Last"
        }
      ]
    }
  }

}