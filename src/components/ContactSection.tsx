import React from "react";

const ContactSection = () => (
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
);

export default ContactSection;
