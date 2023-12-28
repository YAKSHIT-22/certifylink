import React from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import HeaderLinks from "./minorComponents/HeaderLinks";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full flex items-center justify-center p-2 fixed top-0 z-10">
      <nav className="w-full flex items-center justify-center max-w-screen-2xl mx-auto sm:px-4">
        <div className="w-full flex items-center justify-between p-2">
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="logo"
              className="sm:w-24 sm:h-24 w-20 h-20 aspect-square"
            />
          </div>
          <div className="flex items-center justify-center p-2 gap-6">
            <HeaderLinks link={"/"} text={"Home"} />
            <HeaderLinks link={"/#about"} text={"About"} />
            <HeaderLinks link={"/#contact"} text={"Contact"} />
            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-8 py-2 rounded-full bg-white hover:bg-transparent hover:border: border-white border border-transparent text-[#181818] hover:text-white transition-all"
            >
              <p className=" text-sm sm:text-base font-light">Login/Register</p>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
