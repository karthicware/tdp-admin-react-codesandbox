import React from 'react';

import './login.css';

const LoginLayout = (props) => (
    <main className="bodyContainer">
        <header className="masthead masthead-page mb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 py-5">
                        <h1 className="mb-2">Political App - Admin</h1>
                        <h2 className="m-0">N2N IT Solutions</h2>
                    </div>
                    <div className="col-lg-4">

                    </div>
                </div>
            </div>

        </header>
        <div className="container">
            <h1>Sign In</h1>
            {props.children}
        </div>
        <footer className="footerContainer blockquote-footer">
           
                <div className="container text-center">
                    <p className="navbar-text">Copyright © 2019 - Site Built By Natarajan </p>
                </div>
            
        </footer>
    </main>
);

export default LoginLayout;