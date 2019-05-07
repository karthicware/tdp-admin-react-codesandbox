import React from 'react';
import { Link } from 'react-router-dom'

export default function AppNavigation() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <i className="fa fa-home"></i>
                    <Link to="/" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Upload Content
        </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/feed/gallery" className="dropdown-item">Gallery</Link>
                        <Link to="/feed/ad" className="dropdown-item">Advertisement</Link>
                       
                        <div className="dropdown-divider"></div>
                        <Link to="/feed/ad" className="dropdown-item">News</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to="/feed/ad" className="nav-link">Masters</Link>
                </li>
            </ul>
        </nav>
    );
}