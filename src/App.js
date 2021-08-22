import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { lifecycle } from 'recompose';
import { Provider } from "react-redux";

import store from './store'
import MainDashboard from './containers/MainDashboard'
import RangeDashboard from './containers/RangeDashboard'

const AppStateLess = () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={MainDashboard}/>
      <Route path="/range" component={RangeDashboard}/>
    </Router>
  </Provider>
);

const App = lifecycle({
  componentDidMount() {
      document.title = "Stock chart"
  }
})(AppStateLess);

export default App;