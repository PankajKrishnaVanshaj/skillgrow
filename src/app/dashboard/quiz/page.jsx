"use client";
import AddQuiz from "./_components/AddQuiz";
import QuizList from "./_components/QuizList";

const Quiz = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-primary">My Quiz</h2>
      <h2 className="text-gray-500">Create and Start your AI Quiz</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddQuiz />
      </div>

      {/* Previous Interview List  */}
      <QuizList />
    </div>
  );
};

export default Quiz;
