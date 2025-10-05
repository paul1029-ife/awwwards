import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Cora = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !imagesContainerRef.current) return;

    const images = imagesContainerRef.current.querySelectorAll("img");
    const middleImages = [images[1], images[2], images[3], images[4]];
    const otherImages = [images[5], images[6]];

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        markers: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      middleImages,
      {
        x: window.innerWidth,
        duration: 0.9,
        ease: "power2.inOut",
      },
      0
    );
    tl.to(
      middleImages,
      {
        y: (index) => (index - 1) * 45,
        duration: 0.7,
        ease: "power2.inOut",
      },
      0.1
    );
    tl.to(
      otherImages,
      {
        y: -170,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0.2
    );
    tl.to(
      imagesContainerRef.current,
      {
        height: "40px",
        duration: 0.4,
        ease: "power2.inOut",
      },
      0.2
    );
    tl.to(
      imagesContainerRef.current,
      {
        overflow: "hidden",
      },
      0.5
    );

    tl.to(
      textContentRef.current?.querySelector(".initial-content") as Element,
      {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
      },
      0.4
    );

    tl.to(
      textContentRef.current?.querySelector(".next-content") as Element,
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      0.6
    );

    tl.to(
      images[0],
      {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      },
      0.5
    );
  }, []);

  const mailImages = [
    { id: 7, src: "/scroll/card1.webp", alt: "Mail Image 7" },
    { id: 2, src: "/scroll/card2.webp", alt: "Mail Image 2" },
    { id: 3, src: "/scroll/card3.webp", alt: "Mail Image 3" },
    { id: 4, src: "/scroll/card4.webp", alt: "Mail Image 4" },
    { id: 5, src: "/scroll/card5.webp", alt: "Mail Image 5" },
    { id: 6, src: "/scroll/card6.webp", alt: "Mail Image 6" },
    { id: 1, src: "/scroll/card7.webp", alt: "Mail Image 1" },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="group flex items-center gap-1 cursor-pointer">
          <ArrowRight className="size-4 text-white opacity-0 translate-x-3 transition-all duration-300 ease-in-out group-hover:opacity-100" />
          <p className="text-white transition-all text-md duration-300 ease-in-out group-hover:translate-x-2">
            Scroll Down
          </p>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="w-full flex justify-around items-center relative min-h-screen bg-white px-8"
      >
        <div
          ref={backgroundRef}
          className="fixed inset-0 w-full h-screen "
          style={{
            backgroundImage: "url('/susan.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          ref={textContentRef}
          className="flex flex-col gap-6 max-w-lg relative"
        >
          <div className="initial-content">
            <p className="text-gray-800 font-bold">
              <span className="font-bold text-lg block mb-2">
                Cora screens your email
              </span>
              Cora knows what's important to you and the types of emails you
              need to respond to. It keeps those messages in your inbox for you
              to see ASAP.
            </p>
            <button className="mt-4 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
              Start your free trial <ArrowRight size={16} />
            </button>
          </div>

          <div className="next-content absolute top-0 left-0 opacity-0 translate-y-4">
            <p className="text-gray-800">
              <span className="font-medium text-lg block mb-2">
                Focus on what matters
              </span>
              With Cora handling your inbox, you can focus on the emails that
              truly need your attention. Say goodbye to email overload.
            </p>
            <button className="mt-4 text-sm px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
              Learn more <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={imagesContainerRef}
            className="relative w-[470px] shadow-2xl rounded-lg scrollbar-hide"
            style={{
              height: "auto",
            }}
          >
            {mailImages.map((img, index) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className="w-full h-10 object-cover border-b border-gray-200"
                style={{
                  backgroundColor: `hsl(${index * 50}, 70%, 80%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <p className="text-white text-2xl">Continue Scrolling</p>
      </div>
    </div>
  );
};

export default Cora;
