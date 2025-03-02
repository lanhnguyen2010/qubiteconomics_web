import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { lifecycle, withState, compose } from 'recompose';
import { Provider } from 'react-redux';

import store from './store';
import MainDashboard from './containers/MainDashboard';
import RangeDashboard from './containers/RangeDashboard';
import Demo from './containers/Demo';
import LoginScreen from './containers/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';


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

// The stateless (presentational) App component.
const AppStateLess = ({ isAuthenticated, setIsAuthenticated, user, setUser }) => (
  <Provider store={store}>
  <GoogleOAuthProvider clientId="999210900704-3v8dr8q3iol8ttnapdt36o0jtvbjmbd8.apps.googleusercontent.com">
    <Router>
      <Switch>
        {/* Login route */}
        <Route
          path="/login"
          render={(props) => (
            <LoginScreen
              {...props}
              setAuthInfo={(loggedInUser) => {
                setIsAuthenticated(true);
                setUser(loggedInUser);
              }}
            />
          )}
        />

        {/* Protected routes */}
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

        {/* MainDashboard can also be protected or public, your call */}
        <Route
          exact
          path="/dashboard"
          render={(props) => (
            <MainDashboard
              {...props}
              isAuthenticated={isAuthenticated}
            />
          )}
        />

        {/* Redirect any unknown routes to /login */}
        <Redirect to="/dashboard" />
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

      // On mount, check if there's an existing user session
      // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
      //   credentials: 'include', // important to send cookies
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.user) {
      //       this.props.setIsAuthenticated(true);
      //       this.props.setUser(data.user);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error('Auth check failed:', err);
      //   });
    },
  })
);

const App = enhance(AppStateLess);
export default App;
