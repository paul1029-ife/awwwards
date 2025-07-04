import React from "react";

const ServicesSection = () => (
  <section id="services" className="section-content py-20 px-8 bg-black/20">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Our Services
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We offer comprehensive digital solutions to help your brand thrive in
          the digital landscape
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
);

export default ServicesSection;
