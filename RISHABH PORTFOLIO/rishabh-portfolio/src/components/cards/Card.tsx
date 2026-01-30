"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function Card({ children, className = "", delay = 0 }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`card ${className}`}
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                marginBottom: 0 // Grid handles gap, so we remove margin bottom
            }}
        >
            {children}
        </motion.div>
    );
}