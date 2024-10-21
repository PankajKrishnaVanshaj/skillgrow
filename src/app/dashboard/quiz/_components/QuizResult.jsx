"use client";
import { useRouter } from "next/navigation";
import React from "react";

const QuizResult = ({
  userAnswers = [],
  totalQuestions = 0,
  correctCount = 0,
  skippedCount = 0,
  incorrectCount = 0,
}) => {
  const router = useRouter();

  return (
    <div className="p-4 h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* results */}
        <div className="mb-6">
          <div className=" flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Quiz Summary</h2>
            <h2
              className="text-xl font-semibold mb-4 cursor-pointer shadow-md py-1 px-2 rounded-full hover:scale-105 duration-300"
              onClick={() => {
                router.push("/dashboard/quiz");
              }}
            >
              Quiz Home
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {totalQuestions}
              </div>
              <div className="text-gray-600">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {correctCount}
              </div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {skippedCount}
              </div>
              <div className="text-gray-600">Skipped</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">
                {incorrectCount}
              </div>
              <div className="text-gray-600">Incorrect</div>
            </div>
          </div>
        </div>

        {/* questions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Question Breakdown</h2>
          <div className="space-y-4">
            {userAnswers.map((answer, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="font-extrabold text-lg mb-2">
                  Question {index + 1}:{" "}
                  <span className="font-sans"> {answer.question}</span>
                </div>

                {/* answer section  */}
                <div className="flex justify-between items-center">
                  <div className="mt-2 font-semibold space-y-2">
                    <div>
                      CA:{" "}
                      <span className="font-sans text-green-500">
                        {answer.correctAnswer}
                      </span>
                    </div>

                    <div className="text-gray-700">
                      YA:{" "}
                      <span
                        className={`${
                          answer.isCorrect ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {answer.selectedAnswer || "Skipped"}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {answer.isCorrect ? "✅" : "❌"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
