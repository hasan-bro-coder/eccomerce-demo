import Link from "next/link";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaMapPin,
} from "react-icons/fa";
import { LuMail } from "react-icons/lu";
export default function Footer() {
  return (
    <footer className="bg-background border-t border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-sm">CP</span>
              </div>
              <span className="text-xl font-bold text-white">CyclePro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for premium cycling parts and components.
              Quality guaranteed, performance delivered.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/products"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                All Products
              </Link>
              <Link
                href="/products?category=drivetrain"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Drivetrain
              </Link>
              <Link
                href="/products?category=brakes"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Brakes
              </Link>
              <Link
                href="/products?category=wheels-tires"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Wheels & Tires
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Shipping & Returns
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Size Guide
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Support
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Warranty
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <LuMail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  support@cyclepro.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  123 Cycling Street
                  <br />
                  Portland, OR 97205
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 CyclePro Parts. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
