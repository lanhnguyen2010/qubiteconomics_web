/** @format */
import {connect} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import Candlestick from "../../components/Candlestick";
import LineChart from "../../components/LineChart"
import {
    Container, Row, Col
  } from 'react-bootstrap';
// import { priceData as _priceData } from "components/Candlestick/priceData";
// import { volumnData as _volumnData } from "../../components/Candlestick/volumeData";
import * as VOLUMN from "../../components/Candlestick/volumeData"



function MainDashboardScreen({navigation, _priceData, fetchPriceData}) {
  
  fetchPriceData();

  return (
    <Container>
        <Row>
            <Col><Candlestick data={{priceData: _priceData, volumeData: VOLUMN.volumeData}}/></Col>
            <Col><LineChart/></Col>

        </Row>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => {
  const {actions} = require("../../redux/StockPriceRedux");
  return {
    fetchPriceData: () => actions.fetchPriceData(dispatch)
  }
  // return {
  //     loginSuccess: (payload) => dispatch(actions.loginSuccess(payload)),
  //     loginError: (errorMessage) => dispatch(actions.loginFailure(errorMessage))
  // };
};

const mapStateToProps = ({stockPrice}) => ({
  _priceData: stockPrice.priceData
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboardScreen);