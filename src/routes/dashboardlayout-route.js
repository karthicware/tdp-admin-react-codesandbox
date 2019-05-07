import React from 'react';
import { Route } from 'react-router-dom';

import DashboardLayout from '../layout/dashboard-layout';


const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <DashboardLayout>
                <Component {...matchProps} />
            </DashboardLayout>
        )} />
    )
};

export default DashboardLayoutRoute;
