import "./globals.css";
import { NextAuthProvider } from "./Providers";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const Header = dynamic(() => import("@/components/Header"), { ssr: true });

export const metadata = {
  title: "PK SkillGrow - Free AI Quiz & Course Generator",
  description:
    "Generate AI-powered quizzes and courses for free. Create interactive learning content in seconds with PK SkillGrow — the #1 AI learning platform.",
  keywords:
    "ai quiz generator free, free ai course generator, make quiz with ai, ai learning platform free, generate course with ai, PK SkillGrow",
  robots: "index, follow",
  manifest: "/manifest.json",
  openGraph: {
    title: "PK SkillGrow - Free AI Quiz & Course Generator",
    description:
      "Create AI-powered quizzes and personalized courses instantly. 100% free. No login required.",
    url: "https://skillgrow.pankri.com",
    siteName: "PK SkillGrow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://skillgrow.pankri.com/skillgrow-og.jpg",
        width: 1200,
        height: 630,
        alt: "PK SkillGrow - Free AI Quiz Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Quiz & Course Generator - PK SkillGrow",
    description: "Make interactive quizzes & courses with AI in seconds. Free forever.",
    images: ["https://skillgrow.pankri.com/skillgrow-og.jpg"],
    creator: "@pankri",
  },
  alternates: {
    canonical: "https://skillgrow.pankri.com",
  },
  authors: [{ name: "PK SkillGrow Team", url: "https://skillgrow.pankri.com" }],
  themeColor: "#1D4ED8",
  viewport: "width=device-width, initial-scale=1",
  charSet: "utf-8",
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PK SkillGrow - AI Quiz & Course Generator",
    applicationCategory: "EducationApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: "https://skillgrow.pankri.com",
    },
    description:
      "Free AI-powered quiz and course generator. Create interactive learning content in seconds. No signup needed.",
    url: "https://skillgrow.pankri.com",
    image: "https://skillgrow.pankri.com/skillgrow-og.jpg",
    publisher: {
      "@type": "Organization",
      name: "PK SkillGrow",
      url: "https://skillgrow.pankri.com",
      logo: {
        "@type": "ImageObject",
        url: "https://skillgrow.pankri.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "342",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sarah L." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Best free AI quiz tool I've used!",
      },
    ],
    featureList: [
      "AI Quiz Generator",
      "AI Course Creator",
      "100% Free",
      "No Login Required",
      "Export to PDF/SCORM",
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Essential Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#1D4ED8" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Canonical */}
        <link rel="canonical" href="https://skillgrow.pankri.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preload Critical Assets */}
        <link rel="preload" href="/fonts/GeistVF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/skillgrow-og.jpg" as="image" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>

      <body >
        <NextAuthProvider>
          <div className="flex flex-col ">
            <Header />
            <main className="flex-grow min-h-screen">{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}