import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { lifecycle } from 'recompose';
import { Provider } from "react-redux";

import store from './store'
import MainDashboard from './containers/MainDashboard'
import Demo from './containers/Demo'

const AppStateLess = () => (
  <Provider store={store}>
    <Router>
      <Switch>      
        <Route path="/demo" component={Demo} />
        <Route path="/" component={MainDashboard} />
      </Switch>
    </Router>
  </Provider>
);

const App = lifecycle({
  componentDidMount() {
      document.title = "Stock chart"
  }
})(AppStateLess);

export default App;