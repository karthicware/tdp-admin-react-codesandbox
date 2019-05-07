import React from 'react';
import { Route } from 'react-router-dom';

import LoginLayout from '../layout/login-layout';

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LoginLayout>
                <Component {...matchProps} onLogin={rest.onLogin} />
            </LoginLayout>
        )} />
    )
};

export default LoginLayoutRoute;
