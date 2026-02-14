import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // CHANGE to your real domain in production

  title: {
    default: "NatrajX Law Firm",
    template: "%s | NatrajX Law Firm",
  },

  description:
    "NatrajX Law Firm provides litigation, corporate advisory, and arbitration representation across India.",

  openGraph: {
    title: "NatrajX Law Firm",
    description:
      "Litigation, Corporate Advisory and Arbitration Practice.",
    url: "http://localhost:3000",
    siteName: "NatrajX Law Firm",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NatrajX Law Firm",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NatrajX Law Firm",
    description:
      "Litigation, Corporate Advisory and Arbitration Practice.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
