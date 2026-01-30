"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AnimatedBackground({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ visibility: "hidden" }}>{children}</div>;
    }

    return (
        <div
            style={{
                width: "100%",
                background: "var(--bg)",
                color: "var(--text)",
                position: "relative",
                transition: "background 0.3s ease, color 0.3s ease",
                overflowX: "hidden"
            }}
        >
            {children}
        </div>
    );
}
