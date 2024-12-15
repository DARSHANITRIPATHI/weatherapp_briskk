import React, { useState } from "react";
import logo from "../src/assets/logo.png";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="m-0 p-0 w-screen bg-slate-300 h-18 flex justify-between items-center">
    
      <div className="pl-6 flex flex-row items-center">
        <img className="h-13" src={logo} alt="Logo" />
        <h1 className="pl-2 font-bold text-2xl">E-commerce</h1>
      </div>

    
      <div className="pr-6 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-950 focus:outline-none"
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`flex-col absolute md:gap-3 md:relative md:flex-row md:flex bg-slate-300 md:bg-transparent list-none text-xl font-sans top-20 md:top-auto w-full md:w-auto ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <li className="text-gray-950 hover:cursor-pointer hover:text-red-700 p-4 md:p-0">
          Home
        </li>
        <li className="text-gray-950 hover:cursor-pointer hover:text-red-700 p-4 md:p-0">
          About Us
        </li>
        <li className="text-gray-950 hover:cursor-pointer hover:text-red-700 p-4 md:p-0">
          Our Work
        </li>
        <li className="text-gray-950 hover:cursor-pointer hover:text-red-700 p-4 md:p-0">
          Contact Us
        </li>
      </ul>

      {/* Logout Button */}
      <div className="hidden md:block px-6">
        <button className="px-5 py-3 text-xl text-emerald-50 bg-black border rounded-full">
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
