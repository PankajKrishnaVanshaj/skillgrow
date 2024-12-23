import React from "react";
import { BookOpenCheck } from "lucide-react";

const QuizCard = ({ courseId, layout }) => {
  const handleQuizClick = () => {
    console.log(`Quiz for Course ID: ${courseId}`);
    console.log(
      "Chapters for Quiz:",
      layout?.chapters?.map((chapter) => chapter.title)
    );
  };

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-xl bg-white p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
      <div className="mb-6 flex justify-center items-center">
        <BookOpenCheck className="text-blue-600" size={56} />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center leading-tight bg-clip-text text-transparent bg-gradient-to-br from-orange-500 via-blue-400 to-red-700">
        Quiz
      </h2>
      <div className="flex justify-center">
        <button
          onClick={handleQuizClick}
          className="bg-gradient-to-tr from-blue-500 to-blue-600 text-white py-2 px-8 rounded-lg hover:from-orange-500 hover:via-blue-400 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
