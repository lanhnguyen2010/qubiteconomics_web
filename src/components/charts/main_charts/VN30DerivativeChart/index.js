import LineChart from "components/charts/LineChart";

export default class VN30DerivativeChart extends LineChart {

  getChartName() {
    return "VN30Index PS";
  }

  getChartLegendText(){
    return "Co so";
  }
}