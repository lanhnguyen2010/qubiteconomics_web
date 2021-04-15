import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {lifecycle} from 'recompose';
import { Provider } from "react-redux";
import _ from "lodash";

import * as ROUTES from './common/Routes';
import store from './store'
import Login from './containers/Login'


const AppStateLess = () => (
  <Provider store={store}>
    <Router>
      <Route path={ROUTES.LOGIN} component={Login}/>
    </Router>
  </Provider>
);

const App = lifecycle({
  componentDidMount() {

  }
})(AppStateLess);

export default App;