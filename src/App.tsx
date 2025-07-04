import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

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
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
