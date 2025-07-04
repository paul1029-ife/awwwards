import React from "react";

const HeroSection = () => (
  <section
    id="hero-section"
    className="relative h-screen flex items-center justify-center"
  >
    {/* SVG Blobs */}
    <svg
      id="main-blob"
      className="blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20"
      viewBox="0 0 400 400"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path
        fill="url(#blobGradient)"
        d="M 100 200 Q 150 100 200 200 Q 250 300 300 200 Q 350 100 400 200 Q 350 300 300 200 Q 250 100 200 200 Q 150 300 100 200 Z"
      >
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values="M 100 200 Q 150 100 200 200 Q 250 300 300 200 Q 350 100 400 200 Q 350 300 300 200 Q 250 100 200 200 Q 150 300 100 200 Z;
                  M 100 200 Q 150 300 200 200 Q 250 100 300 200 Q 350 300 400 200 Q 350 100 300 200 Q 250 300 200 200 Q 150 100 100 200 Z;
                  M 100 200 Q 150 100 200 200 Q 250 300 300 200 Q 350 100 400 200 Q 350 300 300 200 Q 250 100 200 200 Q 150 300 100 200 Z"
        />
      </path>
    </svg>
    <svg
      className="blob absolute top-1/4 right-1/4 w-64 h-64 opacity-15"
      viewBox="0 0 300 300"
    >
      <path
        fill="#EC4899"
        d="M 50 150 Q 100 50 150 150 Q 200 250 250 150 Q 300 50 350 150 Q 300 250 250 150 Q 200 50 150 150 Q 100 250 50 150 Z"
      >
        <animate
          attributeName="d"
          dur="8s"
          repeatCount="indefinite"
          values="M 50 150 Q 100 50 150 150 Q 200 250 250 150 Q 300 50 350 150 Q 300 250 250 150 Q 200 50 150 150 Q 100 250 50 150 Z;
                  M 50 150 Q 100 250 150 150 Q 200 50 250 150 Q 300 250 350 150 Q 300 50 250 150 Q 200 250 150 150 Q 100 50 50 150 Z;
                  M 50 150 Q 100 50 150 150 Q 200 250 250 150 Q 300 50 350 150 Q 300 250 250 150 Q 200 50 150 150 Q 100 250 50 150 Z"
        />
      </path>
    </svg>
    <svg
      className="blob absolute bottom-1/4 left-1/4 w-48 h-48 opacity-20"
      viewBox="0 0 200 200"
    >
      <path
        fill="#3B82F6"
        d="M 30 100 Q 70 30 100 100 Q 130 170 170 100 Q 210 30 240 100 Q 210 170 170 100 Q 130 30 100 100 Q 70 170 30 100 Z"
      >
        <animate
          attributeName="d"
          dur="12s"
          repeatCount="indefinite"
          values="M 30 100 Q 70 30 100 100 Q 130 170 170 100 Q 210 30 240 100 Q 210 170 170 100 Q 130 30 100 100 Q 70 170 30 100 Z;
                  M 30 100 Q 70 170 100 100 Q 130 30 170 100 Q 210 170 240 100 Q 210 30 170 100 Q 130 170 100 100 Q 70 30 30 100 Z;
                  M 30 100 Q 70 30 100 100 Q 130 170 170 100 Q 210 30 240 100 Q 210 170 170 100 Q 130 30 100 100 Q 70 170 30 100 Z"
        />
      </path>
    </svg>
    {/* Hero Content */}
    <div className="relative z-10 text-center px-8">
      <h1
        id="hero-text"
        className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight"
      >
        DIGITAL
      </h1>
      <p
        id="hero-subtitle"
        className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        We craft extraordinary digital experiences that inspire, engage, and
        transform brands
      </p>
      <button
        id="cta-button"
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
      >
        Start Your Project
      </button>
    </div>
    {/* Floating Particles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  </section>
);

export default HeroSection;
