import React from "react";

const PortfolioSection = () => (
  <section id="portfolio" className="section-content py-20 px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Featured Work
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our latest projects and see how we've helped brands achieve
          their digital goals
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
);

export default PortfolioSection;
