import React from "react";

const Footer = () => (
  <footer className="py-12 px-8 border-t border-purple-500/20">
    <div className="max-w-6xl mx-auto text-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
        STUDIO
      </div>
      <p className="text-gray-400 mb-8">
        Crafting digital experiences that inspire and transform
      </p>
      <div className="flex justify-center space-x-6 text-gray-400">
        <a href="#" className="hover:text-purple-400 transition-colors">
          Twitter
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          LinkedIn
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          Dribbble
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          Behance
        </a>
      </div>
      <div className="mt-8 text-gray-500 text-sm">
        © 2024 Studio. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
