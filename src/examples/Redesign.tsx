import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, ScrollTrigger);
const METALLIC_OBJECT_URL = "https://i.imgur.com/GzIxFz7.png";
const Redesign = () => {
  useGSAP(() => {
    gsap.to("img", {
      y: -4,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    gsap.utils.toArray<HTMLElement>(".even").forEach((key) => {
      gsap.to(key, {
        rotate: -4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50 40",
      });
    });
    gsap.utils.toArray<HTMLElement>(".odd").forEach((key) => {
      gsap.to(key, {
        rotate: 4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50 40",
      });
    });

    gsap.to(".scramble", {
      duration: 2,
      scrambleText: "A collection of Visual Works",
      chars: "WA",
      ease: "power1.inOut",
      delay: 0.2,
    });

    gsap.to(".scramble2", {
      duration: 2,
      scrambleText: "Wildly Rifian 2025",
      ease: "power1.inOut",
      delay: 1,
    });

    gsap.to(".main-section", {
      scrollTrigger: {
        trigger: ".main-section",
        pin: true,
        pinSpacing: false,
        start: "top top",
        end: "+=100%",
        scrub: 1,
      },
    });

    gsap.to(".background-parallax", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-section",
        start: "top top",
        end: "+=100%",
        scrub: 1,
      },
    });

    gsap.to(".arrow", {
      y: 6,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-black">
      <nav className="flex items-start px-4 py-2.5 gap-32 lg:gap-64 h-16 w-full uppercase text-sm sticky top-0 z-50">
        <div className="relative group inline-block overflow-hidden">
          <a className="relative z-10 text-white group-hover:text-black py-1 transition-colors ease-in cursor-pointer">
            Home
          </a>
          <div className="absolute inset-0 bg-white z-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </div>
        <div className="relative group inline-block overflow-hidden">
          <a className="relative z-10 text-white group-hover:text-black py-1 transition-colors ease-in cursor-pointer">
            Work
          </a>
          <div className="absolute inset-0 bg-white z-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </div>
        <div className="relative group inline-block overflow-hidden">
          <a className="relative z-10 text-white group-hover:text-black py-1 transition-colors ease-in cursor-pointer">
            About
          </a>
          <div className="absolute inset-0 bg-white z-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </div>
        <div className="relative group inline-block overflow-hidden">
          <a className="relative z-10 text-white group-hover:text-black py-1 transition-colors ease-in cursor-pointer">
            Contacts
          </a>
          <div className="absolute inset-0 bg-white z-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center main-section w-full pb-24">
        <div className="flex items-center px-4 uppercase text-white w-full">
          <div className="text-xs scramble w-[190px]">
            A Collection of Visual Studios
          </div>
          <div className="relative w-[500px] h-[500px] flex items-start justify-center flex-1">
            <img
              src="/awwwards/head.avif"
              id="head"
              className="size-[500px] top-1/2 left-1/2 "
            />
            <img
              src="/awwwards/key.avif"
              className="even size-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            />
            <img
              src="/awwwards/key2.avif"
              className="even size-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            />
            <img
              src="/awwwards/key3.avif"
              className="even size-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            />
            <img
              src="/awwwards/key4.avif"
              className="ood size-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            />
            <img
              src="/awwwards/key5.avif"
              className="odd size-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            />
          </div>
          <div className="text-xs scramble2 w-44 text-right">
            William Alfree 2025
          </div>
        </div>
        <div className="flex items-center flex-col uppercase pt-7 gap-2 text-white">
          <p>Scroll to Explore</p>
          <ArrowDown className="size-4 arrow" />
        </div>
      </div>
      <div className="background-section relative h-screen overflow-hidden bg-gray-800">
        <div
          className="background-parallax absolute inset-0 w-full h-[120%] bg-cover bg-center"
          style={{ backgroundImage: "url('/awwwards/background.avif')" }}
        />

        <div className="relative z-10 flex items-center justify-center h-full p-8">
          <div className="bg-[#F7E94F] w-[1200px] h-[700px] p-6 font-mono text-black relative antialiased shadow-2xl">
            <div className="border-2 border-dotted border-black h-full w-full relative p-6 flex flex-col justify-between">
              <div className="absolute left-[-12px] top-1/4 space-y-6 z-10">
                <div className="w-3 h-3 bg-[#F7E94F] border-2 border-black rounded-full"></div>
                <div className="w-3 h-3 bg-[#F7E94F] border-2 border-black rounded-full"></div>
                <div className="w-3 h-3 bg-[#F7E94F] border-2 border-black rounded-full"></div>
              </div>

              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-black"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-black"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-black"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-black"></div>

              <div className="absolute top-1/2 right-[-14px] -translate-y-1/2 [writing-mode:vertical-rl] text-xs tracking-[0.2em] uppercase">
                WILDYRIFTIANWORKS
              </div>

              <header className="flex justify-between items-center text-sm tracking-wider uppercase">
                <span>05</span>
                <div className="flex items-center gap-4">
                  <span>Illustration</span>
                  <span className="w-2 h-2 bg-black"></span>
                  <span>About</span>
                </div>
              </header>

              <main className="flex-grow flex items-center my-12 lg:my-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  <div className="flex justify-center items-center -ml-8 sm:ml-0">
                    <div className="p-2 transform -rotate-6">
                      <img
                        src={METALLIC_OBJECT_URL}
                        alt="Metallic sci-fi device"
                        className="w-48 sm:w-56"
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
                      Wildy Riftian
                    </h1>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                      does
                    </h2>
                    <hr className="border-t-2 border-dotted border-black my-4" />
                    <div className="flex items-center text-4xl sm:text-5xl font-script my-4">
                      <span className="text-gray-500">&lt;</span>
                      <span className="mx-2">branding</span>
                      <span className="text-gray-500">&gt;</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed tracking-wider uppercase">
                      I'm an enthusiastic and multifaceted visual artist, motion
                      designer, graphic designer, illustrator, and photographer.
                      Passionate about pushing creative boundaries, I constantly
                      seek to expand my expertise and combine skills across
                      various mediums. I thrive on problem-solving and embrace
                      challenges with a proactive and open-minded approach.
                    </p>
                  </div>
                </div>
              </main>

              <footer className="flex flex-wrap justify-between items-center text-xs tracking-wider uppercase gap-y-2 gap-x-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-black"></span>
                  <span>05 / 86</span>
                  <span className="w-1.5 h-1.5 bg-black"></span>
                </div>
                <div className="hidden md:block">Currently Based In</div>
                <div>Savannah, GA</div>
                <div>32.0809° N, 81.0912° W</div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redesign;
