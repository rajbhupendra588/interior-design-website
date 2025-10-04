import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LuxeInteriors - Award-Winning Interior Design Studio",
  description:
    "Transform your space into an elegant sanctuary with world-class interior design services. From concept to completion, we bring your vision to life with sophistication and timeless style.",
  keywords: [
    "interior design",
    "luxury interiors",
    "home design",
    "commercial design",
    "3D visualization",
    "interior designer",
    "modern interiors",
    "residential design",
  ],
  authors: [{ name: "LuxeInteriors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxeinteriors.com",
    siteName: "LuxeInteriors",
    title: "LuxeInteriors - Award-Winning Interior Design Studio",
    description:
      "Transform your space into an elegant sanctuary with world-class interior design services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LuxeInteriors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeInteriors - Award-Winning Interior Design Studio",
    description:
      "Transform your space into an elegant sanctuary with world-class interior design services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
