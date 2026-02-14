"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Phone, Scale } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Practice Areas", href: "/practice-areas" },
  { name: "Case Results", href: "/case-results" },
  { name: "Insights", href: "/insights" },
  { name: "Media", href: "/media" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-secondary text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>NEW DELHI | AHMEDABAD | CHENNAI | MUMBAI</span>
          <div className="flex gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-gold-600">
              <Phone size={14} />+91 9876543210
            </a>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Scale className="w-7 h-7 text-gray-800" />
              <span className="text-2xl font-serif font-semibold tracking-wide">
                Argentum Legal
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-black transition-colors text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

    </>
  );
}