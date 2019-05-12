import React from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

import AdvertisementPage from "./pages/feed/advertisement-page";
import GalleryPage from "./pages/gallery/gallery-route";
import LoginPage from "./pages/login/login";
import DashboardLayoutRoute from "./routes/dashboardlayout-route";
import PaperbaseLayoutRoute from "./routes/paperbase-layout-route";
import LoginLayoutRoute from "./routes/loginlayout-route";
import CustomerMasterPage from "./pages/master/customer";

export default class AppRoutes extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: true
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout() {
    this.setState({
      isAuthenticated: false
    });
  }

  handleLogin(currentUser) {
    console.log(`currentUser=${JSON.stringify(currentUser)}`);
    this.setState({
      isAuthenticated: true
    });
  }

  render() {
    console.log(`state=${JSON.stringify(this.state.isAuthenticated)}`);
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.state.isAuthenticated ? (
              <Redirect to="/gallery/upload" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
          <LoginLayoutRoute
            path="/signin"
            component={LoginPage}
            onLogin={this.handleLogin}
          />
          <PaperbaseLayoutRoute
            path="/gallery"
            component={GalleryPage}
            onLogout={this.handleLogout}
          />
          <DashboardLayoutRoute
            path="/feed/ad"
            component={AdvertisementPage}
            onLogout={this.handleLogout}
          />
          <DashboardLayoutRoute
            path="/masters/customer"
            component={CustomerMasterPage}
            onLogout={this.handleLogout}
          />
          /> )}
        </Switch>
      </Router>
    );
  }
}
