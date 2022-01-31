import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <NavLink
        class="navBar"
        activeStyle={{
          color: "#229c09",
        }}
        exact
        to="/"
      >
        Game
      </NavLink>
      <NavLink
        class="navBar2"
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
