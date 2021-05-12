import LineChart from "components/charts/LineChart";

export default class SuuF1Chart extends LineChart {

  getChartName() {
    return "F1 BidV, AskV";
  }

  getChartLegendText(){
    return "last";
  }

}