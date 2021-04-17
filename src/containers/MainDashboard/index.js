/** @format */
import {connect} from "react-redux";
import React from "react";
import Candlestick from "../../components/Candlestick";
import LineChart from "../../components/LineChart"
import {
  Container, Row, Col
} from 'react-bootstrap';

class MainDashboardScreen extends React.Component {
  
  constructor(props){
    super(props);
<<<<<<< HEAD

    this.candlestickRef = React.createRef();
    this.lineChartRef = React.createRef();
=======
    this.state = {
      candlestickRef: null,
      lineChartRef: null,
      intervalId: null,
    }
>>>>>>> 0b773c71ef7d58e8ca242808b149668ca2e0388c
  }

  componentDidMount() {
    this.candlestickRef.current.chart.timeScale().subscribeVisibleTimeRangeChange(this.onVisibleTimeRangeChanged.bind(this));
    this.lineChartRef.current.chart.timeScale().subscribeVisibleTimeRangeChange(this.onVisibleTimeRangeChanged.bind(this));

    const { fetchPriceData } = this.props;
    fetchPriceData();
    // const intervelId = setInterval(fetchPriceData, 5000);
    // this.setState({intervalId: intervelId});
  }

<<<<<<< HEAD
  onVisibleTimeRangeChanged(event) {
    this.updateTimeRange(this.lineChartRef.current.chart, event);
    this.updateTimeRange(this.candlestickRef.current.chart, event);
  }

  updateTimeRange(chart, event) {
    if (chart.timeScale().getVisibleRange()) {
      chart.timeScale().setVisibleRange({
        from: event.from,
        to: event.to
      });
    }
=======
  componentDidUpdate() {
    console.log("componentDidUpdate candlestickRef", this.state.candlestickRef);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
>>>>>>> 0b773c71ef7d58e8ca242808b149668ca2e0388c
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