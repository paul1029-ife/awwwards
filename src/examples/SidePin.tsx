import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);
const SidePin = () => {
  const sideSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  });

  useGSAP(() => {
    const split = SplitText.create(".reveal", {
      type: "words, lines",
    });
    const splitTop = SplitText.create(".top", {
      type: "words, lines",
    });

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.to(".img1", {
      opacity: 0,
      rotateX: 180,
      duration: 1,
    });

    tl.fromTo(
      ".img2",
      {
        opacity: 0,
        rotateX: 180,
      },
      {
        opacity: 1,
        rotateX: 0,
        duration: 1,
      },
      "-=1"
    );

    tl.to(".img2", { duration: 1.5 });

    tl.to(".img2", {
      opacity: 0,
      rotateX: 180,
      duration: 1,
    });
    tl.to(
      ".img1",
      {
        opacity: 1,
        rotateX: 0,
        duration: 1,
      },
      "-=1"
    );
    tl.to(".img1", { duration: 1.5 });

    gsap.fromTo(
      split.lines,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      splitTop.lines,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }
    );
    gsap.to(sideSectionRef.current, {
      scrollTrigger: {
        trigger: sideSectionRef.current,
        scrub: true,
        start: "top top",
        pin: true,
        end: "+=125% top",
      },
    });
    gsap.to(".background", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  }, []);
  return (
    <main className="">
      <div className="min-h-screen bg-white flex flex-col w-full items-center justify-between">
        <div className="flex flex-col items-center">
          <p className="top uppercase font-bold tracking-tighter text-sm leading-[-1.5]">
            we work with the biggest brands
          </p>
          <span className="top text-xs italic">From Around the World</span>
        </div>
        <div className="uppercase font-bold text-6xl max-w-4xl text-center mb-7">
          <span className="reveal">WE HELP CREATE MOMENTS</span>
          <div className="relative mr-2">
            <img src="/arrow.svg" className="absolute" />
            <img
              src="/arrow.svg"
              className="absolute translate-x-24 rotate-90"
            />
            <img
              src="/arrow.svg"
              className="absolute translate-y-12 rotate-270"
            />
            <img
              src="/arrow.svg"
              className="absolute translate-y-12 translate-x-24 rotate-180"
            />
            <img src="/except.svg" className="absolute w-22 left-2 h-14 img1" />
            <img
              src="/except2.svg"
              className="absolute w-24 left-2 h-14 opacity-0 img2"
            />
          </div>{" "}
          <span></span>
          <span className="reveal"> design places FOR </span>
          <span className="reveal">and amplify EXPERIENCES FOR</span>
        </div>
      </div>
      <div className="bg-white min-h-screen w-full flex items-start justify-between pb-8 px-8">
        <div
          ref={sideSectionRef}
          className="flex items-start justify-start py-4"
        >
          <div className="max-w-xl w-full">
            <div className="border-t-2 border-black mb-8"></div>

            <div className="flex justify-between items-start mb-12">
              <h1 className="text-6xl font-bold tracking-tight">ETCETERA</h1>
              <div className="text-right">
                <div className="text-sm font-bold uppercase tracking-wide">
                  Our Culture Newsletter
                </div>
                <div className="text-sm italic">Join 15,000+ Readers</div>
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-base leading-relaxed">
                Want to get your finger on the pulse? Sign up to our newsletter,
                Etcetera, and join over 15k people getting the latest in design,
                branding and culture news.
              </p>

              <div className="h-44"></div>

              <div>
                <p className="text-sm italic mb-6">
                  Always Free. Unsubscribe Anytime.
                </p>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address..."
                    className="w-full bg-gray-100 border-none outline-none px-6 py-4 pr-40 text-base"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:opacity-70 transition-opacity cursor-pointer">
                    <ArrowRight />
                    Sign Me Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-5">
          <div className="w-full flex flex-col gap-1">
            <img
              src="/person.jpg"
              className="object-cover h-96 w-96 side-image"
            />
            <div className="flex justify-between">
              <p className="italic">This is the place of a good time</p>
              <div className="group flex items-center gap-1 cursor-pointer px-2.5">
                <ArrowRight className="size-3 text-black opacity-0 translate-x-2.5 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                <p className="text-black transition-all text-xs duration-300 ease-in-out group-hover:translate-x-2">
                  Read More
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/space.jpg"
              className="object-cover h-96 w-96 side-image"
            />
            <div className="flex justify-between">
              <p className="italic">This is the place of a good time</p>
              <div className="group flex items-center gap-1 cursor-pointer px-2.5">
                <ArrowRight className="size-3 text-black opacity-0 translate-x-2.5 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                <p className="text-black transition-all text-xs duration-300 ease-in-out group-hover:translate-x-2">
                  Read More
                </p>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/susan.jpg"
              className="object-cover h-96 w-96 side-image"
            />
            <div className="flex justify-between">
              <p className="italic">This is the place of a good time</p>
              <div className="group flex items-center gap-1 cursor-pointer px-2.5">
                <ArrowRight className="size-3 text-black opacity-0 translate-x-2.5 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                <p className="text-black transition-all text-xs duration-300 ease-in-out group-hover:translate-x-2">
                  Read More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden parallax-section">
        <div
          className="absolute background inset-0 h-[130%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url(/section-bg.jpg)",
            top: "-20%",
          }}
        ></div>

        {/* Content container */}
        <div className="relative h-full flex items-center justify-end px-16 py-12">
          <div className="max-w-md">
            <h1 className="text-white font-black text-7xl tracking-tighter leading-14 mb-8">
              FINE FORM
              <br />
              PODCAST
            </h1>

            <p className="text-white text-lg font-semibold mb-6">
              Example is proud to present Fine Form, a podcast reimagining the
              rules of success, created and hosted by our Co-Founder and COO,
              Rebecca Jarvie-Gibbs.
            </p>

            <p className="text-white text-base mb-8">
              Each week, Rebecca sits down with women shaping food, design,
              business and culture to uncover the big changes, small shifts and
              defining habits that have changed the way they work and live.
            </p>

            <a
              href="#"
              className="inline-flex items-center text-white font-bold text-sm uppercase tracking-wide hover:underline"
            >
              <span className="mr-2">↳</span>
              VIEW ON APPLE
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black min-h-screen flex items-center justify-between pl-4 pr-28">
        <div className="min-h-screen  text-white py-4 px-3">
          <div className="flex flex-wrap items-center justify-between mb-7 md:mb-14">
            <div className="flex gap-1 mb-4 md:mb-0">
              <a href="#" className="text-sm  font-bold hover:opacity-70">
                INSTAGRAM
              </a>
              <a href="#" className="text-sm font-bold hover:opacity-70">
                LINKEDIN
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 ">
              <span className="text-sm  font-bold">WE ARE EXAMPLE</span>
              <span className="text-sm italic">
                An Earned-Led Culture Agency
              </span>
            </div>
          </div>

          <div className="max-w-6xl">
            <h1 className="text-6xl -tracking-[0.075rem] md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mb-16 ">
              READY TO
              <br />
              TALK? GET
              <br />
              IN TOUCH
            </h1>

            <div className="space-y-1.5">
              <p className="text-sm  font-bold">
                AUSTRALIA / NEW ZEALAND / MIDDLE EAST
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl">↳</span>
                <a
                  href="mailto:HELLO@WEAREEXAMPLE.COM"
                  className="text-xl font-bold hover:opacity-70"
                >
                  HELLO@WEAREEXAMPLE.COM
                </a>
              </div>

              <a
                href="tel:+61283224600"
                className="text-sm  hover:opacity-70 block"
              >
                +61 2 8322 4600
              </a>

              <a
                href="tel:+971800031102009"
                className="text-sm  hover:opacity-70 block"
              >
                +971 800 0311 0209
              </a>

              <p className="text-xs md:text-sm text-neutral-500 max-w-md ">
                We acknowledge the Traditional Custodians of the land on which
                we work and live, and pay our respects to Elders past and
                present. We recognise their continuing connection to land,
                waters and culture.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/traviss.png"
            className="w-54 h-[577px] relative bottom-7"
          />
        </div>
      </div>
    </main>
  );
};

export default SidePin;
