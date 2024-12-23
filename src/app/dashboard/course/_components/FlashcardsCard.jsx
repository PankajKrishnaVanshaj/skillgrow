import React from "react";
import { SquareAsterisk } from "lucide-react";

const FlashcardsCard = ({ courseId, layout }) => {
  const handleFlashcardsClick = () => {
    console.log(`Flashcards for Course ID: ${courseId}`);
    console.log(
      "Topics:",
      layout?.chapters?.flatMap((chapter) => chapter.topics)
    );
  };

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-xl bg-white p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
      <div className="mb-6 flex justify-center items-center">
        <SquareAsterisk className="text-blue-600" size={56} />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center leading-tight bg-clip-text text-transparent bg-gradient-to-br from-orange-500 via-blue-400 to-red-700">
        Flashcards
      </h2>
      <div className="flex justify-center">
        <button
          onClick={handleFlashcardsClick}
          className="bg-gradient-to-tr from-blue-500 to-blue-600 text-white py-2 px-8 rounded-lg hover:from-orange-500 hover:via-blue-400 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          View Flashcards
        </button>
      </div>
    </div>
  );
};

export default FlashcardsCard;
