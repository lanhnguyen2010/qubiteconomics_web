import { connect } from "react-redux";
import React from "react";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CanvasJSReact from "lib/canvasjs.stock.react";
import { XCanvasJSManager } from "utils/xcanvas";
import DatePicker from "react-datepicker";
import ChartInfo from "components/widgets/ChartInfo/index";
import DataParser from "common/DataParser";
import BuyUpBubbleChart from "components/charts/main_charts/BuyUpBubbleChart";
import SellDownBubbleChart from "components/charts/main_charts/SellDownBubbleChart";

import "./index.css";
import { getBuySellBubble } from "services/ChartServiceClient";

const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet1", [
  "#4661EE",
  "#EC5657",
  "green",
  "#8FAABB",
  "#B08BEB",
  "#3EA0DD",
  "#F5A52A",
  "#23BFAA",
  "#FAA586",
  "#EB8CC6",
]);

const interval = 5000;

const styles = {
  container: {
    backgroundColor: "#e6e7ec",
    overflow: "hidden",
  },
  rowContainer: {
    height: "100vh",
  },
  rowCol1: {
    height: "50vh",
    paddingTop: 10,
  },
  rowCol3: {
    height: "33vh",
    paddingTop: 10,
  },
  chartInfoContainer: {
    height: "30vh",
    width: "33vw",
    marginTop: 10,
    overflow: "auto",
  },
};

class MainBubbleChartScreen extends React.Component {
  constructor(props) {
    super(props);

    // Move selectedDate to state
    this.state = {
      isLoading: true,
      selectedDate: this.handleSelectDate(new Date()),
    };

    this.chartRefs = [];
    this.chartRefs.push((this.BuyUpBubbleChartRef = React.createRef()));
    this.chartRefs.push((this.SellDownBubbleChartRef = React.createRef()));

    this.updateChart = this.updateChart.bind(this);

    this.callTimerID = null;
    this.lastCheckDate = null;

    this.realTimeDate = new URL(window.location.href).searchParams.get("rt");
    if (!this.realTimeDate) {
      this.realTimeDate = moment().format("YYYY/MM/DD");
      this.modeSimulate = false;
      this.forceDate = new URL(window.location.href).searchParams.get("fd");
    } else {
      this.modeSimulate = true;
      this.simuateEndTime = 0;
    }

    this.reachEndTime = false;
  }

  componentDidMount() {
    if (!sessionStorage.getItem("hasReloaded")) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
      return;
    }

    this.chartRefs.forEach((ref, index) =>
      ref.current.configureChartRelation("DB01", index)
    );

    let dateString;
    if (this.modeSimulate) {
      dateString = this.realTimeDate;
    } else {
      if (this.forceDate) {
        dateString = this.forceDate;
      } else {
        dateString = this.state.selectedDate;
      }
    }

    this.fetchData(dateString);
  }

  componentWillUnmount() {
    sessionStorage.removeItem("hasReloaded");
    clearInterval(this.callTimerID);
  }

  updateChart = async () => {
    try {
      await this.internalUpdateChart();
    } finally {
      if (!this.reachEndTime) {
        this.callTimerID = setTimeout(this.updateChart, interval);
      }
    }
  };

  internalUpdateChart = async () => {
    let chartManager = XCanvasJSManager.getInstance("DB01");
    if (!chartManager.isReady()) return;

    let requestDpsTime = chartManager.getMinValidDpsTime();
    let requestDate = new Date(requestDpsTime);

    const requestFromTime = moment(requestDate)
      .add(-1, "minutes")
      .format("HH:mm:ss");
    const requestBody = {
      day: this.realTimeDate,
      startTime: requestFromTime,
    };
    if (this.modeSimulate) {
      if (!this.simuateEndTime) this.simuateEndTime = requestDpsTime;
      this.simuateEndTime += 20 * 60 * 1000;

      let date = new Date(this.simuateEndTime);
      if (date.getHours() >= 12 && date.getHours() <= 14) {
        date.setHours(14);
        date.setMinutes(30);
        this.simuateEndTime = date.getTime();
      } else if (date.getHours() >= 16) {
        this.reachEndTime = true;
      }

      requestBody.endTime = moment(date).format("HH:mm:ss");
    } else {
      let toDate = new Date();
      if (toDate.getHours() >= 15) {
        this.reachEndTime = true;
      }
    }
    console.log("requestBody: ", requestBody);
    const startTimestampSeconds =
      new Date(`${requestBody.day} ${requestBody.startTime}`).getTime() / 1000;
    
    const responseBuySellBubble = await getBuySellBubble(
      startTimestampSeconds,
      null,
    );
    const dataParse = DataParser.parseBuySellBubble(responseBuySellBubble);
    this.BuyUpBubbleChartRef.current.appendData(dataParse.buyData);
    this.SellDownBubbleChartRef.current.appendData(dataParse.sellData);
  };

  async onDatePicked(date) {
    const adjustedDate = this.handleSelectDate(date);
    this.setState({ selectedDate: adjustedDate });
    const dateString = moment(adjustedDate).format("YYYY/MM/DD");

    // let chartManager = XCanvasJSManager.getInstance("DB01");
    // chartManager.clear();
    // chartManager.chartsManager.forEach((mgr) => mgr.render(true));

    await this.props.setDate(dateString);
    this.fetchData(adjustedDate);
  }

  async fetchData(dateObj) {
    console.log("dateObj in fetchData: ", dateObj);
    this.setState({ isLoading: true });
    const startTimestampSeconds = new Date(dateObj).setHours(9, 0, 0, 0) / 1000;
    const endTimestampSeconds = new Date(dateObj).setHours(15, 0, 0, 0) / 1000;

    await this.fetchBuySellBubble(startTimestampSeconds, endTimestampSeconds);

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.initViewRange();
    chartManager.registerRenderCharts(true);

    this.setState({ isLoading: false });
  }

  async fetchBuySellBubble(startTimestampSeconds, endTimestampSeconds) {
    console.log("startTimestampSeconds: ", startTimestampSeconds);
    console.log("endTimestampSeconds: ", endTimestampSeconds);
    const response = await getBuySellBubble(
      startTimestampSeconds,
      endTimestampSeconds
    );
    const dataParse = DataParser.parseBuySellBubble(response);
    this.BuyUpBubbleChartRef.current.updateData(dataParse.buyData);
    this.SellDownBubbleChartRef.current.updateData(dataParse.sellData);
    console.log("response: ", response);
  }

  // Adjusts the date if it falls on a weekend.
  handleSelectDate(date) {
    if (date.getDay() === 0) {
      date.setDate(date.getDate() - 2);
    }
    if (date.getDay() === 6) {
      date.setDate(date.getDate() - 1);
    }
    return date;
  }

  render() {
    return (
      <Container fluid style={styles.container}>
        {this.state.isLoading && (
          <div className="loading-overlay">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Row style={styles.rowContainer}>
          <Col xs={10} style={{ paddingLeft: 20 }}>
            <Row style={styles.rowCol1}>
              <BuyUpBubbleChart ref={this.BuyUpBubbleChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <SellDownBubbleChart ref={this.SellDownBubbleChartRef} />
            </Row>
          </Col>
          <Col xs={2} style={{ paddingLeft: 25, paddingRight: 25 }}>
            <Row style={{ paddingTop: 10 }}>
              <DatePicker
                style={{ fontFamily: "Roboto,sans-serif" }}
                selected={this.state.selectedDate}
                onChange={(date) => this.onDatePicked(date)}
                maxDate={new Date()}
                dateFormat="yyyy/MM/dd"
                dayClassName={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                    ? "disabled-date"
                    : undefined
                }
              />
            </Row>
            <Row>
              <Col style={styles.chartInfoContainer}>
                <ChartInfo />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const SettingsRedux = require("../../redux/SettingsRedux");
  return {
    setDate: (date) => {
      SettingsRedux.actions.updateSelectedDate(dispatch, date);
    },
  };
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBubbleChartScreen);