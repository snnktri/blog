import React from 'react';
import AboutImg from "../assets/About.jpg";

const About = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      
      {/* Hero Section */}
      <div className="relative w-full bg-gray-800">
        <img 
          src={AboutImg} 
          alt="about image" 
          className="z-0 w-full h-auto sm:h-64 lg:h-140 md:h-120 object-cover opacity-50 filter blur-xs"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl text-white z-10 font-bold text-center">
            About Blog Website
          </h1>
          <p className="p-4 text-gray-200 text-center z-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec tellus id felis faucibus gravida. 
            Quisque vel tortor at mi consectetur bibendum. Donec auctor, velit id pharetra facilisis, justo velit 
            faucibus tellus, ac consectetur ex arcu a velit.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-center text-gray-800 mb-4 font-semibold">Our Mission</h2>
          <p className="p-4 text-gray-700 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec tellus id felis faucibus gravida. Quisque vel tortor at mi consectetur bibendum. Donec auctor, velit id pharetra facilisis, justo velit faucibus tellus, ac consectetur ex arcu a velit.
          </p>
        </div>
      </div>

    </div>
  )
}

export default About;
