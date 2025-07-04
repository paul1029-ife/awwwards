import React from "react";

const AboutSection = () => (
  <section id="about" className="section-content py-20 px-8">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-on-scroll">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Our Studio
          </h2>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            We are a passionate team of designers, developers, and strategists
            dedicated to creating digital experiences that matter. With over a
            decade of experience, we've helped hundreds of brands establish
            their digital presence and achieve remarkable results.
          </p>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Our approach combines cutting-edge technology with timeless design
            principles, ensuring that every project we touch becomes a digital
            masterpiece that stands the test of time.
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
);

export default AboutSection;
