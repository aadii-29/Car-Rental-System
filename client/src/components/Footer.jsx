import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { HiArrowUpRight } from 'react-icons/hi2';
import { MdCall, MdEmail, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-4 sm:px-6 md:px-16 lg:px-24 pt-10 pb-8">
      {/* Top contact info */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 bg-[#1c1c1c] rounded-xl p-6 mb-12 text-sm sm:text-base">
        {/* Call */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#f3b24d] p-3 rounded-full">
            <MdCall className="text-black text-2xl" />
          </div>
          <div>
            <p className="font-semibold">Call us</p>
            <p>+91 7219024907</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#f3b24d] p-3 rounded-full">
            <MdEmail className="text-black text-2xl" />
          </div>
          <div>
            <p className="font-semibold">Write to us</p>
            <p>adityabhalerao@gmail.com</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#f3b24d] p-3 rounded-full">
            <MdLocationOn className="text-black text-2xl" />
          </div>
          <div>
            <p className="font-semibold">Address</p>
            <p>Pune, Viman Nagar, Office 123</p>
          </div>
        </div>
      </div>

      {/* Middle section */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mb-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-[#f3b24d]">
            <span className="text-white">CAR</span> RENTAL
          </h2>
          <p className="mt-4 text-gray-400">
            A premium car rental service offering affordable, reliable, and stylish vehicles for all needs.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3b24d] text-black">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3b24d] text-black">
              <FaXTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3b24d] text-black">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/cars" className="hover:text-white">Cars</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Want to be notified about our services? Sign up and we'll send you a notification by email.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full py-3 px-4 pr-14 rounded-full bg-transparent border border-[#f3b24d] text-white focus:outline-none"
            />
            <button className="absolute top-1 right-1 bg-[#f3b24d] hover:bg-yellow-400 text-black p-2 rounded-full">
              <HiArrowUpRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-sm text-center text-gray-500 pt-6 border-t border-gray-700">
        &copy; 2025 <span className="text-white font-medium underline">carRental</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
