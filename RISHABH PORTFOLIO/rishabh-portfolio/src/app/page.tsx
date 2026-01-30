// src/app/page.tsx
import styles from "./page.module.css";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
    return (
        <main className={styles.mainContainer}>
            {/* Viewport 1 */}
            <Hero />

            {/* Viewport 2 and onwards */}
            <div className={styles.aboutFullWidth}>
                <About />
                <FeaturedProjects />
                <Experience />
                <Skills />
                <Contact />
            </div>
                
        </main>
    );
}