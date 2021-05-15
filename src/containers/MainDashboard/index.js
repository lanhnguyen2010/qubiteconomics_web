import { connect } from "react-redux";
import React from "react";
import _ from "lodash";

import VN30DerivativeChart from "components/charts/main_charts/VN30DerivativeChart";
import ForeignDerivativeChart from "components/charts/main_charts/ForeignDerivativeChart";
import SuuF1Chart from "components/charts/main_charts/SuuF1Chart";
import BuySellPressureChart from "components/charts/main_charts/BuySellPressureChart";
import FBFSChart from "components/charts/main_charts/FBFSChart";
import F1BidVAskVChart from "components/charts/main_charts/F1BidVAskVChart";
import NetBSChart from "components/charts/main_charts/NetBSChart";
import BuyupSelldownChart from "components/charts/main_charts/BuyupSelldownChart";
import NETBUSDChart from "components/charts/main_charts/NETBUSDChart";
import style from "./index.css"

import {
  Container, Row, Col, Form
} from 'react-bootstrap';
import {fromArray} from "@amcharts/amcharts4/.internal/core/utils/Iterator";
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
  }

  componentDidMount() {
    const { fetchAllData, settings } = this.props;
    const timeDate = getTimeBody(settings);
    fetchAllData(timeDate);

    for (var i = 0; i < this.chartRefs.length; i++) {
      for (var j = 0; j < this.chartRefs.length; j++) {
        if (i !== j) {
          this.chartRefs[i].current.registerOtherCharts(this.chartRefs[j].current.chart);
        }
      }
    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Container fluid style={{backgroundColor: '#e6e7ec', overflow:'hidden'}}>
        <Row style={{ height: '100vh'}}>
          <Col style={{paddingLeft: 20}}>
            <Row style={{ height: '30vh', paddingTop: 10 }}>
              <VN30DerivativeChart ref={this.chartC1Ref} data={{ chartData: this.props.PSOutbound }} />
            </Row>
            <Row style={{ height: '30vh', paddingTop: 10 }}>
              <BuyupSelldownChart ref={this.chartC2Ref} data={{ chartData: this.props.BusdOutbound, bubblesData: this.props.Arbit }} />
            </Row>
            <Row style={{ height: '30vh', paddingTop: 10 }}>
              <NETBUSDChart ref={this.chartC3Ref} data={{ chartData: this.props.BusdOutbound, bubblesData: this.props.ArbitUnwind }} />
            </Row>
          </Col>
          <Col style={{paddingLeft: 20, paddingRight: 20}}>
            <Row style={{ height: '30vh', paddingTop: 10, borderRadius: 16 }}>
              <ForeignDerivativeChart ref={this.chartC4Ref} data={{ chartData: this.props.BuySellNNOutbound }} />
            </Row>
            <Row style={{ height: '30vh', paddingTop: 10 }}>
              <BuySellPressureChart ref={this.chartC5Ref} data={{ chartData: this.props.BuySellNNOutbound }} />
            </Row>
            <Row style={{ height: '30vh', paddingTop: 10 }}>
              <Col></Col>
              <Col> <Form.Control type="date"></Form.Control></Col>
              <Col></Col>
            </Row>
          </Col>
          <Col style={{paddingLeft: 20}}>
            <Row style={{ height: '25vh', paddingTop: 10 }}>
              <SuuF1Chart ref={this.chartC6Ref} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={{ height: '25vh', paddingTop: 10 }}>
              <FBFSChart ref={this.chartC7Ref} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={{ height: '25vh', paddingTop: 10 }}>
              <F1BidVAskVChart ref={this.chartC8Ref} data={{ chartData: this.props.SuuF1Outbound }} />
            </Row>
            <Row style={{ height: '25vh', paddingTop: 10 }}>
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
  const body = _.pickBy({ day: '', endTime: range});
  return body;
}

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("../../redux/StockPriceRedux");

  return {
    fetchAllData: (data) => {
      actions.fetchPSOutboundData(dispatch, data);
      actions.fetchBusdOutboundData(dispatch, data);
      actions.fetchBusdNNOutboundData(dispatch, data);
      actions.fetchBuySellNNOutboundData(dispatch, data);
      actions.fetchSuuF1OutboundData(dispatch, data);
      actions.fetchArbitUnwindData(dispatch, data);
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