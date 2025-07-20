import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="  text-gray-700 py-12 px-6 sm:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <h2
            data-aos="zoom-in"
            className="text-2xl font-bold mb-4 text-red-400"
          >
            Fashionista
          </h2>
          <p
            data-aos="zoom-in"
            className="text-sm text-gray-600 leading-relaxed"
          >
            Discover trendsetting styles and elevate your wardrobe with premium
            fashion picks.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 data-aos="zoom-in" className="text-lg font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                Home
              </a>
            </li>
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                Shop
              </a>
            </li>
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                About
              </a>
            </li>
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 data-aos="zoom-in" className="text-lg font-semibold mb-4">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                FAQs
              </a>
            </li>
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                Shipping
              </a>
            </li>
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                Returns
              </a>
            </li>
            <li data-aos="zoom-in">
              <a href="#" className="hover:text-red-400 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media + Newsletter */}
        <div>
          <h3 data-aos="zoom-in" className="text-lg font-semibold mb-4">
            Stay Connected
          </h3>
          <div
            data-aos="zoom-in"
            className="flex gap-4 mb-6 text-red-400 text-xl"
          >
            <a href="#" className="hover:text-red-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaInstagram />
            </a>
          </div>

          <form className="flex flex-col">
            <input
              data-aos="zoom-in"
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded bg-gray-200 text-gray-800 mb-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            <button
              data-aos="zoom-in"
              data-aos-offset="50"
              type="submit"
              className="bg-red-400 hover:bg-red-500 transition-all duration-300 text-white py-2 rounded shadow-md hover:shadow-red-400/50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
