"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text }: { text: string }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (svgRef.current) {
                const rect = svgRef.current.getBoundingClientRect();
                const cx = ((e.clientX - rect.left) / rect.width) * 100;
                const cy = ((e.clientY - rect.top) / rect.height) * 100;
                setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 1600 350"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto select-none overflow-visible"
        >

            <defs>
                <radialGradient id="revealMask" r="25%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </radialGradient>
                <mask id="textMask">
                    <circle cx={maskPosition.cx} cy={maskPosition.cy} r="20%" fill="url(#revealMask)" />
                </mask>
            </defs>

            <text
                x="50%" y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-transparent stroke-neutral-800 uppercase"
                style={{ fontSize: "280px", fontWeight: 900 }}
            >
                {text}
            </text>

            <motion.text
                x="50%" y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-transparent stroke-neutral-600 uppercase"
                style={{ fontSize: "280px", fontWeight: 900 }}
                initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
            >
                {text}
            </motion.text>

            <text
                x="50%" y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                stroke="white"
                strokeWidth="3"
                mask="url(#textMask)"
                className="fill-transparent uppercase"
                style={{ fontSize: "280px", fontWeight: 900 }}
            >
                {text}
            </text>
        </svg>
    );
};
