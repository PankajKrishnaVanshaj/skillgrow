"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const QuizList = () => {
  const { data } = useSession();
  const createdBy = data?.user?.email;
  const router = useRouter();

  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    const GetQuizList = async () => {
      try {
        const response = await axios.get(`/api/quiz`);
        const sortedQuizList = response.data.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setQuizList(sortedQuizList);
      } catch (error) {
        console.error("Error fetching history from database:", error);
      }
    };

    if (createdBy) {
      GetQuizList();
    }
  }, [createdBy]);

  const handleDelete = async (quizId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      await axios.delete(`/api/quiz/${quizId}`);
      setQuizList(quizList.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePlay = (quizId) => {
    router.push(`/dashboard/quiz/${quizId}`);
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-3xl mb-6 text-center text-gray-800">
        Previous Quiz List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 capitalize">
        {quizList.map((quiz) => (
          <div
            key={quiz._id}
            className="p-5 border rounded-xl shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-indigo-100 to-white"
          >
            <h3 className="text-2xl font-bold text-indigo-700 mb-2 line-clamp-1">
              {quiz.topic}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              Created At: {new Date(quiz.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-4 line-clamp-1">
              Title: <span className="font-semibold">{quiz.title}</span>
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePlay(quiz._id)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
              >
                Play
              </button>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
