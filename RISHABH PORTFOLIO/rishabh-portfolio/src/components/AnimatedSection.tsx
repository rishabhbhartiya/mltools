"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedSection({
    children,
    className = "",
    delay = 0,
}: AnimatedSectionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // ⬇️ Server + first client render (NO animation)
    if (!mounted) {
        return (
            <div className={`w-full flex flex-col items-center justify-center ${className}`}>
                {children}
            </div>
        );
    }

    // ⬇️ Animate ONLY after hydration
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={`w-full flex flex-col items-center justify-center ${className}`}
        >
            {children}
        </motion.div>
    );
}
