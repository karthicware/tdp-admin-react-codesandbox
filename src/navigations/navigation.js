import React from "react";
import { Link } from "react-router-dom";

import NavigationForFeed from "./data-feed-navigation";
import NavigationForMaster from "./master-navigation";

export default function AppNavigation() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <i className="fa fa-home" />
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <NavigationForFeed />
          <NavigationForMaster />
        </ul>
      </div>
    </nav>
  );
}
