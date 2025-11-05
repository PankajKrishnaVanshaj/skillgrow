"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { 
  Brain, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auto-redirect if already signed in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Metadata */}
      <head>
        <title>Login to PK SkillGrow - AI-Powered Learning Dashboard</title>
        <meta
          name="description"
          content="Sign in to PK SkillGrow with Google to access AI-generated quizzes, personalized courses, progress tracking, and skill badges."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://skillgrow.pankri.com/login" />

        {/* Open Graph */}
        <meta property="og:title" content="Login to PK SkillGrow" />
        <meta
          property="og:description"
          content="Unlock AI-powered learning. Sign in to start quizzes, track progress, and earn certificates."
        />
        <meta property="og:url" content="https://skillgrow.pankri.com/login" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://skillgrow.pankri.com/skillgrow.png" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Login - PK SkillGrow",
              description: "Sign in to access your personalized AI learning dashboard.",
              url: "https://skillgrow.pankri.com/login",
            }),
          }}
        />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-5xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Login Card */}
            <Card className="p-8 md:p-10 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0">
              <div className="text-center space-y-6">
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-40" />
                    <Image
                      src="/skillgrow.png"
                      alt="PK SkillGrow Logo"
                      width={80}
                      height={80}
                      className="relative z-10"
                      priority
                    />
                  </div>
                </motion.div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    Welcome Back
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Sign in to continue your learning journey
                  </p>
                </div>

                {/* Google Sign-In */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => signIn("google")}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </motion.div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-blue-600">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-blue-600">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </Card>

            {/* Right: Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block space-y-8"
            >
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI-Powered Learning
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Unlock Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Full Potential
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Join 10,000+ learners using AI to master new skills 10x faster.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Brain, text: "AI-generated personalized quizzes" },
                  { icon: Zap, text: "Learn 10x faster with adaptive paths" },
                  { icon: Shield, text: "Secure & private – no data selling" },
                  { icon: CheckCircle, text: "Earn certificates & LinkedIn badges" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Button asChild variant="outline" size="lg">
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Explore Without Signing In
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Mobile CTA */}
          <div className="md:hidden mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              New here?{" "}
              <Link href="/" className="font-medium text-blue-600 hover:underline">
                Explore the platform
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}