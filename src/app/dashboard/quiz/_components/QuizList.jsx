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
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(6); // Display 6 quizzes per page

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
        console.error("Error fetching quizzes from database:", error);
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
    if (!confirmed) return;

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

  // Pagination logic
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizList.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(quizList.length / quizzesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-0.5">
      <h2 className="font-semibold text-3xl mb-6 text-center text-gray-800">
        Previous Quiz List
      </h2>

      {quizList.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not generated any quizzes yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 capitalize">
            {currentQuizzes.map((quiz) => (
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

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded-full font-semibold ${
                  currentPage === index + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizList;
