"use client";
import { useState, useEffect, useMemo } from "react";
import AddQuiz from "./_components/AddQuiz";
import QuizList from "./_components/QuizList";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, BookOpen, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

const DIFFICULTY_COLORS = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const Quiz = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [quizStats, setQuizStats] = useState({
    total: 0,
    byDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
    lastCreated: null,
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock stats update (replace with real API later)
  useEffect(() => {
    setQuizStats({
      total: 12,
      byDifficulty: { Easy: 5, Medium: 4, Hard: 3 },
      lastCreated: "2 hours ago",
    });
  }, []);

  const filteredQuizzes = useMemo(() => {
    // This will be used by QuizList via props or context
    return { searchQuery, selectedDifficulty };
  }, [searchQuery, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Sticky Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>

            <h1 className="text-2xl md:text-3xl font-bold text-primary">My Quizzes</h1>

            <div className="w-28" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li>
              <Link href="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-primary font-medium">My Quizzes</span>
            </li>
          </ol>
        </nav>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {isLoading ? <Skeleton className="h-8 w-12" /> : quizStats.total}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Difficulty</p>
                <div className="flex gap-1 mt-1">
                  {isLoading ? (
                    <Skeleton className="h-6 w-20" />
                  ) : (
                    Object.entries(quizStats.byDifficulty).map(([diff, count]) => (
                      count > 0 && (
                        <Badge
                          key={diff}
                          variant="secondary"
                          className={`${DIFFICULTY_COLORS[diff]} text-xs`}
                        >
                          {diff} ({count})
                        </Badge>
                      )
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Created</p>
                <p className="text-lg font-semibold text-gray-800">
                  {isLoading ? <Skeleton className="h-6 w-24" /> : quizStats.lastCreated || "Never"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Quiz */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl flex items-center gap-2 text-primary">
              <Plus className="w-6 h-6" />
              Create New Quiz
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Generate AI-powered quizzes tailored to your subject and difficulty.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AddQuiz />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="hidden lg:block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">More quizzes coming...</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search quizzes by title, subject, or chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur"
              />
            </div>
          </div>

          <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <TabsList className="grid grid-cols-4 w-full md:w-auto bg-white/80 backdrop-blur">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Easy">Easy</TabsTrigger>
              <TabsTrigger value="Medium">Medium</TabsTrigger>
              <TabsTrigger value="Hard">Hard</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Quiz List */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-primary">
              All Your Quizzes
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {searchQuery || selectedDifficulty !== "all"
                ? `Filtered results`
                : "Review, play, or delete your quizzes"}
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <QuizList filters={filteredQuizzes} />
            )}
          </CardContent>
        </Card>

        {/* Empty State */}
        {!isLoading && quizStats.total === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No quizzes yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start your learning journey by creating your first AI-powered quiz!
            </p>
            <Button asChild size="lg">
              <Link href="#create" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Your First Quiz
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;