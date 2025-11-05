"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import QuizResult from "../_components/QuizResult";
import { useRouter } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, SkipForward, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

const TIME_PER_QUESTION = 30;

const QuizPlay = ({ params }) => {
  const router = useRouter();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [skippedCount, setSkippedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isLoading, setIsLoading] = useState(true);

  const isManualSkip = useRef(false);
  const timerId = useRef(null);
  const audioContext = useRef(null);

  // ── Fetch quiz ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/quiz", {
          params: { id: params.quizId },
        });
        const questions = data.data.questions || [];
        setQuizQuestions(questions);
      } catch (error) {
        console.error("Failed to load quiz:", error);
        alert("Quiz not found.");
        router.push("/dashboard/quiz");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [params.quizId, router]);

  // ── Timer ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (quizFinished || isLoading || quizQuestions.length === 0) return;

    setTimeLeft(TIME_PER_QUESTION);
    isManualSkip.current = false;

    if (timerId.current) clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && !isManualSkip.current) {
          handleSkipQuestion();
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [currentQuestionIndex, quizFinished, isLoading, quizQuestions.length]);

  // ── Sound effect ─────────────────────────────────────────────────────
  const playSound = useCallback((type) => {
    if (!audioContext.current) audioContext.current = new AudioContext();
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    osc.connect(gain);
    gain.connect(audioContext.current.destination);

    if (type === "correct") {
      osc.frequency.value = 600;
      gain.gain.value = 0.3;
    } else if (type === "incorrect") {
      osc.frequency.value = 300;
      gain.gain.value = 0.4;
    } else {
      osc.frequency.value = 450;
      gain.gain.value = 0.2;
    }

    osc.start();
    osc.stop(audioContext.current.currentTime + 0.15);
  }, []);

  // ── Answer handling ───────────────────────────────────────────────────
  const handleOptionClick = useCallback(
    (option) => {
      if (selectedOption || quizFinished) return;

      const currentQ = quizQuestions[currentQuestionIndex];
      const correct = option === currentQ.answer;

      setSelectedOption(option);
      setIsAnswerCorrect(correct);
      playSound(correct ? "correct" : "incorrect");

      setUserAnswers((prev) => [
        ...prev,
        {
          question: currentQ.question,
          selectedAnswer: option,
          correctAnswer: currentQ.answer,
          isCorrect: correct,
        },
      ]);

      if (correct) setCorrectCount((c) => c + 1);
      else setIncorrectCount((c) => c + 1);

      if (timerId.current) clearInterval(timerId.current);
      setTimeout(handleNextQuestion, 800);
    },
    [currentQuestionIndex, quizQuestions, selectedOption, quizFinished, playSound]
  );

  // ── Next question ─────────────────────────────────────────────────────
  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      setQuizFinished(true);
      triggerConfetti();
    }
  }, [currentQuestionIndex, quizQuestions.length]);

  // ── Skip ───────────────────────────────────────────────────────────────
  const handleSkipQuestion = useCallback(() => {
    if (quizFinished) return;
    isManualSkip.current = true;
    playSound("skip");

    setSkippedCount((c) => c + 1);
    setUserAnswers((prev) => [
      ...prev,
      {
        question: quizQuestions[currentQuestionIndex].question,
        selectedAnswer: null,
        correctAnswer: quizQuestions[currentQuestionIndex].answer,
        isCorrect: false,
      },
    ]);

    if (timerId.current) clearInterval(timerId.current);
    handleNextQuestion();
  }, [currentQuestionIndex, quizQuestions, handleNextQuestion, quizFinished, playSound]);

  // ── Confetti ───────────────────────────────────────────────────────────
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899"],
    });
  };

  // ── Loading / Empty ───────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!quizQuestions.length) {
    return <div className="text-center p-8 text-red-600 text-xl">No questions found.</div>;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const timePercentage = (timeLeft / TIME_PER_QUESTION) * 100;

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      {!quizFinished ? (
        <Card className="w-full max-w-3xl shadow-2xl bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/quiz")}>
                Back
              </Button>
              <ShareButton url={params.quizId} />
              <Button variant="outline" size="sm" onClick={handleSkipQuestion} className="gap-1">
                <SkipForward className="w-4 h-4" /> Skip
              </Button>
            </div>

            {/* Progress + Timer */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestionIndex + 1} / {quizQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span className={cn("font-bold", timeLeft <= 10 ? "text-red-600" : "text-green-600")}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            <div className="relative mb-6">
              <Progress value={progress} className="h-3 bg-gray-200" />
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ width: `${timePercentage}%` }}
              >
                <div className="h-1 bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-1000" />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === currentQuestion.answer;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    disabled={selectedOption !== null}
                    className={cn(
                      "w-full p-5 text-left rounded-xl border-2 transition-all duration-300 text-lg font-medium flex justify-between items-center",
                      isSelected
                        ? isAnswerCorrect
                          ? "bg-green-100 border-green-500 text-green-800 shadow-lg"
                          : "bg-red-100 border-red-500 text-red-800 shadow-lg"
                        : "bg-white border-gray-300 hover:border-primary hover:bg-primary/5",
                      selectedOption && isCorrect && !isSelected && "bg-green-100 border-green-500",
                      "disabled:cursor-not-allowed disabled:opacity-70"
                    )}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      isAnswerCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selectedOption && (
              <div className="mt-8 text-center animate-fade-in">
                <p
                  className={cn(
                    "text-2xl font-bold flex items-center justify-center gap-2",
                    isAnswerCorrect ? "text-green-600" : "text-red-600"
                  )}
                >
                  {isAnswerCorrect ? (
                    <>Correct! <CheckCircle2 className="w-7 h-7" /></>
                  ) : (
                    <>Incorrect <XCircle className="w-7 h-7" /></>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <QuizResult
          userAnswers={userAnswers}
          totalQuestions={quizQuestions.length}
          correctCount={correctCount}
          skippedCount={skippedCount}
          incorrectCount={incorrectCount}
          scorePercentage={Math.round((correctCount / quizQuestions.length) * 100)}
          quizId={params.quizId}
        />
      )}
    </div>
  );
};

export default QuizPlay;