import { connect } from "react-redux";
import React from "react";
import moment from "moment-timezone";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from 'react-bootstrap';
import CanvasJSReact from 'lib/canvasjs.stock.react';
import { XCanvasJSManager } from 'utils/xcanvas';

import Candlestick from "components/charts/CandlestickChart";
import StockAPI from 'services/StockAPI';

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

const styles = {
  container: {
    backgroundColor: '#e6e7ec',
    overflow:'hidden'
  },
  rowContainer: {
    height: '100vh'
  },
  rowCol1: {
    height: '80vh', 
    paddingTop: 10 
  },
  rowCol3: {
    height: '24.8vh', paddingTop: 10 
  },
  chartInfoContainer: {
    height: '28vh', width: '33vw', marginTop: 10, overflow: 'auto' 
  }
}

class DemoScreen extends React.Component {

  constructor(props) {
    super(props);

    this.chartRefs = [];
    this.chartRefs.push(this.Candlestick = React.createRef());
    this.selectedDate = new Date();
    this.updateChart = this.updateChart.bind(this);

    this.callTimerID = null;
    this.lastCheckDate = null;

    this.realTimeDate = new URL(window.location.href).searchParams.get("rt");
    if (!this.realTimeDate) {
      this.realTimeDate = moment().format('yyyy_MM_DD');
      this.modeSimulate = false;
      this.forceDate = new URL(window.location.href).searchParams.get("fd");
    } else {
      this.modeSimulate = true;
      this.simuateEndTime = 0;
    }

    this.reachEndTime = false;
  }

  componentDidMount() {
    this.chartRefs.forEach((ref, index) => ref.current.configureChartRelation("DB01", index));
    this.fetchData();
  }

  componentWillUnmount() {
    clearInterval(this.callTimerID);
  }

  updateChart = async ()=> {
  }

  internalUpdateChart = async ()=> {

  }

  async fetchData(dateStr) {
    await this.fetchCandlestick();
  }

  async fetchCandlestick(requestBody) {
    let candlestick = await StockAPI.fetchCandlestick(requestBody);
    this.Candlestick.current.updateData(candlestick);
  }

  render() {
    return (
      <Container fluid style={styles.container}>
        <Row style={styles.rowContainer}>
          <Col style={{paddingLeft: 20}}>
            <Row style={styles.rowCol1}>
              <Candlestick ref={this.Candlestick}/>
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
)(DemoScreen);