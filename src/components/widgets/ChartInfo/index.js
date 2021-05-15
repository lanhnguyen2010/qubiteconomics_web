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
  }

  componentDidMount() {
    ChartInfoEventBus.on("setValue", (data) => {
      this.setState(prevState => {
        const charts = [...prevState.charts];
        charts[data.index] = data.info;
        return { charts };
      });
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
      // <ReactJson src={info} name={null} iconStyle={"triangle"} displayObjectSize={false} displayDataTypes={false} displayArrayKey={false} />
      <pre>{JSON.stringify(info)}</pre>
    )
  }
}
