import LineChart from "components/charts/LineChart";

export default class VN30DerivativeChart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "VN30Index PS";
  }

  getChartLegendText(){
    return "Co so";
  }
}