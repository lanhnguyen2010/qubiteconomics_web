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
    const { fetchAllData } = this.props;
    fetchAllData();

    for (var i = 0; i < this.chartRefs.length; i++) {
      for (var j = 0; j < this.chartRefs.length; j++) {
        if (i != j) {
          //this.chartRefs[i].current.registerOtherCharts(this.chartRefs[j].current.chart);
        }
      }
    }
  }

  componentWillUnmount() {
  }

  render() {
    console.log("before render chart", this.props);
    return (
      <Container fluid>
        <Row>
            {/* <Col>
              <ForeignDerivativeChart ref={this.chartC1Ref} data={{openPrice: stockPrice.openPrice}} />
            </Col> */}
            <Col>
              <VN30DerivativeChart ref={this.chartC2Ref} data={{chartData: this.props.PSOutbound}} />
            </Col>
            <Col>
              <VN30DerivativeChart ref={this.chartC3Ref} data={{chartData: this.props.PSOutbound}} />
            </Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  const {actions} = require("../../redux/StockPriceRedux");
  return {
    fetchAllData: () =>{
       actions.fetchPSOutboundData(dispatch);
       actions.fetchBusdOutboundData(dispatch);
       actions.fetchBusdNNOutboundData(dispatch);
       actions.fetchBuySellNNOutboundData(dispatch);
       actions.fetchSuuF1OutboundData(dispatch);
       actions.fetchArbitUnwindData(dispatch);
    }
  }
};

const mapStateToProps = (state) => {
  return {
    PSOutbound: state.stockPrice.PSOutbound
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboardScreen);