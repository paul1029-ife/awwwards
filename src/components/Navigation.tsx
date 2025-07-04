import React from "react";

const Navigation = () => (
  <nav className="fixed top-0 left-0 w-full h-20 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 z-50">
    <div className="flex items-center justify-between w-full">
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        <a href="#home">STUDIO</a>
      </div>
      <div className="flex items-center gap-8">
        <a
          href="#home"
          className="nav-link hover:text-purple-400 transition-colors duration-300 cursor-pointer"
        >
          Home
        </a>
        <a
          href="#about"
          className="nav-link hover:text-purple-400 transition-colors duration-300 cursor-pointer"
        >
          About
        </a>
        <a
          href="#services"
          className="nav-link hover:text-purple-400 transition-colors duration-300 cursor-pointer"
        >
          Services
        </a>
        <a
          href="#portfolio"
          className="nav-link hover:text-purple-400 transition-colors duration-300 cursor-pointer"
        >
          Work
        </a>
        <a
          href="#contact"
          className="nav-link hover:text-purple-400 transition-colors duration-300 cursor-pointer"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
);

export default Navigation;
