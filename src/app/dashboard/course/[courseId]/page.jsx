"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import NotesCard from "../_components/NotesCard";
import FlashcardsCard from "../_components/FlashcardsCard";
import QuizCard from "../_components/QuizCard";
import QuestionAnswerCard from "../_components/QuestionAnswerCard";

const Course = ({ params }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openChapter, setOpenChapter] = useState(null);

  // Fetch course chapters on mount
  useEffect(() => {
    const GetCourseChapters = async () => {
      try {
        const response = await axios.get("/api/course-outline", {
          params: { id: params.courseId },
        });
        setCourseData(response.data.data); // Store fetched data
      } catch (error) {
        setError("Error fetching course data");
        console.error("Error fetching Chapters:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    GetCourseChapters();
  }, [params.courseId]);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        {error}
      </div>
    );
  }

  const toggleChapter = (index) => {
    setOpenChapter(openChapter === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
        <NotesCard courseId={params.courseId} layout={courseData.layout} />
        <FlashcardsCard courseId={params.courseId} layout={courseData.layout} />
        <QuizCard courseId={params.courseId} layout={courseData.layout} />
        <QuestionAnswerCard
          courseId={params.courseId}
          layout={courseData.layout}
        />
      </div>
      {courseData ? (
        <div className="p-4 rounded-lg shadow-lg">
          {/* Course Overview */}
          <div className="mb-8">
            {/* <h2 className="text-3xl font-semibold text-gray-800">
              {courseData.topic}
            </h2>
            <p className="text-lg font-medium text-gray-700 mt-2">
              Level: {courseData.level}
            </p>
            <p className="text-lg font-medium text-gray-700">
              Type: {courseData.type}
            </p> */}
            <p className="mt-4 text-md text-gray-600">
              {courseData.layout.courseSummary}
            </p>
          </div>

          {/* Chapters */}
          <div className="space-y-4">
            {courseData.layout.chapters.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleChapter(index)}
                  className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 focus:outline-none"
                >
                  <span>{chapter.title}</span>
                  <span
                    className={`transition-transform duration-300 transform ${
                      openChapter === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={24} />
                  </span>
                </button>
                {openChapter === index && (
                  <>
                    <p className="mt-4 text-sm text-gray-600">
                      {chapter.summary}
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      {chapter.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-600">
          No course data available.
        </p>
      )}
    </div>
  );
};

export default Course;
