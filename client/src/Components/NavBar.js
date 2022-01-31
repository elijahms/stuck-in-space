import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <NavLink
        className="navBar"
        activeStyle={{
          color: "#229c09",
        }}
        exact
        to="/"
      >
        Game
      </NavLink>
      <NavLink
        className="navBar2"
        activeStyle={{
          color: "#229c09",
        }}
        exact
        to="/leaderboard"
      >
        Leaderboard
      </NavLink>
    </div>
  );
};

export default NavBar;
