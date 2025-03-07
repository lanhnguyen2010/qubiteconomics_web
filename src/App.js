import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { lifecycle, withState, compose } from 'recompose';
import { Provider } from 'react-redux';

import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './store';
import MainDashboard from './containers/MainDashboard';
import RangeDashboard from './containers/RangeDashboard';
import Demo from './containers/Demo';
import LoginScreen from './containers/Login';

import './App.css';

// A helper component to restrict access to protected routes.
const PrivateRoute = ({ component: Component, isAuthenticated, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} user={user} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// Presentational App component
const AppStateLess = ({ isAuthenticated, setIsAuthenticated, user, setUser }) => (
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Switch>
          {/* Root route: Decide where to go based on isAuthenticated */}
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>

          {/* Login route: If already authenticated, skip login and go to dashboard */}
          <Route
            path="/login"
            render={(props) =>
              isAuthenticated ? (
                <Redirect to="/dashboard" />
              ) : (
                <LoginScreen
                  {...props}
                  setAuthInfo={(loggedInUser) => {
                    setIsAuthenticated(true);
                    setUser(loggedInUser);
                  }}
                />
              )
            }
          />

          {/* Protected routes */}
          <PrivateRoute
            path="/dashboard"
            component={MainDashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/range"
            component={RangeDashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/demo"
            component={Demo}
            isAuthenticated={isAuthenticated}
          />

          {/* Catch-all: go back to "/" to decide login vs. dashboard */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </GoogleOAuthProvider>
  </Provider>
);

// Enhance with local state and lifecycle hooks
const enhance = compose(
  withState('isAuthenticated', 'setIsAuthenticated', false),
  withState('user', 'setUser', null),
  lifecycle({
    componentDidMount() {
      document.title = 'Stock chart';

      // On app init, check if token exists in localStorage
      const token = localStorage.getItem('token');

      if (token) {
        // If token found, assume user is authenticated
        this.props.setIsAuthenticated(true);
        // You could store more user info here (e.g. decode token)
        this.props.setUser({ token });
      }
    },
  })
);

const App = enhance(AppStateLess);
export default App;
