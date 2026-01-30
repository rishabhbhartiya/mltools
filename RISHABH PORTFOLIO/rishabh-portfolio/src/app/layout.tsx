import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />

                {/* HERO & CONTENT — NO OVERLAY */}
                <main>{children}</main>

                {/* Animated background only for lower sections */}
                <AnimatedBackground>
                    <Footer />
                </AnimatedBackground>
            </body>
        </html>
    );
}
