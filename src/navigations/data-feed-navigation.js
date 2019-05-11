import React from "react";
import { Link } from "react-router-dom";

export default function NavigationForFeed() {
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
        Upload Content
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link to="/feed/gallery" className="dropdown-item">
          Gallery
        </Link>
        <Link to="/feed/ad" className="dropdown-item">
          Advertisement
        </Link>

        <div className="dropdown-divider" />
        <Link to="/feed/ad" className="dropdown-item">
          News
        </Link>
      </div>
    </li>
  );
}
