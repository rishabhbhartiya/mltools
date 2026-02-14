"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Award, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [ref, inView] = [React.useRef(null), true]; // Simplified for now

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto py-20">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
              <motion.div 
                className="relative w-32 h-32 bg-gradient-to-br from-primary-600 to-gold-500 rounded-full flex items-center justify-center shadow-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Scale className="w-16 h-16 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold mb-6">
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-gold-500"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                NatrajX
              </motion.span>
              <br />
              <span className="text-gray-800 dark:text-gray-100">Law Firm</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-100 to-gold-100 rounded-lg mb-4">
              <span className="font-semibold text-primary-700">Excellence in Legal Service Since 1979</span>
            </div>
            <p className="mt-4 text-xl max-w-3xl mx-auto">
              Your trusted partner in navigating complex legal challenges with integrity and expertise
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Award, value: "45+", label: "Years of Excellence", color: "from-primary-600 to-primary-700" },
              { icon: Users, value: "500+", label: "Satisfied Clients", color: "from-gold-500 to-gold-600" },
              { icon: TrendingUp, value: "98%", label: "Success Rate", color: "from-green-500 to-green-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-gold-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-gold-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
            
            <Link href="/expertise">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800 transition-all font-semibold text-lg shadow-xl"
              >
                Explore Our Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
