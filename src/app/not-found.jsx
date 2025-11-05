"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Search, BookOpen, Brain, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function NotFound() {
  // Optional: Add JSON-LD for Breadcrumb (helps SEO)
  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://skillgrow.pankri.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "404 - Page Not Found",
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const suggestedLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/dashboard", label: "Dashboard", icon: <Brain className="w-5 h-5" /> },
    { href: "/quizzes", label: "Browse Quizzes", icon: <Search className="w-5 h-5" /> },
    { href: "/courses", label: "Explore Courses", icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center px-6 py-12">
        <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl w-full"
        >
          <Card className="overflow-hidden shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0">
            <div className="p-10 md:p-16 text-center">
              {/* 404 Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-block mb-8"
              >
                <Badge
                  variant="secondary"
                  className="text-6xl md:text-8xl font-bold py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
                >
                  404
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4"
              >
                Oops! Page Not Found
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                The page you're looking for seems to have wandered off into the
                digital wilderness. But don’t worry — let’s get you back on
                track!
              </motion.p>

              {/* Fun Illustration */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-center mb-10"
              >
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
                    <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-white animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    ?
                  </motion.div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Go to Dashboard
                  </Link>
                </Button>
              </motion.div>

              {/* Suggested Links */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Or explore these popular pages:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  {suggestedLinks.map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all"
                      >
                        <Link href={link.href} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                            {link.icon}
                          </div>
                          <span className="font-medium">{link.label}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fun Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Pro tip: Use the search bar in the header to find quizzes instantly!
              </motion.p>
            </div>
          </Card>

          {/* Back to Top / Home Link */}
          <div className="mt-8 text-center">
            <Button variant="link" asChild className="text-gray-600 dark:text-gray-400">
              <Link href="/" className="flex items-center gap-1 mx-auto">
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}