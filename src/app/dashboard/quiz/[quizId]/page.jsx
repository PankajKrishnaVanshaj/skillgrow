"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizResult from "../_components/QuizResult";
import { useRouter } from "next/navigation";
import ShareButton from "@/components/ShareButton";

const QuizPlay = ({ params }) => {
  const router = useRouter();
  // State variables
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [skippedCount, setSkippedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    GetQuizQuestions();
  }, []);

  const GetQuizQuestions = async () => {
    try {
      const response = await axios.get(`/api/quiz`, {
        params: { id: params.quizId },
      });
      const result = response.data.data;
      const questions = result.questions;
      setQuizQuestions(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  // Function to handle option click
  const handleOptionClick = (option) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    setSelectedOption(option); // Set the selected option
    const correct = option === currentQuestion.answer; // Check if the answer is correct
    setIsAnswerCorrect(correct); // Update the answer correctness

    // Update user answers
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        selectedAnswer: option,
        correctAnswer: currentQuestion.answer,
        isCorrect: correct,
      },
    ]);

    // Update correct/incorrect count
    if (correct) {
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectCount((prevCount) => prevCount + 1);
    }

    // Move to the next question after a short delay
    setTimeout(() => handleNextQuestion(), 500);
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    setSelectedOption(null); // Reset selected option
    setIsAnswerCorrect(null); // Reset answer correctness
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
    } else {
      setQuizFinished(true);
    }
  };

  // Function to handle skipping a question
  const handleSkipQuestion = () => {
    setSkippedCount((prevCount) => prevCount + 1);
    handleNextQuestion();
  };

  if (quizQuestions.length === 0) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  return (
    <div className="flex items-center justify-center p-4 h-screen  ">
      {!quizFinished ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 ">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b-2 pb-2">
            <div
              className="text-black font-bold py-2 px-4 rounded-full shadow-md transition duration-300 cursor-pointer"
              onClick={() => {
                router.push("/dashboard/quiz");
              }}
            >
              Back
            </div>
            <ShareButton url={window.location.href} />
            <button
              onClick={handleSkipQuestion}
              className="text-black font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Skip
            </button>

            <div className="text-xl font-semibold">
              Question {currentQuestionIndex + 1}/{totalQuestions}
            </div>
          </div>

          {/* Quiz Selection */}
          <div>
            <div className="text-2xl font-bold mb-4 shadow-md py-2 px-3 rounded-xl shadow-red-400 ">
              {currentQuestion.question}
            </div>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <li key={index} className="list-none">
                  <button
                    onClick={() => handleOptionClick(option)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold  ${
                      selectedOption === option
                        ? "bg-primary text-white"
                        : "bg-gray-200 hover:bg-gray-300 hover:scale-105"
                    } transition duration-300`}
                    aria-pressed={selectedOption === option}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </div>
            <div className="mt-4 text-center">
              {selectedOption && (
                <p
                  className={`text-2xl mt-2 font-bold ${
                    isAnswerCorrect ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isAnswerCorrect ? "Correct!" : "Incorrect!"}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <QuizResult
          userAnswers={userAnswers}
          totalQuestions={totalQuestions}
          correctCount={correctCount}
          skippedCount={skippedCount}
          incorrectCount={incorrectCount}
        />
      )}
    </div>
  );
};

export default QuizPlay;
