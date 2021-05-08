import LineChart from "components/charts/LineChart";

export default class SuuF1Chart extends LineChart {

  constructor(props) {
    super(props);
  }

  getChartName() {
    return "SUU F1";
  }

}