"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart3,
  Brain,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle,
  BookOpen,
  Clock,
  Trophy,
  MessageCircle,
  Globe,
  Shield,
} from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  // -----------------------------------------------------------------------
  // 1. EXTENDED FEATURES (6 cards)
  // -----------------------------------------------------------------------
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Quizzes",
      description:
        "Generate personalized quizzes in seconds using advanced AI. Choose topics, difficulty, and get instant feedback.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Learn 10x Faster",
      description:
        "Adaptive learning paths that evolve with your progress and keep you in the flow state.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Progress",
      description:
        "Detailed analytics, streak counters, and performance insights to stay motivated.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Curated Courses",
      description:
        "AI-generated, bite-sized courses on programming, languages, business, and more.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Certificates & Badges",
      description:
        "Earn shareable certificates and skill badges to showcase on LinkedIn or your résumé.",
      color: "from-amber-500 to-red-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual Support",
      description:
        "Learn in English, Spanish, French, German, Hindi, and 20+ languages.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  // -----------------------------------------------------------------------
  // 2. TESTIMONIALS
  // -----------------------------------------------------------------------
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Full-Stack Developer",
      content:
        "PK SkillGrow turned my daily 15-minute commute into a learning sprint. I earned a React badge in just two weeks!",
      avatar: "/testimonials/sarah.jpg",
    },
    {
      name: "Amit P.",
      role: "Data Analyst",
      content:
        "The AI-generated quizzes adapt perfectly to my weak spots. My SQL score jumped from 62 % to 94 % in a month.",
      avatar: "/testimonials/amit.jpg",
    },
    {
      name: "Maria G.",
      role: "High-School Teacher",
      content:
        "I use the platform with my students. The multilingual quizzes make inclusive learning effortless.",
      avatar: "/testimonials/maria.jpg",
    },
  ];

  // -----------------------------------------------------------------------
  // 3. FAQ (structured data ready)
  // -----------------------------------------------------------------------
  const faq = [
    {
      q: "Is PK SkillGrow really free?",
      a: "Yes! The core quiz engine, progress tracking, and thousands of community topics are 100 % free. Premium plans unlock unlimited AI course generation and advanced analytics.",
    },
    {
      q: "Do I need to install anything?",
      a: "No. PK SkillGrow runs completely in your browser – desktop, tablet, or phone.",
    },
    {
      q: "Can I track progress across devices?",
      a: "Absolutely. Sign in with Google, GitHub, or email and your streaks, badges, and analytics sync instantly.",
    },
    {
      q: "What subjects are available?",
      a: "Programming (JavaScript, Python, Java, etc.), Data Science, Mathematics, Languages, Business, Soft Skills, and more. New topics are added weekly.",
    },
    {
      q: "Is my data safe?",
      a: "We use end-to-end encryption for quiz answers and never sell personal data. Read our <a href='/privacy' class='underline'>Privacy Policy</a>.",
    },
  ];

  // -----------------------------------------------------------------------
  // 4. HOW-IT-WORKS STEPS
  // -----------------------------------------------------------------------
  const steps = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Sign Up in Seconds",
      desc: "Google, GitHub, or email – no credit card required.",
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Tell AI Your Goal",
      desc: "Pick a topic, skill level, and learning style.",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Start Adaptive Quiz",
      desc: "Answer questions; AI instantly adjusts difficulty.",
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Review & Grow",
      desc: "See detailed insights, earn badges, repeat.",
    },
  ];

  // -----------------------------------------------------------------------
  // 6. JSON-LD for FAQ & Testimonials (added in <head> later)
  // -----------------------------------------------------------------------
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    const testimonialSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: testimonials.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          reviewBody: t.content,
        },
      })),
    };

    const scriptFAQ = document.createElement("script");
    scriptFAQ.type = "application/ld+json";
    scriptFAQ.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFAQ);

    const scriptTest = document.createElement("script");
    scriptTest.type = "application/ld+json";
    scriptTest.text = JSON.stringify(testimonialSchema);
    document.head.appendChild(scriptTest);

    return () => {
      document.head.removeChild(scriptFAQ);
      document.head.removeChild(scriptTest);
    };
  }, []);

  return (
    <>
      {/* --------------------------------------------------------------
          1. HERO (unchanged + extra micro-copy)
      --------------------------------------------------------------- */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Logo + Title */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-50" />
                  <h1 className="relative text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-orange-550">
                    PK SkillGrow
                  </h1>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4"
              >
                Learn{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  10x Faster
                </span>{" "}
                with AI
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto"
              >
                Unlock your potential with AI-generated quizzes, personalized
                learning paths, real-time analytics, and shareable certificates.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Get Started Free <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">See How It Works</Link>
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-8 mt-12 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>10K+ Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span>AI-Powered</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --------------------------------------------------------------
            2. FEATURES (6 cards)
        --------------------------------------------------------------- */}
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Built for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Modern Learners
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience the future of education with intelligent, adaptive,
                and engaging learning tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="p-8 h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-3 mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------
            3. HOW IT WORKS
        --------------------------------------------------------------- */}
        <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Simple 4-Step Process
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Start Learning in Under a Minute
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------
            4. TESTIMONIALS
        --------------------------------------------------------------- */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Learner Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Community Says
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed" />
                      <div className="ml-3">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                    <p className="flex-grow italic text-gray-700 dark:text-gray-300">
                      “{t.content}”
                    </p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, s) => (
                        <svg
                          key={s}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.963c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.015 9.39c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.963z" />
                        </svg>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------
            5. FAQ
        --------------------------------------------------------------- */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                Frequently Asked Questions
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Got Questions? We’ve Got Answers
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <AccordionTrigger className="px-6 text-lg font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    <div dangerouslySetInnerHTML={{ __html: item.a }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* --------------------------------------------------------------
            7. FINAL CTA
        --------------------------------------------------------------- */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join <strong>10,000+</strong> learners already growing with
                AI-powered education.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 shadow-xl"
              >
                <Link href="/dashboard">
                  Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
