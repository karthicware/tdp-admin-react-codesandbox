import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import AdvertisementPage from './pages/feed/advertisement-page';
import GalleryPage from './pages/feed/gallery-upload';
import LoginPage from './pages/login/login';
import DashboardLayoutRoute from './routes/dashboardlayout-route';
import LoginLayoutRoute from './routes/loginlayout-route';


export default class AppRoutes extends React.Component {

    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        }
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
                            <Redirect to="/feed/gallery" />) : (<Redirect to="/signin" />)}
                    </Route>

                    <LoginLayoutRoute path="/signin" component={LoginPage} onLogin={this.handleLogin} />
                   
                            <DashboardLayoutRoute path="/feed/gallery" component={GalleryPage} onLogout={this.handleLogout} />
                            <DashboardLayoutRoute path="/feed/ad" component={AdvertisementPage} onLogout={this.handleLogout} />
                       
                            />
                        )}
                </Switch>
            </Router>
        );
    }

}