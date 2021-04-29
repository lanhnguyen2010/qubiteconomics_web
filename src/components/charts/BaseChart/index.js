import React from "react";

export default class BaseChart extends React.Component {

  constructor(props) {
    super(props);

    this.className = "chart";
    this.chartContainerRef = React.createRef();
  }

  componentDidMount() {
    this.createChart();
    this.setChartData();

    this.bindResizeEvents();
    this.addTooltip();
  }

  componentDidUpdate() {
    this.setChartData();
  }

  createChart() {
  }

  setChartData(){
  }

  bindResizeEvents() {
  }

  addTooltip() {
  }

  generateDummyData(forLineSeries) {
    var times = [];
    var now = new Date();
    for (var d = new Date(2021, 1, 1); d <= now; d.setDate(d.getDate() + 1)) {
      times.push({
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
      });
    }

    var data = [];
    times.forEach(day => {
      if (forLineSeries) {
        data.push({
          date: day.year + "-" + day.month + "-" + day.day,
          value: this.randomInRange(100, 300)
        });
      } else {
        var open = this.randomInRange(100, 140);
        var low = this.randomInRange(90, open - 1);
        var high = this.randomInRange(low + 5, open + 50);
        var close = this.randomInRange(low + 5, high - 5);

        data.push({
          date: day.year + "-" + day.month + "-" + day.day,
          open: open,
          low: low,
          high: high,
          close: close
        });
      }
    });

    return data;
  }

  randomInRange(min, max) {
    return Math.round((Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min)) * 100) / 100;
  }

  businessDayToString(date) {
    return date.year + '-' + date.month + '-' + date.day;
  }

  render() {
    return (
      <div className={this.className}>
        <div ref={this.chartContainerRef} className="chart-container" />
      </div>
    )
  }
}