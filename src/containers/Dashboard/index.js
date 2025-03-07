import React, { useState } from "react";
import {
  NavLink,
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { FaChartBar, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./index.css";
import MainChartScreen from "containers/MainChart";
import UserScreen from "containers/User";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="toggle-button">
            {isCollapsed ? ">>" : "<<"}
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li>
              <NavLink to={`${url}/chart`} activeClassName="active" exact>
                <FaChartBar className="sidebar-icon" />
                {!isCollapsed && <span>Chart</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/user`} activeClassName="active" exact>
                <FaUser className="sidebar-icon" />
                {!isCollapsed && <span>User</span>}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt className="sidebar-icon" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${path}/chart`} />
          </Route>
          <Route path={`${path}/chart`}>
            <MainChartScreen />
          </Route>
          <Route path={`${path}/user`}>
            <UserScreen />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
