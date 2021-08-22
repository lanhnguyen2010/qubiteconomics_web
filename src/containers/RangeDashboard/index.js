import { connect } from "react-redux";
import React from "react";
import moment from "moment-timezone";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from 'react-bootstrap';
import CanvasJSReact from 'lib/canvasjs.stock.react';
import { XCanvasJSManager } from 'utils/xcanvas';

import VN30DerivativeChart from "components/charts/main_charts/VN30DerivativeChart";
import BuySellPressureChart from "components/charts/main_charts/BuySellPressureChart";
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
    height: '49vh', 
    paddingTop: 10 
  },
  rowCol3: {
    height: '24.8vh', paddingTop: 10 
  },
  chartInfoContainer: {
    height: '28vh', width: '33vw', marginTop: 10, overflow: 'auto' 
  }
}

class RangeDashboardScreen extends React.Component {

  constructor(props) {
    super(props);

    this.chartRefs = [];
    this.chartRefs.push(this.VN30DerivativeChartRef = React.createRef());
    this.chartRefs.push(this.BuySellPressureChartRef = React.createRef());

    this.toDate = this.correctDate(moment()).startOf('day');
    this.fromDate = this.toDate.clone();

    let count = 5;
    while (count > 1) {
        count--;
        this.fromDate = this.correctDate(this.fromDate.add(-1, "day"));
    }
  }

  correctDate(date, forward) {
    while (date.weekday() === 0 || date.weekday() === 6) {
        date = date.add(forward ? 1 : -1, 'day')
    }
    return date;
  }

  formatDate(date) {
    return date.format('yyyy_MM_DD');
  }

  componentDidMount() {
    this.BuySellPressureChartRef.current.activeSlider();

    this.chartRefs.forEach((ref, index) => ref.current.configureChartRelation("DB02", index));
    this.fetchData(this.fromDate, this.toDate);
  }

  async fetchData(fromDate, toDate) {
    let chartManager = XCanvasJSManager.getInstance("DB02");

    chartManager.log(() => `Fetch data from ${fromDate} to ${toDate}`)

    let date = fromDate.clone();
    toDate = toDate.clone().add(1, 'day');

    let first = true;
    while (date.isBefore(toDate))
    {
        await this.fetchChartData(date.clone(), first);
        date = this.correctDate(date.add(1, 'day'), true);
        first = false;
    }

    chartManager.initViewRange();
    chartManager.registerRenderCharts(true);
  }

  async fetchChartData(date, first) {
    let request = { day: this.formatDate(date) };
    let requestBody = _.pickBy(request);

    let buysellNN  = await StockAPI.fetchBuySellNNOutbound(requestBody);
    let ps         = await StockAPI.fetchPSOutbound(requestBody);
    let vn30Index  = await StockAPI.fetchVN30IndexdOutbound(requestBody);

    if (first) {
        this.VN30DerivativeChartRef.current.updateData({PS: DataParser.parsePSOutbound(ps, date), VNIndex30: DataParser.parseVN30Index(vn30Index, date)});
        this.BuySellPressureChartRef.current.updateData(DataParser.parseBuySellNNOutbound(buysellNN, date));
    } else {
        this.VN30DerivativeChartRef.current.appendData({PS: DataParser.parsePSOutbound(ps, date), VNIndex30: DataParser.parseVN30Index(vn30Index, date)});
        this.BuySellPressureChartRef.current.appendData(DataParser.parseBuySellNNOutbound(buysellNN, date));
    }
  }

  render() {
    return (
      <Container fluid style={styles.container}>
        <Row style={styles.rowContainer}>
          <Col style={{paddingLeft: 20, paddingRight: 20}}>
            <Row style={styles.rowCol1}>
              <VN30DerivativeChart ref={this.VN30DerivativeChartRef} />
            </Row>
            <Row style={styles.rowCol1}>
              <BuySellPressureChart ref={this.BuySellPressureChartRef} />
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
)(RangeDashboardScreen);