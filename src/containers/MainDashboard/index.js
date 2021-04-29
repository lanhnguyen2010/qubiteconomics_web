/** @format */
import {connect} from "react-redux";
import React from "react";
import Candlestick from "components/Candlestick";
import LineChart from "components/LineChart";

import {
  Container, Row, Col
} from 'react-bootstrap';

class MainDashboardScreen extends React.Component {
  
  constructor(props){
    super(props);

    this.candlestickRef = React.createRef();
    this.lineChartRef = React.createRef();
  }

  componentDidMount() {
    const { fetchPriceData } = this.props;
    fetchPriceData();
  }

  onVisibleTimeRangeChanged(event) {
  }

  updateTimeRange(chart, event) {
  }

  componentWillUnmount() {
  }

  render() {
    const { stockPrice } = this.props;
    return (
      <Container fluid>
        <Row>
            <Col>
              <Candlestick ref={this.candlestickRef} data={{priceData: stockPrice.priceData, volumeData: stockPrice.volumeData}} />
            </Col>
            <Col>
              <LineChart ref={this.lineChartRef} data={{openPrice: stockPrice.openPrice}} />
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