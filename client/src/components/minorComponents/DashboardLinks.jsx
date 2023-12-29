import React from "react";
import { NavLink } from "react-router-dom";

const DashboardLinks = ({ icon, link, text }) => {
  return (
    <NavLink
      to={link}
      style={({ isActive }) => ({
        color: isActive ? "#FFC947" : "grey",
        fontWeight: isActive ? "semibold" : "medium",
        transition: "all 0.5s ease-in-out",
      })}
      className="flex items-center justify-center lg:justify-start w-full p-2 md:p-4"
    >
      <p className="text-lg flex items-center justify-center gap-2">
        {icon}
        <span className="lg:flex hidden">{text}</span>
      </p>
    </NavLink>
  );
};

export default DashboardLinks;
