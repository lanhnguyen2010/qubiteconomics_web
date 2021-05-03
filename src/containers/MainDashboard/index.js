/** @format */
import {connect} from "react-redux";
import React from "react";

import VN30DerivativeChart from "components/charts/main_charts/VN30DerivativeChart";
import ForeignDerivativeChart from "components/charts/main_charts/ForeignDerivativeChart";

import {
  Container, Row, Col
} from 'react-bootstrap';

class MainDashboardScreen extends React.Component {
  
  constructor(props){
    super(props);

    this.chartRefs = [];
    //this.chartRefs.push(this.chartC1Ref = React.createRef());
    this.chartRefs.push(this.chartC2Ref = React.createRef());
    this.chartRefs.push(this.chartC3Ref = React.createRef());
  }

  componentDidMount() {
    const { fetchPriceData } = this.props;
    fetchPriceData();

    for (var i = 0; i < this.chartRefs.length; i++) {
      for (var j = 0; j < this.chartRefs.length; j++) {
        if (i != j) {
          this.chartRefs[i].current.registerOtherCharts(this.chartRefs[j].current.chart);
        }
      }
    }
  }

  onVisibleTimeRangeChanged(event) {
  }

  updateTimeRange(chart, event) {
  }

  componentWillUnmount() {
  }

  render() {
    const { priceVN30Data } = this.props;
    return (
      <Container fluid>
        <Row>
            {/* <Col>
              <ForeignDerivativeChart ref={this.chartC1Ref} data={{openPrice: stockPrice.openPrice}} />
            </Col> */}
            <Col>
              <VN30DerivativeChart ref={this.chartC2Ref} data={{openPrice: priceVN30Data}} />
            </Col>
            <Col>
              <VN30DerivativeChart ref={this.chartC3Ref} data={{openPrice: priceVN30Data}} />
            </Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  const {actions} = require("../../redux/StockPriceRedux");
  return {
    fetchPriceData: () =>{
       actions.fetchPriceVN30Data(dispatch)
    }
  }
};

const mapStateToProps = (state) => {
  console.log('map to props', state);
  return {
    priceVN30Data: state.priceVN30Data
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboardScreen);