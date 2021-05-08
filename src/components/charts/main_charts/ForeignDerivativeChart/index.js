import LineChart from "components/charts/LineChart";

export default class ForeignDerivativeChart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "Foreign Derivative";
  }

  getChartLegendText(){
    return "Net Foreign";
  }
}