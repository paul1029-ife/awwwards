import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  useGSAP(() => {
    // Hero text animation with split text
    const heroText = new SplitText("#hero-text", { type: "chars, words" });
    const heroSubtitle = new SplitText("#hero-subtitle", { type: "words" });

    // Initial state - hide everything
    gsap.set(
      [
        heroText.chars,
        heroSubtitle.words,
        "#cta-button",
        ".blob",
        ".section-content",
      ],
      {
        opacity: 0,
        y: 100,
      }
    );

    // Main timeline
    const tl = gsap.timeline();

    // Animate hero text characters with stagger
    tl.to(heroText.chars, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "back.out(1.7)",
      stagger: 0.05,
    })
      .to(
        heroSubtitle.words,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.3"
      )
      .to(
        "#cta-button",
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .to(
        ".blob",
        {
          duration: 1.2,
          opacity: 1,
          scale: 1,
          rotation: 360,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.8"
      );

    // Floating animation for blobs
    gsap.to(".blob", {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      stagger: 0.5,
      repeat: -1,
      yoyo: true,
    });

    // Parallax effect for background elements
    gsap.to("#noise-bg", {
      y: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    // Mouse follow effect for main blob
    const blob = document.querySelector("#main-blob");
    if (blob) {
      window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        gsap.to(blob, {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out",
        });
      });
    }

    // Scroll-triggered animations for sections
    gsap.utils.toArray(".section-content").forEach((section) => {
      const elements = (section as Element).querySelectorAll(
        ".animate-on-scroll"
      );

      ScrollTrigger.create({
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(elements, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(elements, {
            duration: 0.5,
            opacity: 0,
            y: 50,
          });
        },
        onEnterBack: () => {
          gsap.to(elements, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power3.out",
          });
        },
      });
    });

    // Parallax scroll effect for hero
    ScrollTrigger.create({
      trigger: "#hero-section",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to("#hero-text", {
          y: progress * -100,
          opacity: 1 - progress * 0.3,
          duration: 0.1,
        });
      },
    });

    // Random character animation for navbar links
    const navLinks = document.querySelectorAll(".nav-link");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    navLinks.forEach((link) => {
      const originalText = link.textContent || "";
      let animationId: number;

      link.addEventListener("mouseenter", () => {
        let iterations = 0;

        const animate = () => {
          link.textContent = originalText
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");

          if (iterations >= originalText.length) {
            clearTimeout(animationId);
            return;
          }

          iterations += 1 / 3;
          animationId = setTimeout(animate, 50);
        };

        animate();
      });

      link.addEventListener("mouseleave", () => {
        clearTimeout(animationId);
        link.textContent = originalText;
      });
    });

    // Counter animation for stats
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      const duration = 2;

      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          gsap.to(counter, {
            duration: duration,
            innerHTML: target,
            snap: { innerHTML: 1 },
            ease: "power2.out",
          });
        },
      });
    });
  });

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Noisy Background */}
      <div
        id="noise-bg"
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
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

      {/* Hero Section */}
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
            <linearGradient
              id="blobGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
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
                animation: `float ${
                  3 + Math.random() * 4
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-content py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Our Studio
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                We are a passionate team of designers, developers, and
                strategists dedicated to creating digital experiences that
                matter. With over a decade of experience, we've helped hundreds
                of brands establish their digital presence and achieve
                remarkable results.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our approach combines cutting-edge technology with timeless
                design principles, ensuring that every project we touch becomes
                a digital masterpiece that stands the test of time.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-purple-400 counter"
                    data-target="150"
                  >
                    0
                  </div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-purple-400 counter"
                    data-target="50"
                  >
                    0
                  </div>
                  <div className="text-gray-400">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-purple-400 counter"
                    data-target="10"
                  >
                    0
                  </div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl backdrop-blur-sm border border-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <div className="text-2xl font-semibold">
                      Creative Excellence
                    </div>
                    <div className="text-gray-400">Every pixel matters</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-content py-20 px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your brand thrive
              in the digital landscape
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Web Development",
                description:
                  "Custom websites and web applications built with cutting-edge technologies and best practices.",
                features: [
                  "React & Next.js",
                  "Node.js Backend",
                  "Database Design",
                  "API Integration",
                ],
              },
              {
                icon: "🎨",
                title: "UI/UX Design",
                description:
                  "Beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement.",
                features: [
                  "User Research",
                  "Wireframing",
                  "Prototyping",
                  "Design Systems",
                ],
              },
              {
                icon: "📱",
                title: "Mobile Apps",
                description:
                  "Native and cross-platform mobile applications that deliver seamless experiences across devices.",
                features: [
                  "iOS & Android",
                  "React Native",
                  "Flutter",
                  "App Store Optimization",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-gray-400 flex items-center">
                      <span className="text-purple-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-content py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest projects and see how we've helped brands
              achieve their digital goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                category: "Web Development",
                description:
                  "A modern e-commerce solution with advanced features and seamless user experience.",
                image: "🛒",
              },
              {
                title: "Fintech Dashboard",
                category: "UI/UX Design",
                description:
                  "Complex financial data visualization with intuitive user interface design.",
                image: "📊",
              },
              {
                title: "Fitness App",
                category: "Mobile Development",
                description:
                  "Cross-platform fitness tracking app with social features and gamification.",
                image: "🏃‍♂️",
              },
              {
                title: "Creative Agency Site",
                category: "Brand Design",
                description:
                  "Portfolio website with stunning animations and interactive elements.",
                image: "🎭",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="animate-on-scroll group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="text-6xl mb-4">{project.image}</div>
                  <div className="text-sm text-purple-400 mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300">
                    View Project
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-content py-20 px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Start?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Let's discuss your project and create something extraordinary
              together. We're here to turn your vision into reality.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-300">hello@studio.com</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>

            <button className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-semibold hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}

export default App;
