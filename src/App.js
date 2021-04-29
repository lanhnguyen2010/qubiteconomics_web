import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {lifecycle} from 'recompose';
import { Provider } from "react-redux";

import * as ROUTES from './common/Routes';
import store from './store'
import MainDashboard from './containers/MainDashboard'


const AppStateLess = () => (
  <Provider store={store}>
    <Router>
      <Route path="" component={MainDashboard}/>
    </Router>
  </Provider>
);

const App = lifecycle({
  componentDidMount() {

  }
})(AppStateLess);

export default App;