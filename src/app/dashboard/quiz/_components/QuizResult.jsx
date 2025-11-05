"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, XCircle, SkipForward, Home, CheckCircle2, Share2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { ShareButton } from "@/components/ShareButton";

const QuizResult = ({
  userAnswers = [],
  totalQuestions = 0,
  correctCount = 0,
  skippedCount = 0,
  incorrectCount = 0,
  scorePercentage = 0,
  quizId,
}) => {
  const router = useRouter();
  const [showReview, setShowReview] = useState(true);

  const getGrade = (p) => {
    if (p >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100" };
    if (p >= 80) return { grade: "A", color: "text-green-500", bg: "bg-green-100" };
    if (p >= 70) return { grade: "B", color: "text-blue-500", bg: "bg-blue-100" };
    if (p >= 60) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (p >= 50) return { grade: "D", color: "text-orange-600", bg: "bg-orange-100" };
    return { grade: "F", color: "text-red-600", bg: "bg-red-100" };
  };

  const { grade, color, bg } = getGrade(scorePercentage);

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-2xl bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-10">
          <div className="flex justify-center mb-4">
            <Trophy className={`w-20 h-20 ${color} animate-bounce`} />
          </div>
          <CardTitle className="text-4xl font-bold">Quiz Complete!</CardTitle>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className={`${bg} ${color} text-xl px-6 py-2`}>{grade}</Badge>
            <span className="text-3xl font-bold">{scorePercentage}%</span>
          </div>
        </CardHeader>

        <CardContent>
          {/* Score Meter */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Accuracy</span>
              <span>
                {correctCount} / {totalQuestions}
              </span>
            </div>
            <Progress value={scorePercentage} className="h-4" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Target, value: totalQuestions, label: "Total", color: "blue" },
              { icon: CheckCircle2, value: correctCount, label: "Correct", color: "green" },
              { icon: SkipForward, value: skippedCount, label: "Skipped", color: "yellow" },
              { icon: XCircle, value: incorrectCount, label: "Incorrect", color: "red" },
            ].map((stat, i) => (
              <div key={i} className={`text-center p-5 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-10 h-10 mx-auto text-${stat.color}-600 mb-2`} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Review Toggle */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">Question Review</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowReview(!showReview)}>
              {showReview ? "Hide" : "Show"}
            </Button>
          </div>

          {showReview && (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 mb-8">
              {userAnswers.map((ans, idx) => (
                <Card
                  key={idx}
                  className={`p-4 transition-all ${
                    ans.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2">
                        Q{idx + 1}: {ans.question}
                      </p>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-green-600 font-medium">Correct:</span> {ans.correctAnswer}
                        </p>
                        <p>
                          <span className={ans.isCorrect ? "text-green-600" : "text-red-600"} font-medium>
                            Your Answer:
                          </span>{" "}
                          {ans.selectedAnswer || <em className="text-gray-500">Skipped</em>}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 text-2xl font-bold">
                      {ans.isCorrect ? "Correct" : "Incorrect"}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => router.push("/dashboard/quiz")} className="gap-2">
              <Home className="w-5 h-5" /> Back to Quizzes
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = `/dashboard/quiz/${quizId}`)}
              className="gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Retake Quiz
            </Button>
            <ShareButton url={quizId} title={`I scored ${scorePercentage}% on PK SkillGrow!`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResult;