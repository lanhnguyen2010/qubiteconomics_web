import {connect} from "react-redux";
import React from "react";

import VN30DerivativeChart from "components/charts/main_charts/VN30DerivativeChart";
import ForeignDerivativeChart from "components/charts/main_charts/ForeignDerivativeChart";

import {
    Container, Row, Col, Form
} from 'react-bootstrap';

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
    }

    componentDidMount() {
        const {fetchAllData} = this.props;
        fetchAllData();

        for (var i = 0; i < this.chartRefs.length; i++) {
            for (var j = 0; j < this.chartRefs.length; j++) {
                if (i != j) {
                    this.chartRefs[i].current.registerOtherCharts(this.chartRefs[j].current.chart);
                }
            }
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Container fluid>
                <Row style={{height: '100vh'}}>
                    <Col>
                        <Row style={{height: '30vh'}}>
                            <VN30DerivativeChart ref={this.chartC1Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                        <Row style={{height: '30vh'}}>
                            <VN30DerivativeChart ref={this.chartC2Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                        <Row style={{height: '30vh'}}>
                            <VN30DerivativeChart ref={this.chartC3Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{height: '25vh'}}>
                            <VN30DerivativeChart ref={this.chartC4Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                        <Row style={{height: '25vh'}}>
                            <VN30DerivativeChart ref={this.chartC5Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                        <Row style={{height: '10vh'}}></Row>
                        <Row style={{height: '30vh'}}>
                            <Col></Col>
                            <Col> <Form.Control type="date"></Form.Control></Col>
                            <Col></Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{height: '30vh'}}>
                            <VN30DerivativeChart ref={this.chartC6Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                        <Row style={{height: '30vh'}}>
                            <VN30DerivativeChart ref={this.chartC7Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                        <Row style={{height: '30vh'}}>
                            <VN30DerivativeChart ref={this.chartC8Ref} data={{chartData: this.props.PSOutbound}}/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    const {actions} = require("../../redux/StockPriceRedux");
    return {
        fetchAllData: () => {
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