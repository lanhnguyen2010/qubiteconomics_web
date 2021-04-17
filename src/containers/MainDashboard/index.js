/** @format */
import {connect} from "react-redux";
import React, {useEffect, useRef, useState, Component} from "react";
import Candlestick from "../../components/Candlestick";
import LineChart from "../../components/LineChart"
import {
    Container, Row, Col
  } from 'react-bootstrap';

class MainDashboardScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      candlestickRef: null,
      lineChartRef: null,
      intervalId: null,
    }
  }

  componentDidMount() {
    const { fetchPriceData } = this.props;
    fetchPriceData();
    // const intervelId = setInterval(fetchPriceData, 5000);
    // this.setState({intervalId: intervelId});
  }

  componentDidUpdate() {
    console.log("componentDidUpdate candlestickRef", this.state.candlestickRef);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    console.log('props', this.props);
    const { stockPrice } = this.props;
    return (
      <Container fluid>
          <Row>
              <Col>
                <Candlestick data={{priceData: stockPrice.priceData, volumeData: stockPrice.volumeData}}
                  chartRef={(r) => {
                  this.setState({candlestickRef : r})
                }}/>
              </Col>
              <Col>
                <LineChart  data={{openPrice: stockPrice.openPrice}} chartRef={(r) => {
                  this.state.lineChartRef = r;
                  if (!this.state.lineChartRef) {
                    this.setState({lineChartRef : r})
                  };
                }}/>
              </Col>

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
  console.log('map to props', state);
  return {
    stockPrice: state.stockPrice
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboardScreen);