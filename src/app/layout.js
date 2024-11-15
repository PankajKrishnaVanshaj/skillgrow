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
  title:
    "PK SkillGrow - Enhance Your Knowledge with AI-Driven Quizzes & Courses",
  description:
    "PK SkillGrow is an AI-powered platform that helps users enhance their knowledge through interactive quizzes, personalized courses, and educational resources.",
  keywords:
    "PK SkillGrow, AI knowledge platform, generate quizzes, interactive courses, skill enhancement, AI-powered learning, education, quiz generator, course generator, knowledge boost",

  // Open Graph metadata
  openGraph: {
    title:
      "PK SkillGrow - Enhance Your Knowledge with AI-Driven Quizzes & Courses",
    description:
      "Discover PK SkillGrow, an AI-powered platform designed to help you enhance your knowledge through interactive quizzes and customized courses.",
    url: "http://skillgrow.pankri.com",
    type: "website",
    images: [
      {
        url: "/skillgrow.png",
        width: 1200,
        height: 630,
        alt: "PK SkillGrow Platform",
      },
    ],
  },
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
