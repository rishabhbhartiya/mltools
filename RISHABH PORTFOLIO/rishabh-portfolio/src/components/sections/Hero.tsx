// src/components/sections/Hero.tsx
import { EncryptedText } from "@/components/ui/encrypted-text";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { FloatingDock } from "@/components/ui/floating-dock";
import styles from "@/app/page.module.css";
import {
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";

// Kaggle icon
const KaggleIcon = () => (
    <svg className="h-full w-full text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
    </svg>
);

export default function Hero() {
    const socialLinks = [
        {
            title: "GitHub",
            icon: <IconBrandGithub className="h-full w-full text-neutral-300" />,
            href: "https://github.com/rishabhbhartiya",
        },
        {
            title: "LinkedIn",
            icon: <IconBrandLinkedin className="h-full w-full text-neutral-300" />,
            href: "https://linkedin.com/in/rishabhbhartiya",
        },
        {
            title: "Kaggle",
            icon: <KaggleIcon />,
            href: "https://www.kaggle.com/rishabhbhartiya",
        },
    ];

    return (
        <section id="home" className={styles.heroSection}>
            {/* TOP SECTION: RISHABH */}
            <div className={styles.nameContainer}>
                <div className={`${styles.ruler} flex justify-center`}>
                    <div className="w-full max-w-[1100px] px-8 py-6">
                        <TextHoverEffect text="RISHABH" />
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Teal Role Box */}
            <div className={styles.bottomRoleContainer}>
                <div className={`${styles.ruler}`}>
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <span className="block text-blue-200 font-mono text-xs tracking-[0.3em] uppercase">
                            Available for Research & Collaboration
                        </span>

                        <h1 className="font-bold text-white text-[clamp(2rem,5vw,4.5rem)] leading-tight">
                            <span className="block w-full text-center">
                                <EncryptedText
                                    text="Machine Learning Engineer"
                                    revealedClassName="text-white"
                                />
                            </span>
                        </h1>

                        {/* Floating Dock - Ensure horizontal with inline flex */}
                        <div className="w-full flex items-center justify-center pt-4">
                            <FloatingDock items={socialLinks} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}