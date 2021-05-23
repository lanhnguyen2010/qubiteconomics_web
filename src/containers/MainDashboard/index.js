import { connect } from "react-redux";
import React from "react";
import moment from "moment-timezone";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Form } from 'react-bootstrap';
import CanvasJSReact from 'lib/canvasjs.stock.react';
import { XCanvasJSManager } from 'lib/xcanvas';

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
const minutesToFetch = 30;

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
    height: '24.8vh', paddingTop: 10 
  },
  chartInfoContainer: {
    height: '28vh', width: '33vw', marginTop: 10, overflow: 'auto' 
  }
}

class MainDashboardScreen extends React.Component {

  constructor(props) {
    super(props);

    this.chartRefs = [];
    this.chartRefs.push(this.VN30DerivativeChartRef = React.createRef());
    this.chartRefs.push(this.ForeignDerivativeChartRef = React.createRef());
    this.chartRefs.push(this.SuuF1ChartRef = React.createRef());
    this.chartRefs.push(this.BuyupSelldownChartRef = React.createRef());
    this.chartRefs.push(this.BuySellPressureChartRef = React.createRef());
    this.chartRefs.push(this.FBFSChartRef = React.createRef());
    this.chartRefs.push(this.NETBUSDChartRef = React.createRef());
    this.chartRefs.push(this.F1BidVAskVChartRef = React.createRef());
    this.chartRefs.push(this.NetBSChartRef = React.createRef());
    this.selectedDate = new Date();
    this.updateChart = this.updateChart.bind(this);

    this.callTimerID = null;
    this.lastCheckDate = null;

    this.realTimeDate = new URL(window.location.href).searchParams.get("rt");
    if (!this.realTimeDate) {
      this.realTimeDate = moment().format('yyyy_MM_DD');
      this.modeSimulate = false;
    } else {
      this.modeSimulate = true;
    }

    this.reachEndTime = false;
  }

  componentDidMount() {
    this.chartRefs.forEach((ref, index) => ref.current.configureChartRelation("DB01", index));

    let dateString;
    if (this.modeSimulate) {
      dateString = this.realTimeDate
    } else {
      let currentDate = moment();
      if (currentDate.day() === 0 ||currentDate.day() === 6){
        currentDate.add(-2, 'day')
        this.selectedDate = new Date(currentDate);
      }
      dateString = currentDate.format('yyyy_MM_DD')
    }

    this.fetchData(dateString);
  }

  componentWillUnmount() {
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
      let date = new Date(requestDpsTime + (20 * 60 * 1000));
      if (date.getHours() >= 12 && date.getHours() <= 14 && date.getMinutes() < 10) {
        date.setHours(14);
        date.setMinutes(10);
      }
      const requestToTime = moment(date).format("HH:mm:ss");
      requestBody.endTime = requestToTime;
    } else {
      let toDate = new Date();
      if (toDate.getHours() >= 15 || (toDate.getHours() >= 14 && toDate.getMinutes() > 50)) {
        this.reachEndTime = true;
      }
    }

    const ps = await StockAPI.fetchPSOutbound(requestBody);
    const busd = await StockAPI.fetchBusdOutbound(requestBody);
    const buysellNN = await StockAPI.fetchBuySellNNOutbound(requestBody);
    const suuF1 = await StockAPI.fetchSuuF1Outbound(requestBody);
    const arbitUnwind = await StockAPI.fetchArbitUnwind(requestBody);

    this.VN30DerivativeChartRef.current.appendData({PS: DataParser.parsePSOutbound(ps), VNIndex30: DataParser.parseVN30Index(busd)});
    this.BuyupSelldownChartRef.current.appendData({chartData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbit(arbitUnwind)});
    this.NETBUSDChartRef.current.appendData({chartData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbitUnwind(arbitUnwind)});
    this.ForeignDerivativeChartRef.current.appendData(DataParser.parseBuySellNNOutbound(buysellNN));
    this.BuySellPressureChartRef.current.appendData(DataParser.parseBuySellNNOutbound(buysellNN));
    this.SuuF1ChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
    this.FBFSChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
    this.F1BidVAskVChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
    this.NetBSChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));

    chartManager.shift();
    chartManager.registerRenderCharts(true);
  }

  async onDatePicked(date) {
    this.selectedDate = date;
    const dateString = moment(date).format('yyyy_MM_DD');

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.clear();
    chartManager.registerRenderCharts(true);

    await this.props.setDate(dateString);
    this.fetchData(dateString);
  }

  async fetchData(dateStr) {
    clearInterval(this.callTimerID);

    let request = { day: dateStr, endTime: ""};
    if (this.modeSimulate) {
      request.endTime = "10:20:00";
    }
    const requestBody = _.pickBy(request);

    await this.fetchSuuF1(requestBody);
    await this.fetchBuySellNN(requestBody);
    const ps = await StockAPI.fetchPSOutbound(requestBody);
    const busd = await StockAPI.fetchBusdOutbound(requestBody);
    this.VN30DerivativeChartRef.current.updateData({PS: DataParser.parsePSOutbound(ps), VNIndex30: DataParser.parseVN30Index(busd)});

    const arbitUnwind = await StockAPI.fetchArbitUnwind(requestBody);
    this.BuyupSelldownChartRef.current.updateData({chartData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbit(arbitUnwind)});
    this.NETBUSDChartRef.current.updateData({chartData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbitUnwind(arbitUnwind)});

    let chartManager = XCanvasJSManager.getInstance("DB01");
    chartManager.initViewport();
    chartManager.registerRenderCharts(true);

    if (dateStr === this.realTimeDate) {
      this.callTimerID = setTimeout(this.updateChart, interval);
    }
  }

  async fetchBuySellNN(requestBody) {
    const buysellNN = await StockAPI.fetchBuySellNNOutbound(requestBody);
    this.ForeignDerivativeChartRef.current.updateData(DataParser.parseBuySellNNOutbound(buysellNN));
    this.BuySellPressureChartRef.current.updateData(DataParser.parseBuySellNNOutbound(buysellNN));
  }

  async fetchSuuF1(requestBody) {
    const suuF1 = await StockAPI.fetchSuuF1Outbound(requestBody);
    this.SuuF1ChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
    this.FBFSChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
    this.F1BidVAskVChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
    this.NetBSChartRef.current.updateData(DataParser.parseSuuF1Outbound(suuF1));
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
              <BuyupSelldownChart ref={this.BuyupSelldownChartRef} />
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
              <BuySellPressureChart ref={this.BuySellPressureChartRef} />
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
              <SuuF1Chart ref={this.SuuF1ChartRef} />
            </Row>
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
)(MainDashboardScreen);