"use client";
import React from "react";
import { motion } from "framer-motion";
import { Scale, Building2, Plane, HardHat, ShoppingCart, GraduationCap, Zap, FileText, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

const expertiseAreas = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Banking & Finance",
    description: "Comprehensive legal solutions for financial institutions and banking operations.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "Litigation",
    description: "Expert representation in civil, criminal, and commercial litigation matters.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Capital Market",
    description: "Strategic legal advice for securities law and capital market transactions.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Civil Aviation",
    description: "Specialized legal services for aviation industry regulations and compliance.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    title: "Construction Industry",
    description: "Legal support for construction contracts, disputes, and regulatory compliance.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-commerce & Retail",
    description: "Guidance on digital business regulations and consumer protection laws.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Education Sector",
    description: "Legal counsel for educational institutions and regulatory compliance.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Energy & Infrastructure",
    description: "Expert advice on energy projects and infrastructure development.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Real Estate",
    description: "Complete legal services for property transactions and real estate matters.",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Healthcare & Pharmaceuticals",
    description: "Specialized legal support for healthcare providers and pharmaceutical companies.",
    color: "from-rose-500 to-rose-600"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ExpertiseSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Area of <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal services across multiple industries and practice areas
          </p>
        </motion.div>

        {/* Expertise cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 bg-gradient-to-br ${area.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {area.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {area.description}
                </p>

                {/* Learn more link */}
                <Link
                  href={`/expertise#${area.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-primary font-semibold inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/expertise"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
          >
            See All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
