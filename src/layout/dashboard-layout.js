import React from 'react';
import AppNavigation from '../navigation';

const DashboardLayout = (props) => (
    <main className="bodyContainer" style={{ backgroundColor: '#fff' }}>
        <header className="masthead masthead-page mb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 py-5">
                        <h1 className="mb-2">Political App - Admin</h1>
                        <h2 className="m-0">N2N IT Solutions</h2>
                    </div>
                    <div className="col-lg-4">
                        <h2 className="m-0">Welcome! Admin</h2>
                    </div>
                </div>
            </div>
            <AppNavigation />

        </header>
        <div className="container">
            {props.children}
        </div>
        <footer className="footerContainer blockquote-footer">

            <div className="container text-center">
                <p className="navbar-text">Copyright © 2019 - Site Built By Natarajan </p>
            </div>

        </footer>
    </main>
);

export default DashboardLayout;