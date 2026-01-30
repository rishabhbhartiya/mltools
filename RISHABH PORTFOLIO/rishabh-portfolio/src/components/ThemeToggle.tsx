"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "8px 16px",
                color: "var(--text)",
                cursor: "pointer",
                transition: "all 0.2s ease"
            }}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
    );
}