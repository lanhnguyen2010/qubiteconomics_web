import React from "react";
import ReactJson from 'react-json-view';

import ChartInfoEventBus from "components/widgets/ChartInfo/Event";
import "./style.css";

export default class ChartInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      charts: [] // {name, from, to}
    };

    this.pendingChanges = [];
    this.pendingChangesTime = null;
  }

  componentDidMount() {
    ChartInfoEventBus.on("setValue", (data) => {
      this.pendingChanges.push(data);
      this.pendingChangesTime = new Date();
    });

    setInterval(() => {
      if (this.pendingChangesTime && new Date().getTime() - this.pendingChangesTime.getTime() > 200) {
        this.updateState();
        this.pendingChangesTime = null;
      }
    }, 200);
  }

  updateState() {
    if (!this.pendingChanges.length) return;

    var changes = this.pendingChanges;
    this.pendingChanges = [];

    this.setState(prevState => {
      const charts = [...prevState.charts];

      changes.forEach(chart => {
        charts[chart.index] = chart.info;
      })

      return { charts };
    });
  }

  componentWillUnmount() {
    ChartInfoEventBus.remove("setValue");
  }

  render() {
    let { charts } = this.state;

    let info = {};
    charts.forEach(chart => {
      if (chart && chart.values) {
        info[chart.name] = {
          time: [new Date(chart.time[0]).toTimeString().slice(0, 8), new Date(chart.time[1]).toTimeString().slice(0, 8)]
        };
        chart.values.forEach(legend => {
          info[chart.name][legend.name] = legend.range;
        })
      }
    })

    return (
      // <pre>{stringify(info, {maxLength: 80})}</pre>
      <ReactJson src={info} name={null} iconStyle={"triangle"} displayObjectSize={false} displayDataTypes={false} displayArrayKey={false} />
    )
  }
}
