import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './store';
import Dashboard from './containers/Dashboard';
import LoginScreen from './containers/Login';
import { jwtDecode } from 'jwt-decode';


import './App.css';

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    // decoded.exp is in seconds; convert to milliseconds and compare with current time
    console.log("decoded.exp", decoded.exp);
    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

// ProtectedRoute for authenticated pages
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const isValid = token && isTokenValid(token);

  if (token && !isValid) {
    localStorage.removeItem('token');
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

// PublicRoute for routes like login that should not be accessible when authenticated
const PublicRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Router>
          <Switch>
            <PublicRoute path="/login" component={LoginScreen} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
