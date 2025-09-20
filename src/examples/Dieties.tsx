import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Wind,
  Zap,
  Heart,
  Shield,
  Sword,
  Crown,
  Sun,
} from "lucide-react";

const YorubaDeities = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDeity, setActiveDeity] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll(".deity-section");
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos > top && scrollPos < top + height) {
          setActiveDeity(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const deities = [
    {
      name: "Olodumare",
      title: "The Supreme Creator",
      description:
        "The source of all existence, the divine essence from which all life flows",
      color: "from-amber-600 to-yellow-500",
      icon: <Sun className="w-8 h-8" />,
      powers: ["Creation", "Divine Will", "Cosmic Order"],
      story:
        "Before time began, Olodumare existed alone in the vast emptiness. Through divine will, the universe was spoken into being, creating the Orishas to govern the forces of nature and guide humanity.",
    },
    {
      name: "Shango",
      title: "God of Thunder & Lightning",
      description:
        "The fierce warrior king who commands storms and delivers justice",
      color: "from-red-600 to-orange-500",
      icon: <Zap className="w-8 h-8" />,
      powers: ["Thunder", "Lightning", "Justice", "Virility"],
      story:
        "Once a mortal king of Oyo, Shango ascended to divinity through his mastery of fire and lightning. His double-headed axe splits the sky, bringing both destruction to the wicked and rain to the righteous.",
    },
    {
      name: "Oshun",
      title: "Goddess of Love & Rivers",
      description:
        "The divine embodiment of love, beauty, fertility, and sweet waters",
      color: "from-yellow-500 to-amber-400",
      icon: <Heart className="w-8 h-8" />,
      powers: ["Love", "Fertility", "Prosperity", "Healing"],
      story:
        "Flowing like the rivers she governs, Oshun brings sweetness to life. She dances through the world spreading love, healing broken hearts, and blessing marriages with her golden honey.",
    },
    {
      name: "Ogun",
      title: "God of Iron & War",
      description:
        "The divine blacksmith who forges paths through impossibility",
      color: "from-gray-700 to-green-600",
      icon: <Sword className="w-8 h-8" />,
      powers: ["War", "Technology", "Labor", "Truth"],
      story:
        "First among the Orishas to descend to Earth, Ogun cleared the primordial forest with his machete, creating space for civilization. He gifts humanity with tools, technology, and the warrior spirit.",
    },
    {
      name: "Yemoja",
      title: "Mother of All Orishas",
      description: "The cosmic mother whose waters birthed all life",
      color: "from-blue-600 to-cyan-500",
      icon: <Wind className="w-8 h-8" />,
      powers: ["Motherhood", "Protection", "Intuition", "Dreams"],
      story:
        "From her vast oceanic womb came forth the Orishas and humanity itself. Yemoja's waves rock the world like a cradle, her depths holding ancient wisdom and forgotten memories.",
    },
    {
      name: "Obatala",
      title: "King of White Cloth",
      description: "The wise creator of human bodies and bringer of peace",
      color: "from-gray-100 to-blue-100",
      icon: <Crown className="w-8 h-8" />,
      powers: ["Wisdom", "Purity", "Creation", "Patience"],
      story:
        "Tasked by Olodumare to shape humanity from clay, Obatala molded each person with care. His white cloth represents purity of thought and action, bringing clarity to chaos.",
    },
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600 animate-pulse">
            ÀṢẸ
          </div>
          <div className="text-white text-sm tracking-widest mt-4 text-center opacity-70">
            LOADING THE DIVINE...
          </div>
          <div className="mt-8 w-48 h-1 bg-gray-800 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-red-600 animate-pulse"
              style={{ animation: "slideRight 1.5s infinite" }}
            ></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes slideRight {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 border-2 border-amber-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200 hidden lg:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {deities.map((deity, i) => (
          <button
            key={i}
            onClick={() => {
              document
                .querySelectorAll(".deity-section")
                [i].scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-3 h-3 rounded-full border transition-all duration-500 ${
              activeDeity === i
                ? "bg-amber-500 border-amber-500 scale-150"
                : "bg-transparent border-gray-600 hover:border-amber-500"
            }`}
            aria-label={`Navigate to ${deity.name}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black"></div>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 text-center px-4"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-4 overflow-hidden">
            <span
              className="inline-block animate-pulse bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "gradient 3s linear infinite",
              }}
            >
              ÒRÌṢÀ
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 mb-8 tracking-wider">
            The Divine Pantheon of Yoruba
          </p>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-12">
            Journey through the celestial realm where ancient gods shape
            destiny, where thunder speaks truth, and rivers carry prayers to the
            divine.
          </p>
          <ChevronDown
            className="w-8 h-8 mx-auto animate-bounce text-amber-500 cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          />
        </div>

        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
        `}</style>
      </section>

      {/* Deity Sections */}
      {deities.map((deity, index) => (
        <section
          key={index}
          className="deity-section relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Parallax Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              transform: `translateY(${
                (scrollY - index * window.innerHeight) * 0.3
              }px)`,
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${deity.color}`}
            ></div>
          </div>

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern
                id={`pattern-${index}`}
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
              <rect
                width="100%"
                height="100%"
                fill={`url(#pattern-${index})`}
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-8 py-16">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? "" : "md:grid-flow-dense"
              }`}
            >
              {/* Text Content */}
              <div
                className={`space-y-6 ${
                  index % 2 === 0 ? "" : "md:col-start-2"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`transform transition-all duration-1000 ${
                      activeDeity === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                      Orisha {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className={`text-5xl md:text-7xl font-bold mt-2 bg-gradient-to-r ${deity.color} bg-clip-text text-transparent`}
                    >
                      {deity.name}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 mt-2">
                      {deity.title}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-lg text-gray-300 leading-relaxed transform transition-all duration-1000 delay-200 ${
                    activeDeity === index
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
                >
                  {deity.story}
                </p>

                {/* Powers */}
                <div
                  className={`space-y-4 transform transition-all duration-1000 delay-400 ${
                    activeDeity === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  <h3 className="text-sm tracking-[0.2em] text-gray-500 uppercase">
                    Divine Powers
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {deity.powers.map((power, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full border border-gray-700 bg-gradient-to-r ${deity.color} bg-opacity-10 text-sm hover:scale-110 transition-transform cursor-pointer`}
                      >
                        {power}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div
                className={`relative ${
                  index % 2 === 0 ? "" : "md:col-start-1"
                }`}
              >
                <div
                  className={`relative w-64 h-64 md:w-96 md:h-96 mx-auto transform transition-all duration-1000 ${
                    activeDeity === index
                      ? "scale-100 rotate-0"
                      : "scale-75 rotate-12"
                  }`}
                >
                  {/* Rotating Ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-dashed border-gray-700 animate-spin`}
                    style={{ animationDuration: "20s" }}
                  ></div>

                  {/* Inner Ring */}
                  <div
                    className={`absolute inset-8 rounded-full bg-gradient-to-br ${deity.color} opacity-20 animate-pulse`}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center`}
                  >
                    <div
                      className={`p-8 rounded-full bg-gradient-to-br ${deity.color} bg-opacity-30 backdrop-blur-sm transform hover:scale-110 transition-transform`}
                    >
                      {React.cloneElement(deity.icon, {
                        className: "w-24 h-24 md:w-32 md:h-32 text-white",
                      })}
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-white rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 120}deg) translateX(150px)`,
                        animation: `orbit 10s linear infinite`,
                        animationDelay: `${i * 3.33}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="relative py-20 bg-gradient-to-t from-black to-transparent">
        <div className="container mx-auto px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
            Àṣẹ
          </h3>
          <p className="text-gray-500 text-sm">
            The power to make things happen • The divine force that flows
            through all
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <span className="text-xs text-gray-600">Honor the ancestors</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-600">Respect the Orishas</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-600">Live with purpose</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default YorubaDeities;
