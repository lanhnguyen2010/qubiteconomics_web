﻿/*
CanvasJS React StockCharts - https://canvasjs.com/
Copyright 2021 fenopix

--------------------- License Information --------------------
CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
https://canvasjs.com/license/

*/

var React = require('react');
var CanvasJS = require('./canvasjs.stock.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

class CanvasJSChart extends React.Component {
	static _cjsContainerId = 0
	constructor(props) {
		super(props);
		this.options = props.options ? props.options : {};
		this.containerProps = props.containerProps ? props.containerProps : { width: "100%", position: "relative" };
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
		this.chartContainerId = "canvasjs-react-chart-container-" + CanvasJSChart._cjsContainerId++;
	}
	componentDidMount() {
		//Create Chart and Render		
		this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);

		if (this.props.onRef)
			this.props.onRef(this.chart);
	}
	shouldComponentUpdate(nextProps, nextState) {
		//Check if Chart-options has changed and determine if component has to be updated
		return !(nextProps.options === this.options);
	}
	componentDidUpdate() {
		//Update Chart Options & Render
		this.chart.options = this.props.options;
	}
	componentWillUnmount() {
		//Destroy chart and remove reference
		this.chart.destroy();
		if (this.props.onRef)
			this.props.onRef(undefined);
	}
	render() {
		//return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });		
		return <div id={this.chartContainerId} style={this.containerProps} />
	}
}

class CanvasJSStockChart extends React.Component {
	static _cjsContainerId = 0
	constructor(props) {
		super(props);
		this.options = props.options ? props.options : {};
		this.containerProps = props.containerProps ? props.containerProps : { width: "100%", position: "relative" };
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "600px";
		this.chartContainerId = "canvasjs-react-stockchart-container-" + CanvasJSStockChart._cjsContainerId++;
	}
	componentDidMount() {
		//Create Chart and Render		
		this.stockChart = new CanvasJS.StockChart(this.chartContainerId, this.options);

		if (this.props.onRef)
			this.props.onRef(this.stockChart);
	}
	shouldComponentUpdate(nextProps, nextState) {
		//Check if Chart-options has changed and determine if component has to be updated
		return !(nextProps.options === this.options);
	}
	componentDidUpdate() {
		//Update Chart Options & Render
		this.stockChart.options = this.props.options;
	}
	componentWillUnmount() {
		//Destroy chart and remove reference
		this.stockChart.destroy();
		if (this.props.onRef)
			this.props.onRef(undefined);
	}
	render() {
		//return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });		
		return <div id={this.chartContainerId} style={this.containerProps} />
	}
}

var CanvasJSReact = {
	CanvasJSChart: CanvasJSChart,
	CanvasJSStockChart: CanvasJSStockChart,
	CanvasJS: CanvasJS
};

export default CanvasJSReact;