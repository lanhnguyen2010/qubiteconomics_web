/** @format */
import {connect} from "react-redux";
import React, {useEffect, useRef, useState, Component} from "react";
import Candlestick from "../../components/Candlestick";
import LineChart from "../../components/LineChart"
import {
    Container, Row, Col
  } from 'react-bootstrap';
// import { priceData as _priceData } from "components/Candlestick/priceData";
// import { volumnData as _volumnData } from "../../components/Candlestick/volumeData";
import * as VOLUMN from "../../components/Candlestick/volumeData"

class MainDashboardScreen extends Component {
  
  // Similar to componentDidMount and componentDidUpdate
  componentDidMount() {
    const { fetchPriceData } = this.props;
    fetchPriceData();
  }

  render() {
    console.log('props', this.props);
    const { stockPrice } = this.props;
    return (
      <Container>
          <Row>
              <Col><Candlestick data={{priceData: stockPrice.priceData, volumeData: VOLUMN.volumeData}}/></Col>
              <Col><LineChart/></Col>

          </Row>
      </Container>
    )
  }
 
}

const mapDispatchToProps = (dispatch) => {
  const {actions} = require("../../redux/StockPriceRedux");
  return {
    fetchPriceData: () => actions.fetchPriceData(dispatch)
  }
};

const mapStateToProps = (state) => {
  return {
    stockPrice: state.stockPrice
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboardScreen);