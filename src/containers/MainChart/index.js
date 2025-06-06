import { connect } from "react-redux";
import React from "react";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Spinner  } from "react-bootstrap";
import CanvasJSReact from "lib/canvasjs.stock.react";
import { XCanvasJSManager } from "utils/xcanvas";

import VN30DerivativeChart from "components/charts/main_charts/VN30DerivativeChart";
import ForeignDerivativeChart from "components/charts/main_charts/ForeignDerivativeChart";
import SuuF1Chart from "components/charts/main_charts/SuuF1Chart";
import BuySellPressureChart from "components/charts/main_charts/BuySellPressureChart";
import FBFSChart from "components/charts/main_charts/FBFSChart";
import F1BidVAskVChart from "components/charts/main_charts/F1BidVAskVChart";
import NetBSChart from "components/charts/main_charts/NetBSChart";
import BuyupSelldownChart from "components/charts/main_charts/BuyupSelldownChart";
import NETBUSDChart from "components/charts/main_charts/NETBUSDChart";
import DatePicker from "react-datepicker";
import ChartInfo from "components/widgets/ChartInfo/index";
import DataParser from "common/DataParser";
import MultiSelectDropdown from "components/MultiSelectDropdown";
import SingleSelectDropdown from "components/SingleSelectDropdown";

import "./index.css";
import { getVN30PS, getFbFs, getBusd, getForeignPS, getBidAskPs, getNetBUSD } from "services/ChartServiceClient";
import { getParameter } from "services/ParameterServiceClient";

const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet1", [
  //colorSet Array
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
    height: "33vh",
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

class MainChartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeOptions: [],
      selectedCodes: [],
      selectedRolling: "",
      isLoading: true,
    };

    this.chartRefs = [];
    this.listCode = [];
    this.chartRefs.push((this.VN30DerivativeChartRef = React.createRef()));
    this.chartRefs.push((this.ForeignDerivativeChartRef = React.createRef()));
    // this.chartRefs.push(this.SuuF1ChartRef = React.createRef());
    // this.chartRefs.push(this.BuyupSelldownChartRef = React.createRef());
    this.chartRefs.push((this.BuySellPressureChartRef = React.createRef()));
    this.chartRefs.push((this.FBFSChartRef = React.createRef()));
    this.chartRefs.push((this.NETBUSDChartRef = React.createRef()));
    this.chartRefs.push((this.F1BidVAskVChartRef = React.createRef()));
    // this.chartRefs.push((this.NetBSChartRef = React.createRef()));

    this.selectedDate = this.handleSelectDate(new Date());
    this.updateChart = this.updateChart.bind(this);

    this.callTimerID = null;
    this.lastCheckDate = null;

    this.realTimeDate = new URL(window.location.href).searchParams.get("rt");
    if (!this.realTimeDate) {
      this.realTimeDate = moment().format("yyyy/MM/DD");
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

    this.BuySellPressureChartRef.current.activeSlider();
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
        this.selectedDate = this.handleSelectDate(new Date());
        dateString = this.selectedDate;
      }
    }
    this.getListCode();
    this.getListRolling();

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
      // Trigger next call
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
    const [
        responseVN30PS,
        responseFBFS,
        responseBUSD,
        responseForeignPS,
        responseBidAskPS
      ] = await Promise.all([
        getVN30PS(startTimestampSeconds, null),
        getFbFs(startTimestampSeconds, null),
        getBusd(startTimestampSeconds, null, this.state.selectedCodes, this.state.selectedRolling),
        getForeignPS(startTimestampSeconds, null),
        getBidAskPs(startTimestampSeconds, null)
      ]);
    const dataBusdParse = DataParser.parseBusd(responseBUSD);

    this.VN30DerivativeChartRef.current.appendData({
      PS: DataParser.parsePSOutbound(responseVN30PS.psList),
      VNIndex30: DataParser.parseVN30Index(responseVN30PS.vn30List),
    });
    this.NETBUSDChartRef.current.appendData(dataBusdParse);
    this.BuySellPressureChartRef.current.appendData(dataBusdParse);
    this.FBFSChartRef.current.appendData(DataParser.parseFBFS(responseFBFS));
    this.ForeignDerivativeChartRef.current.appendData(DataParser.parseForeignPS(responseForeignPS.foreignpsList));
    this.F1BidVAskVChartRef.current.appendData(DataParser.parseBidAskPS(responseBidAskPS.bidaskList));
    // this.NetBSChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
  };

  handleCodesChange = (newSelectedOptions) => {
    this.setState({ selectedCodes: newSelectedOptions }, () => {
      const startTimestampSeconds = new Date(this.selectedDate).setHours(9, 0, 0, 0) / 1000;
      const endTimestampSeconds = new Date(this.selectedDate).setHours(15, 0, 0, 0) / 1000;
      this.fetchBusd(startTimestampSeconds, endTimestampSeconds, this.state.selectedCodes, this.state.selectedRolling)
      this.fetchNetBusd(startTimestampSeconds, endTimestampSeconds, this.state.selectedCodes);
    });
  };

  handleRollingChange = (newSelectedOption) => {
    const rolling = newSelectedOption ? newSelectedOption.value : null;
    this.setState(
      { selectedRolling: rolling }, 
      () => {
        const startTimestampSeconds = new Date(this.selectedDate).setHours(9, 0, 0, 0) / 1000;
        const endTimestampSeconds = new Date(this.selectedDate).setHours(15, 0, 0, 0) / 1000;
        this.fetchBusd(startTimestampSeconds, endTimestampSeconds, this.state.selectedCodes, this.state.selectedRolling);
        this.fetchNetBusd(startTimestampSeconds, endTimestampSeconds, this.state.selectedCodes);
      }
    );
  };

  async onDatePicked(date) {
    this.selectedDate = date;
    const dateString = moment(date).format("yyyy/MM/DD");

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.clear();
    chartManager.chartsManager.forEach((mgr) => mgr.render(true));

    await this.props.setDate(dateString);
    this.fetchData(dateString);
  }

  async getListRolling() {
    const responseParameter = await getParameter("Rolling_options");
    this.setState({
      rollingOptions: JSON.parse(responseParameter?.parameter?.value),
    });
  }

  async getListCode() {
    const responseParameter = await getParameter("VN30_List");
    this.setState({
      codeOptions: JSON.parse(responseParameter?.parameter?.value),
    });
  }

  async fetchData(dateStr) {
    this.setState({ isLoading: true });
    clearInterval(this.callTimerID);

    let requestData = { day: dateStr, endTime: "" };
    if (this.modeSimulate) {
      requestData.endTime = "10:20:00";
    }
    const startTimestampSeconds = new Date(dateStr).setHours(9, 0, 0, 0) / 1000;
    const endTimestampSeconds = new Date(dateStr).setHours(15, 0, 0, 0) / 1000;
    console.log("startTimestampSeconds in fetchData", startTimestampSeconds);
    console.log("endTimestampSeconds in fetchData", endTimestampSeconds);
    await Promise.all([
      this.fetchOthers(startTimestampSeconds, endTimestampSeconds),
      this.fetchFbFs(startTimestampSeconds, endTimestampSeconds),
      this.fetchBusd(startTimestampSeconds, endTimestampSeconds),
      this.fetchNetBusd(startTimestampSeconds, endTimestampSeconds),
      this.fetchForeignPS(startTimestampSeconds, endTimestampSeconds),
      this.fetchBidAskPS(startTimestampSeconds, endTimestampSeconds)
    ]);
  

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.initViewRange();
    chartManager.registerRenderCharts(true);

    if (moment(dateStr).format("yyyy/MM/DD") === this.realTimeDate) {
      this.callTimerID = setTimeout(this.updateChart, interval);
    }

    this.setState({ isLoading: false });
  }

  async fetchOthers(startTimestampSeconds, endTimestampSeconds) {
    const responseVN30PS = await getVN30PS(
      startTimestampSeconds,
      endTimestampSeconds
    );
    const ps = responseVN30PS.psList;
    const vn30Index = responseVN30PS.vn30List;

    // const ps = generatePSMockData(5000);
    // const vn30Index = generateVN30IndexMockData(5000);
    // const busd = generateBusdMockData();
    this.VN30DerivativeChartRef.current.updateData({
      PS: DataParser.parsePSOutbound(ps),
      VNIndex30: DataParser.parseVN30Index(vn30Index),
    });

    // const arbitUnwind = await StockAPI.fetchArbitUnwind(requestBody);
    // const arbitUnwind = generateArbitUnwindMockData();
    // const busdData = DataParser.parseBusdOutbound(busd);
    // this.BuyupSelldownChartRef.current.updateData({chartData: busdData, bubblesData: DataParser.parseArbit(arbitUnwind)});
    // this.NETBUSDChartRef.current.updateData({chartData: busdData, bubblesData: DataParser.parseArbitUnwind(arbitUnwind)});
  }

  async fetchFbFs(startTimestampSeconds, endTimestampSeconds) {
    const responseFBFS = await getFbFs(
      startTimestampSeconds,
      endTimestampSeconds
    );
    this.FBFSChartRef.current.updateData(DataParser.parseFBFS(responseFBFS));
  }

  async fetchForeignPS(startTimestampSeconds, endTimestampSeconds) {
    const responseForeignPS = await getForeignPS(
      startTimestampSeconds,
      endTimestampSeconds
    );
    this.ForeignDerivativeChartRef.current.updateData(DataParser.parseForeignPS(responseForeignPS.foreignpsList));
  }

  async fetchBidAskPS(startTimestampSeconds, endTimestampSeconds) {
    const responseBidAskPS = await getBidAskPs(
      startTimestampSeconds,
      endTimestampSeconds
    );
    this.F1BidVAskVChartRef.current.updateData(DataParser.parseBidAskPS(responseBidAskPS.bidaskList));
  }

  async fetchBusd(startTimestampSeconds, endTimestampSeconds, codes, rolling) {
    const responseBusd = await getBusd(
      startTimestampSeconds,
      endTimestampSeconds,
      codes,
      rolling,
    );
    const dataBusdParse = DataParser.parseBusd(responseBusd);
    this.BuySellPressureChartRef.current.updateData(dataBusdParse);
  }

  async fetchNetBusd(startTimestampSeconds, endTimestampSeconds, codes) {
    const responseNetBusd = await getNetBUSD(
      startTimestampSeconds,
      endTimestampSeconds,
      codes,
    );
    const dataNetBusdParse = DataParser.parseNetBusd(responseNetBusd);
    this.NETBUSDChartRef.current.updateData(dataNetBusdParse);
  }

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
        {/* Loading overlay */}
        {this.state.isLoading && (
          <div className="loading-overlay">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Row style={styles.rowContainer}>
          <Col style={{ paddingLeft: 20 }}>
            <Row style={styles.rowCol1}>
              <VN30DerivativeChart ref={this.VN30DerivativeChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <ForeignDerivativeChart ref={this.ForeignDerivativeChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              {/* <NETBUSDChart ref={this.NETBUSDChartRef} /> */}
            </Row>
          </Col>
          <Col style={{ paddingLeft: 25, paddingRight: 25 }}>
            <Row style={styles.rowCol1}>
              <NETBUSDChart ref={this.NETBUSDChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuySellPressureChart ref={this.BuySellPressureChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <Col>
                <Row>
                  <Col md={3}>
                    <DatePicker
                      wrapperClassName="datePicker"
                      style={{ fontFamily: "Roboto,sans-serif" }}
                      selected={this.selectedDate}
                      onChange={(date) => this.onDatePicked(date)}
                      maxDate={new Date()}
                      dateFormat="yyyy/MM/dd"
                      dayClassName={(date) =>
                        date.getDay() === 0 || date.getDay() === 6
                          ? "disabled-date"
                          : undefined
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <MultiSelectDropdown
                      options={this.state.codeOptions}
                      placeholder="Select codes"
                      onChange={this.handleCodesChange}
                    />
                  </Col>
                  <Col md={3}>
                    <SingleSelectDropdown
                      options={this.state.rollingOptions}
                      placeholder="Select a rolling"
                      onChange={this.handleRollingChange}
                    />
                  </Col>
                </Row>
                <Row style={styles.chartInfoContainer}>
                  <ChartInfo />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col style={{ paddingRight: 21 }}>
            <Row style={styles.rowCol3}>
              <FBFSChart ref={this.FBFSChartRef} />
            </Row>
            <Row style={styles.rowCol3}>
              <F1BidVAskVChart ref={this.F1BidVAskVChartRef} />
            </Row>
            {/* <Row style={styles.rowCol3}>
              <NetBSChart ref={this.NetBSChartRef} />
            </Row> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainChartScreen);
