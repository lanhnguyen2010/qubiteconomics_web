import { connect } from "react-redux";
import React from "react";
import moment from "moment-timezone";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from 'react-bootstrap';
import CanvasJSReact from 'lib/canvasjs.stock.react';
import { XCanvasJSManager } from 'utils/xcanvas';

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
import StockAPI from 'services/StockAPI';
import DataParser from 'common/DataParser';

import "./index.css";
import { generateArbitUnwindMockData, generateBusdMockData, generateBuySellNNMockData, generatePSMockData, generateSuuF1OutboundMockData, generateVN30IndexMockData } from "mockData/mockDataChart";
import { getVN30PS, getFbFs } from "services/ChartServiceClient";

const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet1",
[
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
    backgroundColor: '#e6e7ec',
    overflow:'hidden'
  },
  rowContainer: {
    height: '100vh'
  },
  rowCol1: {
    height: '33vh', 
    paddingTop: 10 
  },
  rowCol3: {
    height: '33vh', paddingTop: 10 
  },
  chartInfoContainer: {
    height: '60vh', width: '33vw', marginTop: 10, overflow: 'auto' 
  }
}

class MainChartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.chartRefs = [];
    this.chartRefs.push(this.VN30DerivativeChartRef = React.createRef());
    this.chartRefs.push(this.ForeignDerivativeChartRef = React.createRef());
    // this.chartRefs.push(this.SuuF1ChartRef = React.createRef());
    // this.chartRefs.push(this.BuyupSelldownChartRef = React.createRef());
    this.chartRefs.push(this.BuySellPressureChartRef = React.createRef());
    this.chartRefs.push(this.FBFSChartRef = React.createRef());
    this.chartRefs.push(this.NETBUSDChartRef = React.createRef());
    this.chartRefs.push(this.F1BidVAskVChartRef = React.createRef());
    this.chartRefs.push(this.NetBSChartRef = React.createRef());

    this.selectedDate = this.handleSelectDate(new Date());
    this.updateChart = this.updateChart.bind(this);

    this.callTimerID = null;
    this.lastCheckDate = null;

    this.realTimeDate = new URL(window.location.href).searchParams.get("rt");
    if (!this.realTimeDate) {
      this.realTimeDate = moment().format('yyyy/MM/DD');
      this.modeSimulate = false;
      this.forceDate = new URL(window.location.href).searchParams.get("fd");
    } else {
      this.modeSimulate = true;
      this.simuateEndTime = 0;
    }

    this.reachEndTime = false;
  }

  componentDidMount() {
    if (!sessionStorage.getItem('hasReloaded')) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
      return; 
    }

    this.BuySellPressureChartRef.current.activeSlider();
    this.chartRefs.forEach((ref, index) => ref.current.configureChartRelation("DB01", index));

    let dateString;
    if (this.modeSimulate) {
      dateString = this.realTimeDate
    } else {
      if (this.forceDate) {
        dateString = this.forceDate;
      } else {
        this.selectedDate = this.handleSelectDate(new Date());
        dateString = this.selectedDate
      }
    }

    this.fetchData(dateString);
  }

  componentWillUnmount() {
    sessionStorage.removeItem('hasReloaded');
    clearInterval(this.callTimerID);
  }

  updateChart = async ()=> {
    try {
      await this.internalUpdateChart();
    } finally {
      // Trigger next call
      if (!this.reachEndTime) {
        this.callTimerID = setTimeout(this.updateChart, interval);
      }
    }
  }

  internalUpdateChart = async ()=> {
    let chartManager = XCanvasJSManager.getInstance("DB01");
    if (!chartManager.isReady()) return;

    let requestDpsTime = chartManager.getMinValidDpsTime();
    let requestDate = new Date(requestDpsTime);

    const requestFromTime = moment(requestDate).add(-1, "minutes").format("HH:mm:ss");
    const requestBody = {
      day: this.realTimeDate,
      startTime: requestFromTime,
    }
    if (this.modeSimulate) {
      if (!this.simuateEndTime) this.simuateEndTime = requestDpsTime;
      this.simuateEndTime += (20 * 60 * 1000);

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

    const startTimestampSeconds = new Date(requestBody.startTime).getTime() / 1000;
    const endTimestampSeconds = new Date(requestBody.endTime).getTime() / 1000;
    const responseVN30PS = await getVN30PS(startTimestampSeconds, endTimestampSeconds);
    const responseFBFS = await getFbFs(startTimestampSeconds, endTimestampSeconds);

    // const ps = await StockAPI.fetchPSOutbound(requestBody);
    // const vn30index = await StockAPI.fetchVN30IndexdOutbound(requestBody);
    // const busd = await StockAPI.fetchBusdOutbound(requestBody);
    // const buysellNN = await StockAPI.fetchBuySellNNOutbound(requestBody);
    // const suuF1 = await StockAPI.fetchSuuF1Outbound(requestBody);
    // const arbitUnwind = await StockAPI.fetchArbitUnwind(requestBody);

    this.VN30DerivativeChartRef.current.appendData({PS: DataParser.parsePSOutbound(responseVN30PS.psList), VNIndex30: DataParser.parseVN30Index(responseVN30PS.vn30List)});
    // this.BuyupSelldownChartRef.current.appendData({chartData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbit(arbitUnwind)});
    // this.NETBUSDChartRef.current.appendData({chartData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbitUnwind(arbitUnwind)});
    // this.ForeignDerivativeChartRef.current.appendData(DataParser.parseBuySellNNOutbound(buysellNN));
    // this.BuySellPressureChartRef.current.appendData(DataParser.parseFBFS(responseFBFS));
    // this.SuuF1ChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
    this.FBFSChartRef.current.appendData(DataParser.parseFBFS(responseFBFS));
    // this.F1BidVAskVChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
    // this.NetBSChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
    
  }

  async onDatePicked(date) {
    this.selectedDate = date;
    const dateString = moment(date).format('yyyy/MM/DD');

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.clear();
    chartManager.chartsManager.forEach(mgr => mgr.render(true));

    await this.props.setDate(dateString);
    this.fetchData(dateString);
  }


  async fetchData(dateStr) {
    clearInterval(this.callTimerID);

    console.log("Date", dateStr);

    let requestData = { day: dateStr, endTime: ""};
    if (this.modeSimulate) {
      requestData.endTime = "10:20:00";
    }
    const startTimestampSeconds = new Date(dateStr).setHours(9, 0, 0, 0) / 1000; 
    const endTimestampSeconds = new Date(dateStr).setHours(15, 0, 0, 0) / 1000;
    console.log("startTimestampSeconds in fetchData", startTimestampSeconds);
    console.log("endTimestampSeconds in fetchData", endTimestampSeconds);
    // await this.fetchSuuF1(requestBody);
    // await this.fetchBuySellNN(requestBody);
    await this.fetchOthers(startTimestampSeconds, endTimestampSeconds);
    await this.fetchFbFs(startTimestampSeconds, endTimestampSeconds);

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.initViewRange();
    chartManager.registerRenderCharts(true);

    if (dateStr === this.realTimeDate) {
      this.callTimerID = setTimeout(this.updateChart, interval);
    }
  }

  async fetchBuySellNN(requestBody) {
    // let buysellNN = await StockAPI.fetchBuySellNNOutbound(requestBody);
    const buysellNN = generateBuySellNNMockData();
    let parsedData = DataParser.parseBuySellNNOutbound(buysellNN);
    this.ForeignDerivativeChartRef.current.updateData(parsedData);
    this.BuySellPressureChartRef.current.updateData(parsedData);
  }

  async fetchSuuF1(requestBody) {
    // const suuF1 = await StockAPI.fetchSuuF1Outbound(requestBody);
    const suuF1 = generateSuuF1OutboundMockData();
    this.SuuF1ChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
    this.FBFSChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
    this.F1BidVAskVChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
    this.NetBSChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
  }

  async fetchOthers(startTimestampSeconds, endTimestampSeconds) {
    const responseVN30PS = await getVN30PS(startTimestampSeconds, endTimestampSeconds);
    console.log("responseVN30PS", responseVN30PS);
    const ps = responseVN30PS.psList;
    const vn30Index = responseVN30PS.vn30List;

    // const ps = generatePSMockData(5000);
    // const vn30Index = generateVN30IndexMockData(5000);
    // const busd = generateBusdMockData();
    this.VN30DerivativeChartRef.current.updateData({PS: DataParser.parsePSOutbound(ps), VNIndex30: DataParser.parseVN30Index(vn30Index)});

    // const arbitUnwind = await StockAPI.fetchArbitUnwind(requestBody);
    // const arbitUnwind = generateArbitUnwindMockData();
    // const busdData = DataParser.parseBusdOutbound(busd);
    // this.BuyupSelldownChartRef.current.updateData({chartData: busdData, bubblesData: DataParser.parseArbit(arbitUnwind)});
    // this.NETBUSDChartRef.current.updateData({chartData: busdData, bubblesData: DataParser.parseArbitUnwind(arbitUnwind)});
  }

  async fetchFbFs(startTimestampSeconds, endTimestampSeconds) {
    const responseFBFS = await getFbFs(startTimestampSeconds, endTimestampSeconds);
    console.log("FBFS", responseFBFS);
    this.FBFSChartRef.current.updateData(DataParser.parseFBFS(responseFBFS));
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
        <Row style={styles.rowContainer}>
          <Col style={{paddingLeft: 20}}>
            <Row style={styles.rowCol1}>
              <VN30DerivativeChart ref={this.VN30DerivativeChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuySellPressureChart ref={this.BuySellPressureChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <NETBUSDChart ref={this.NETBUSDChartRef} />
            </Row>
          </Col>
          <Col style={{paddingLeft: 25, paddingRight: 25}}>
            <Row style={styles.rowCol1}>
              <ForeignDerivativeChart ref={this.ForeignDerivativeChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <Col>
            <Row>
              <DatePicker style={{ fontFamily: 'Roboto,sans-serif'}} selected={this.selectedDate} onChange={date => this.onDatePicked(date)} maxDate={new Date()}
                          dateFormat="yyyy/MM/dd" dayClassName={date => date.getDay() === 0 || date.getDay() === 6 ? 'disabled-date' : undefined}
              />
            </Row>
            <Row style={styles.chartInfoContainer}>
                <ChartInfo />
            </Row>
          </Col>
            </Row>
            
          </Col>
          <Col style={{paddingRight: 21}}>
            <Row style={styles.rowCol3}>
              <FBFSChart ref={this.FBFSChartRef} />
            </Row>
            <Row style={styles.rowCol3}>
              <F1BidVAskVChart ref={this.F1BidVAskVChartRef} />
            </Row>
            <Row style={styles.rowCol3}>
              <NetBSChart ref={this.NetBSChartRef} />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  const SettingsRedux  = require("../../redux/SettingsRedux");
  return {
      setDate:(date) => {
      SettingsRedux.actions.updateSelectedDate(dispatch, date)
    }
  }
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChartScreen);