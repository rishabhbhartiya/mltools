"use client";
import React, { useEffect, useState } from "react";

interface EncryptedTextProps {
    text: string;
    encryptedClassName?: string;
    revealedClassName?: string;
    revealDelayMs?: number;
}

export const EncryptedText = ({
    text,
    encryptedClassName = "",
    revealedClassName = "",
    revealDelayMs = 50,
}: EncryptedTextProps) => {
    const [displayText, setDisplayText] = useState("");
    const [isDone, setIsDone] = useState(false); // Track completion here
    const chars = "!@#$%^&*()_+[]{};:,.<>/?0123456789";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                setIsDone(true); // Mark as finished
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, revealDelayMs);

        return () => clearInterval(interval);
    }, [text, revealDelayMs]);

    return (
        <span className={isDone ? revealedClassName : encryptedClassName}>
            {displayText}
        </span>
    );
};