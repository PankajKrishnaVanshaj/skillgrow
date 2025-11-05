"use client";
import Link from "next/link";
import QuizList from "./quiz/_components/QuizList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Trophy, Target, Clock, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    avgAccuracy: 0,
    streak: 0,
  });

  // Mock stats (replace with real API later)
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalQuizzes: 12,
        totalQuestions: 84,
        avgAccuracy: 78,
        streak: 5,
      });
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-20 shadow-2xl">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
            PK SkillGrow
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed">
            Empower your learning with{" "}
            <span className="font-bold text-yellow-300">AI-generated quizzes</span> tailored to your goals. 
            Track progress, master concepts, and unlock your true potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            >
              <Link href="/dashboard/quiz" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Quiz
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white/20 backdrop-blur text-white border border-white/30 hover:bg-white/30"
            >
              <Link href="/dashboard/quiz" className="flex items-center gap-2">
                View All Quizzes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Quizzes", value: stats.totalQuizzes, icon: BookOpen, color: "blue" },
            { label: "Questions Solved", value: stats.totalQuestions, icon: Target, color: "green" },
            { label: "Avg Accuracy", value: `${stats.avgAccuracy}%`, icon: Trophy, color: "yellow" },
            { label: "Current Streak", value: stats.streak, icon: Sparkles, color: "purple" },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-white/80 backdrop-blur shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                {stat.label === "Avg Accuracy" && (
                  <Progress value={stats.avgAccuracy} className="mt-3 h-2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quiz Library */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Your Quiz Library
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Continue learning or create something new
                </p>
              </div>
              <Button variant="outline" asChild size="sm">
                <Link href="/dashboard/quiz" className="flex items-center gap-2">
                  Manage All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <QuizList />
          </CardContent>
        </Card>
      </section>

      {/* Empty State (if no quizzes) */}
      {stats.totalQuizzes === 0 && (
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No quizzes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your learning journey by creating your first AI-powered quiz!
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard/quiz" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Your First Quiz
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;