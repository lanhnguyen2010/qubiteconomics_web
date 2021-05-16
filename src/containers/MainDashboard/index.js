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

const styles = {
  container: {
    backgroundColor: '#e6e7ec',
    overflow:'hidden'
  },
  rowContainer: {
    height: '100vh'
  },
  rowCol1: {
    height: '30vh', 
    paddingTop: 10 
  },
  rowCol3: {
    height: '25vh', paddingTop: 10 
  },
  chartInfoContainer: {
    height: '30vh', width: '33vw', marginTop: 10, overflow: 'auto' 
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
    this.interval = null;

  }

  componentDidMount() {
    this.chartRefs.forEach((ref, index) => ref.current.configureChartRelation("DB01", index));
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateChart = async ()=> {
    const { fetchAllData, settings } = this.props;
    //console.log("updateChart: ", this.chartRefs[0].current.chart.dataPoints)

    if (this.chartRefs && this.chartRefs[0].current && this.chartRefs[0].current.chart && this.chartRefs[0].current.chart.dataPoints && this.chartRefs[0].current.chart.dataPoints[0]){
      let timeRange = this.chartRefs[0].current.chart.dataPoints[0].map(i => i.x);
      let maxCurrentTime = Math.max(...timeRange);

      let currentDate = moment().format('yyyy_MM_DD');
      let currentTime = moment(maxCurrentTime).format('HH:mm:ss');
      let fakeEndTime = moment(maxCurrentTime).add(10, 'minutes').format('HH:mm:ss');
      let requestBody = {
        day: '2021_05_14',
        startTime: currentTime,
        endTime: fakeEndTime
      }

      const ps = await StockAPI.fetchPSOutbound(requestBody);
      const busd = await StockAPI.fetchBusdOutbound(requestBody);
      const buysellNN = await StockAPI.fetchBuySellNNOutbound(requestBody);
      const suuF1 = await StockAPI.fetchSuuF1Outbound(requestBody);
      const arbitUnwind = await StockAPI.fetchArbitUnwind(requestBody);

      this.VN30DerivativeChartRef.current.appendData(DataParser.parsePSOutbound(ps));
      this.BuyupSelldownChartRef.current.appendData({charData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbit(arbitUnwind)});
      this.NETBUSDChartRef.current.appendData({charData: DataParser.parseBusdOutbound(busd), bubblesData: DataParser.parseArbitUnwind(arbitUnwind)});
      this.ForeignDerivativeChartRef.current.appendData(DataParser.parseBuySellNNOutbound(buysellNN));
      this.BuySellPressureChartRef.current.appendData(DataParser.parseBuySellNNOutbound(buysellNN));
      this.SuuF1ChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
      this.FBFSChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
      this.F1BidVAskVChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));
      this.NetBSChartRef.current.appendData(DataParser.parseSuuF1Outbound(suuF1));

      let chartManager = XCanvasJSManager.getInstance("DB01");

      chartManager.shift();
      chartManager.renderCharts(false, true);
    }
  }

  async onDatePicked(date) {
    this.selectedDate = date;
    const dateString = moment(date).format('yyyy_MM_DD')
    await this.props.setDate(dateString);
    this.fetchData();
    if (dateString === moment().add(-2, 'days').format('yyyy_MM_DD')){
      if (this.interval){
        clearInterval(this.interval);
      }
      this.interval = setInterval(this.updateChart, 5000);
    }
    else if (this.interval){
      clearInterval(this.interval);
    }
  }

  fetchData() {
    const { fetchAllData, settings } = this.props;
    const timeDate = getTimeBody(settings);
    fetchAllData(timeDate);
  }

  render() {
    const { settings } = this.props;
    return (
      <Container fluid style={styles.container}>
        <Row style={styles.rowContainer}>
          <Col style={{paddingLeft: 20}}>
            <Row style={styles.rowCol1}>
              <VN30DerivativeChart ref={this.VN30DerivativeChartRef} data={{ chartData: this.props.PSOutbound }} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuyupSelldownChart ref={this.BuyupSelldownChartRef} data={{ chartData: this.props.BusdOutbound, bubblesData: this.props.Arbit }} />
            </Row>
            <Row style={styles.rowCol1}>
              <NETBUSDChart ref={this.NETBUSDChartRef} data={{ chartData: this.props.BusdOutbound, bubblesData: this.props.ArbitUnwind }} />
            </Row>
          </Col>
          <Col style={{paddingLeft: 25, paddingRight: 25}}>
            <Row style={styles.rowCol1}>
              <ForeignDerivativeChart ref={this.ForeignDerivativeChartRef} data={{ chartData: this.props.BuySellNNOutbound }} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuySellPressureChart ref={this.BuySellPressureChartRef} data={{ chartData: this.props.BuySellNNOutbound }} />
            </Row>
            <Row style={styles.rowCol1}>
              <Col>
            <Row>
              <DatePicker style={{ fontFamily: 'Roboto,sans-serif'}} selected={this.selectedDate} onChange={date => this.onDatePicked(date)} />
            </Row>
            <Row style={styles.chartInfoContainer}>
                <ChartInfo />
            </Row>
          </Col>
            </Row>
            
          </Col>
          <Col style={{paddingRight: 21}}>
            <Row style={styles.rowCol3}>
              <SuuF1Chart ref={this.SuuF1ChartRef} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={styles.rowCol3}>
              <FBFSChart ref={this.FBFSChartRef} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={styles.rowCol3}>
              <F1BidVAskVChart ref={this.F1BidVAskVChartRef} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={styles.rowCol3}>
              <NetBSChart ref={this.NetBSChartRef} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const getTimeBody = (settings) => {
  if (!settings) return null;
  const date = settings.selectedDate
  const range = settings.timeRange
  const body = _.pickBy({ day: date, endTime: "10:30:00"});
  return body;
}

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("../../redux/StockPriceRedux");
  const SettingsRedux  = require("../../redux/SettingsRedux");

  return {
    fetchAllData: (data) => {
      actions.fetchPSOutboundData(dispatch, data);
      actions.fetchBusdOutboundData(dispatch, data);
      actions.fetchBusdNNOutboundData(dispatch, data);
      actions.fetchBuySellNNOutboundData(dispatch, data);
      actions.fetchSuuF1OutboundData(dispatch, data);
      actions.fetchArbitUnwindData(dispatch, data);
    },
    setDate:(date) => {
      SettingsRedux.actions.updateSelectedDate(dispatch, date)
    }
  }
};

const mapStateToProps = (state) => {
  return {
    PSOutbound: state.stockPrice.PSOutbound,
    BuySellNNOutbound: state.stockPrice.BuySellNNOutbound,
    SuuF1Outbound: state.stockPrice.SuuF1Outbound,
    BusdOutbound: state.stockPrice.BusdOutbound,
    ArbitUnwind: state.stockPrice.ArbitUnwind,
    Arbit: state.stockPrice.Arbit,
    settings: state.settings
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboardScreen);