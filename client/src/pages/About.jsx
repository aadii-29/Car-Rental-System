import React from 'react';
import mongoLogo from '../assets/mongo.png';
import expressLogo from '../assets/express.png';
import reactLogo from '../assets/react.png';
import nodeLogo from '../assets/node.png';

const About = () => {
  return (
    <div className="px-4 sm:px-10 py-12 max-w-6xl mx-auto space-y-16 text-gray-800">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          About Our Car Rental Platform
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We simplify car rentals with seamless user experience, modern tech, and admin-controlled management.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-white shadow-md rounded-xl p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-orange-600">📖 Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          Our Car Rental System is a full-stack application designed to modernize the car rental process. Users can explore available cars, book in real-time, and manage their rentals with ease. Admins handle cars, bookings, and users efficiently via a dedicated dashboard.
        </p>
      </section>

      {/* Features */}
      <section className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">🔑 Key Features</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-disc list-inside text-gray-700">
          <li>Fully responsive and intuitive UI</li>
          <li>Secure authentication for users and admins</li>
          <li>Car management with image uploads</li>
          <li>Booking system with availability checks</li>
          <li>Admin panel for booking and user management</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="bg-white shadow-md rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">⚙️ Technology Stack</h2>
        <div className="flex justify-center gap-10 flex-wrap items-center">
          <img src={mongoLogo} alt="MongoDB" className="h-12 hover:scale-110 transition" />
          <img src={expressLogo} alt="Express.js" className="h-12 hover:scale-110 transition" />
          <img src={reactLogo} alt="React.js" className="h-12 hover:scale-110 transition" />
          <img src={nodeLogo} alt="Node.js" className="h-12 hover:scale-110 transition" />
        </div>
        <p className="text-sm mt-4 text-gray-500">Built with the MERN Stack (MongoDB, Express, React, Node)</p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white shadow-md rounded-xl p-8 space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-orange-600">🎯 Mission & Vision</h2>
        <p>
          <span className="font-bold">Mission:</span> Deliver a fast, secure, and smooth car rental experience using cutting-edge technology.
        </p>
        <p>
          <span className="font-bold">Vision:</span> Be the most trusted car rental solution with exceptional service across cities.
        </p>
      </section>

      {/* Developer Info */}
      <section className="bg-gradient-to-br from-orange-100 to-yellow-50 shadow-inner rounded-xl p-10 text-center">
        <h2 className="text-2xl font-semibold text-orange-700 mb-6">👨‍💻 Meet the Developer</h2>
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6">
          <img
            src="https://avatars.githubusercontent.com/u/126479299?v=4"
            alt="Aditya Bhalerao"
            className="w-24 h-24 rounded-full mx-auto border-4 border-orange-300 mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">Aditya Bhalerao</h3>
          <p className="text-gray-600 text-sm mt-2">MERN Stack Developer | Passionate about building scalable web apps</p>
          <a
            href="https://github.com/AdityaB78" // optional
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full transition"
          >
            Connect on GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
