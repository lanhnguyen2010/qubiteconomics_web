import { connect } from "react-redux";
import React from "react";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Form } from 'react-bootstrap';
import CanvasJSReact from 'lib/canvasjs.stock.react';

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
    this.chartRefs.push(this.chartC1Ref = React.createRef());
    this.chartRefs.push(this.chartC2Ref = React.createRef());
    this.chartRefs.push(this.chartC3Ref = React.createRef());
    this.chartRefs.push(this.chartC4Ref = React.createRef());
    this.chartRefs.push(this.chartC5Ref = React.createRef());
    this.chartRefs.push(this.chartC6Ref = React.createRef());
    this.chartRefs.push(this.chartC7Ref = React.createRef());
    this.chartRefs.push(this.chartC8Ref = React.createRef());
    this.chartRefs.push(this.chartC9Ref = React.createRef());
    this.selectedDate = new Date();
  }

  componentDidMount() {
    this.chartRefs.forEach((ref, index) => ref.current.configureChartRelation("DB01", index));
    this.fetchData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async onDatePicked(date) {
    this.selectedDate = date;
    await this.props.setDate(date);
    this.fetchData();
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
              <VN30DerivativeChart ref={this.chartC1Ref} data={{ chartData: this.props.PSOutbound }} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuyupSelldownChart ref={this.chartC4Ref} data={{ chartData: this.props.BusdOutbound, bubblesData: this.props.Arbit }} />
            </Row>
            <Row style={styles.rowCol1}>
              <NETBUSDChart ref={this.chartC7Ref} data={{ chartData: this.props.BusdOutbound, bubblesData: this.props.ArbitUnwind }} />
            </Row>
          </Col>
          <Col style={{paddingLeft: 25, paddingRight: 25}}>
            <Row style={styles.rowCol1}>
              <ForeignDerivativeChart ref={this.chartC2Ref} data={{ chartData: this.props.BuySellNNOutbound }} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuySellPressureChart ref={this.chartC5Ref} data={{ chartData: this.props.BuySellNNOutbound }} />
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
              <SuuF1Chart ref={this.chartC3Ref} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={styles.rowCol3}>
              <FBFSChart ref={this.chartC6Ref} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={styles.rowCol3}>
              <F1BidVAskVChart ref={this.chartC8Ref} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={styles.rowCol3}>
              <NetBSChart ref={this.chartC9Ref} data={{ chartData: this.props.SuuF1Outbound }} />
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
  const body = _.pickBy({ day: date, endTime: range});
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
    setDate:(data) => {
      const formatDate = data.toISOString().slice(0, 10).replaceAll('-','_')
      SettingsRedux.actions.updateSelectedDate(dispatch, formatDate)
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