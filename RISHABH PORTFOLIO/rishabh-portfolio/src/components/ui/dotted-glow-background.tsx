"use client";

import { cn } from "@/lib/utils"; // Ensure you have this utility or remove/replace with standard string interpolation
import React, { useEffect, useRef, useState } from "react";

interface DottedGlowBackgroundProps {
    className?: string;
    gap?: number;
    radius?: number;
    color?: string;
    darkColor?: string;
    glowColor?: string;
    darkGlowColor?: string;
    colorLightVar?: string;
    colorDarkVar?: string;
    glowColorLightVar?: string;
    glowColorDarkVar?: string;
    opacity?: number;
    backgroundOpacity?: number;
    speedMin?: number;
    speedMax?: number;
    speedScale?: number;
}

export const DottedGlowBackground = ({
    className,
    gap = 12,
    radius = 2,
    color = "rgba(0,0,0,0.7)",
    darkColor,
    glowColor = "rgba(0, 170, 255, 0.85)",
    darkGlowColor,
    colorLightVar,
    colorDarkVar,
    glowColorLightVar,
    glowColorDarkVar,
    opacity = 0.6,
    backgroundOpacity = 0,
    speedMin = 0.4,
    speedMax = 1.3,
    speedScale = 1,
}: DottedGlowBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Helper to resolve CSS variables to hex/rgba
    const getVariableValue = (variable?: string) => {
        if (!variable) return null;
        if (typeof window === "undefined") return null;
        const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
        return value ? `rgb(${value.trim()})` : null; // Assuming vars are like "255 255 255" or similar standard
    };

    useEffect(() => {
        // Simple dark mode detection observer
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let dots: any[] = [];

        // Determine active colors based on theme
        const activeDotColor = isDarkMode
            ? getVariableValue(colorDarkVar) || darkColor || color
            : getVariableValue(colorLightVar) || color;

        const activeGlowColor = isDarkMode
            ? getVariableValue(glowColorDarkVar) || darkGlowColor || glowColor
            : getVariableValue(glowColorLightVar) || glowColor;

        const initDots = () => {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            dots = [];

            // Create grid
            for (let x = 0; x < canvasWidth; x += gap) {
                for (let y = 0; y < canvasHeight; y += gap) {
                    // Randomize start phase and speed for natural pulsing
                    const speed = (Math.random() * (speedMax - speedMin) + speedMin) * speedScale;
                    const phase = Math.random() * Math.PI * 2;

                    dots.push({
                        x,
                        y,
                        baseRadius: radius,
                        speed,
                        phase,
                    });
                }
            }
        };

        const draw = (time: number) => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Handle Background Opacity
            if (backgroundOpacity > 0) {
                ctx.fillStyle = isDarkMode ? `rgba(0,0,0,${backgroundOpacity})` : `rgba(255,255,255,${backgroundOpacity})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Convert time to seconds
            const t = time / 1000;

            dots.forEach((dot) => {
                // Calculate dynamic alpha based on sine wave
                // We oscillate between 0.2 and 1.0 roughly
                const alpha = (Math.sin(t * dot.speed + dot.phase) + 1) / 2;
                const currentOpacity = alpha * opacity;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.baseRadius, 0, Math.PI * 2);

                // Base Fill
                ctx.fillStyle = activeDotColor || "rgba(0,0,0,0.5)";

                // Apply global opacity to the fill
                ctx.globalAlpha = currentOpacity;
                ctx.fill();

                // Glow Effect
                // Only apply glow when opacity is high to save performance and create "twinkle"
                if (currentOpacity > 0.5) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = activeGlowColor || "rgba(255,255,255,0.8)";
                    ctx.fill();
                    ctx.shadowBlur = 0; // Reset
                }

                ctx.globalAlpha = 1.0; // Reset
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        // Resize Handler
        const handleResize = () => {
            if (containerRef.current && canvas) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                // Scale for high DPI displays
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.scale(dpr, dpr);
                initDots();
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // Start loop
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [
        gap,
        radius,
        color,
        darkColor,
        glowColor,
        darkGlowColor,
        colorLightVar,
        colorDarkVar,
        glowColorLightVar,
        glowColorDarkVar,
        opacity,
        backgroundOpacity,
        speedMin,
        speedMax,
        speedScale,
        isDarkMode // Re-init if theme changes
    ]);

    return (
        <div
            ref={containerRef}
            // Added style={{ position: "absolute", ... }} to force behavior
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            className={cn("bg-transparent", className)}
        >
            <canvas ref={canvasRef} className="block" style={{ display: "block" }} />
        </div>
    );
};