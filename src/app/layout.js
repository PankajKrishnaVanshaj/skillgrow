import localFont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from "./Providers";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"));

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  manifest: "/manifest.json",
  title: "PK SkillGrow - Elevate Your Knowledge with AI-Powered Learning",
  description:
    "PK SkillGrow is an AI-driven platform offering interactive quizzes, tailored courses, and educational resources to help you advance your skills and knowledge.",
  keywords:
    "PK SkillGrow, AI learning platform, interactive quizzes, personalized courses, skill development, AI education, knowledge enhancement, online learning, education technology, AI-powered quizzes, course generator",
  openGraph: {
    title: "PK SkillGrow - Elevate Your Knowledge with AI-Powered Learning",
    description:
      "Join PK SkillGrow and unlock the power of AI to improve your knowledge with engaging quizzes and personalized courses tailored to your needs.",
    url: "https://skillgrow.pankri.com",
    type: "website",
    images: [
      {
        url: "https://skillgrow.pankri.com/skillgrow.png", // Absolute URL
        width: 1200,
        height: 630, // 1.9:1 ratio; consider 1000x1500 for Pinterest
        alt: "PK SkillGrow Platform - AI-Driven Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PK SkillGrow - Elevate Your Knowledge with AI-Powered Learning",
    description:
      "Explore PK SkillGrow, an innovative platform designed to boost your skills through AI-powered interactive quizzes and tailored educational courses.",
    images: ["https://skillgrow.pankri.com/skillgrow.png"], // Absolute URL
  },
  author: "PK SkillGrow Team",
  themeColor: "#1D4ED8",
  canonical: "https://skillgrow.pankri.com",
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PK SkillGrow",
    applicationCategory: "EducationApplication", // Updated to reflect learning focus
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0", // Adjust if there's a price
      priceCurrency: "USD",
    },
    description:
      "PK SkillGrow is an AI-driven platform offering interactive quizzes, tailored courses, and educational resources to enhance your skills and knowledge.",
    url: "https://skillgrow.pankri.com",
    image: "https://skillgrow.pankri.com/skillgrow.png",
    publisher: {
      "@type": "Organization",
      name: "PK SkillGrow Team",
      url: "https://skillgrow.pankri.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5", // Placeholder; replace with real data
      reviewCount: "100", // Placeholder; replace with real data
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
