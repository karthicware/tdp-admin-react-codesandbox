import React from "react";
import { Link } from "react-router-dom";

export default function NavigationForMaster() {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="/"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Masters
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link to="/masters/customer" className="dropdown-item">
          Customer
        </Link>
      </div>
    </li>
  );
}
