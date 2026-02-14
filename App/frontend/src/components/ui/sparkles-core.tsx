"use client";
import React, { useId, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SparkleProps {
  id: string;
  x: number;
  y: number;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

export const SparklesCore = (props: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity = 100,
  } = props;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const idProp = useId();
  const uniqueId = id || idProp;

  const sparkles: SparkleProps[] = Array.from({ length: particleDensity }).map(
    (_, i) => ({
      id: `${uniqueId}-${i}`,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      color: particleColor || "#FFF",
      delay: Math.random() * 2,
      scale: Math.random() * (maxSize || 1) + (minSize || 0.5),
      lifespan: Math.random() * (speed || 10) + 5,
    })
  );

  return (
    <div className={className}>
      <svg
        className="h-full w-full"
        style={{
          background: background || "transparent",
        }}
      >
        {sparkles.map((sparkle) => (
          <motion.circle
            key={sparkle.id}
            cx={sparkle.x}
            cy={sparkle.y}
            r={sparkle.scale}
            fill={sparkle.color}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: sparkle.lifespan,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
