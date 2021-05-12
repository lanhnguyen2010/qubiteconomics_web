import LineChart from "components/charts/LineChart";

export default class ForeignDerivativeChart extends LineChart {

  getChartName() {
    return "Foreign Derivative";
  }

  getChartLegendText(){
    return "Net Foreign";
  }
}