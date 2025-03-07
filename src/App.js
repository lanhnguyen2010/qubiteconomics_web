import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Redirect,
  Navigate, 
} from 'react-router-dom';
import { lifecycle, withState, compose } from 'recompose';
import { Provider } from 'react-redux';

import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './store';
import Dashboard from './containers/Dashboard';
import MainChart from './containers/MainChart';
import LoginScreen from './containers/Login';

import './App.css';
import UserScreen from 'containers/User';

// ProtectedRoute for authenticated pages
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
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

// // Presentational App component
// const AppStateLess = ({ isAuthenticated, setIsAuthenticated, user, setUser }) => (
//   <Provider store={store}>
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <Router>
//         <Switch>
//           {/* Root route: Decide where to go based on isAuthenticated */}
//           <Route exact path="/">
//             {isAuthenticated ? <Redirect to="/user" /> : <Redirect to="/login" />}
//           </Route>

//           {/* Login route: If already authenticated, skip login and go to dashboard */}
//           <Route
//             path="/login"
//             render={(props) =>
//               isAuthenticated ? (
//                 <Redirect to="/user" />
//               ) : (
//                 <LoginScreen
//                   {...props}
//                   setAuthInfo={(loggedInUser) => {
//                     setIsAuthenticated(true);
//                     setUser(loggedInUser);
//                   }}
//                 />
//               )
//             }
//           />

//           {/* Protected routes */}
//           <PrivateRoute
//             path="/dashboard"
//             component={MainDashboard}
//             isAuthenticated={isAuthenticated}
//           />
//           <PrivateRoute
//             path="/range"
//             component={RangeDashboard}
//             isAuthenticated={isAuthenticated}
//           />
//           <PrivateRoute
//             path="/demo"
//             component={Demo}
//             isAuthenticated={isAuthenticated}
//           />
//           <PrivateRoute
//             path="/user"
//             component={UserScreen}
//             isAuthenticated={isAuthenticated}
//           />

//           {/* <Redirect to="/" /> */}
//         </Switch>
//       </Router>
//     </GoogleOAuthProvider>
//   </Provider>
// );

// // Enhance with local state and lifecycle hooks
// const enhance = compose(
//   withState('isAuthenticated', 'setIsAuthenticated', false),
//   withState('user', 'setUser', null),
//   lifecycle({
//     componentDidMount() {
//       document.title = 'Stock chart';

//       // On app init, check if token exists in localStorage
//       const token = localStorage.getItem('token');

//       if (token) {
//         // If token found, assume user is authenticated
//         this.props.setIsAuthenticated(true);
//         // You could store more user info here (e.g. decode token)
//         this.props.setUser({ token });
//       }
//     },
//   })
// );

// const App = enhance(AppStateLess);
export default App;
