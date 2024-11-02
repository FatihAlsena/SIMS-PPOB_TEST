import React from "react";
import { NavLink } from "react-router-dom";
import Banner from "../Elements/Banner";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-28 p-4 border-b">
      <a href="/" className="">
        <Banner classname="flex flex-row gap-3" />
      </a>

      <nav className="flex space-x-4">
        <NavLink
          to="/topup"
          className={({ isActive }) =>
            `text-gray-700 ${isActive ? "text-red-500" : ""}`
          }
        >
          Top Up
        </NavLink>
        <NavLink
          to="/transaction/history"
          className={({ isActive }) =>
            `text-gray-700 ${isActive ? "text-red-500" : ""}`
          }
        >
          Transaction
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-gray-700 ${isActive ? "text-red-500" : ""}`
          }
        >
          Akun
        </NavLink>
      </nav>
    </header>
  );
};
export default Navbar;
