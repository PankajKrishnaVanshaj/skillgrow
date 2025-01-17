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

  // Open Graph metadata
  openGraph: {
    title: "PK SkillGrow - Elevate Your Knowledge with AI-Powered Learning",
    description:
      "Join PK SkillGrow and unlock the power of AI to improve your knowledge with engaging quizzes and personalized courses tailored to your needs.",
    url: "https://skillgrow.pankri.com",
    type: "website",
    images: [
      {
        url: "/skillgrow.png",
        width: 1200,
        height: 630,
        alt: "PK SkillGrow Platform - AI-Driven Learning",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "PK SkillGrow - Elevate Your Knowledge with AI-Powered Learning",
    description:
      "Explore PK SkillGrow, an innovative platform designed to boost your skills through AI-powered interactive quizzes and tailored educational courses.",
    images: ["/skillgrow.png"],
  },

  // Additional metadata
  author: "PK SkillGrow Team",
  themeColor: "#1D4ED8", // Tailwind Blue for consistency with the branding
  canonical: "https://skillgrow.pankri.com",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
