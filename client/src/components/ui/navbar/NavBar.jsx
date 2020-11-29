import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Delivery</Link>
      <ul>
        <li>
          <Link to="/track">Track</Link>
        </li>
        <li>
          <Link to="/buy">BuyForMe</Link>
        </li>
      </ul>
    </nav>
  );
}
