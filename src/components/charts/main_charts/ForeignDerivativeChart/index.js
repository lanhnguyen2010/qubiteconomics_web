import LineChart from "components/charts/LineChart";

export default class ForeignDerivativeChart extends LineChart {

  initChartInfo() {
    return {
      key: "foreignDerivative",
      name: "Foreign Derivative",
      legends: [
        {
          key: "NetForeign",
          name: "Net Foreign"
        }
      ]
    }
  }

  initChartOptions(options) {
    options = super.initChartOptions(options);
    options.minMarginRight = 50;
    return options;
  }

}