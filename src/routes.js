import React from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

//Layout
import PaperbaseLayoutRoute from "./routes/paperbase-layout-route";
import LoginLayoutRoute from "./routes/loginlayout-route";
//login page
import LoginPage from "./pages/login/login";
// private routes containing pages and tabs
import AdsPage from "./pages/ads/ads-route";
import GalleryPage from "./pages/gallery/gallery-route";
import CustomerPage from "./pages/customer/customer-route";
import NewsPage from "./pages/news/news-route";

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
              <Redirect to="/gallery" />
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
          <PaperbaseLayoutRoute
            path="/ads"
            component={AdsPage}
            onLogout={this.handleLogout}
          />
          <PaperbaseLayoutRoute
            path="/customer"
            component={CustomerPage}
            onLogout={this.handleLogout}
          />
          <PaperbaseLayoutRoute
            path="/news"
            component={NewsPage}
            onLogout={this.handleLogout}
          />
          /> )}
        </Switch>
      </Router>
    );
  }
}
