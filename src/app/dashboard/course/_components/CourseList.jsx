"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PencilRuler, Trash2 } from "lucide-react";

const CourseList = () => {
  const { data } = useSession();
  const createdBy = data?.user?.email;
  const router = useRouter();

  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const response = await axios.get(`/api/course-outline`);
        const sortedCourseList = response.data.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCourseList(sortedCourseList);
      } catch (error) {
        console.error("Error fetching course outlines:", error);
        setError("Failed to load course outlines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (createdBy) {
      getCourseList();
    }
  }, [createdBy]);

  if (loading) {
    return <div className="text-center mt-4">Loading course outlines...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
        <span>Course Outlines</span>
        <button
          className="bg-gradient-to-tr from-blue-500 to-blue-600 px-5 py-1.5 text-sm font-semibold text-white rounded-lg hover:from-orange-500 hover:via-blue-400 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          onClick={() => {
            window.location.reload(); // Refresh the page
          }}
        >
          Refresh
        </button>
      </h1>

      {courseList.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 capitalize">
          {courseList.map((course) => (
            <li
              key={course._id}
              className="p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/dashboard/course/${course._id}`)}
            >
              <h2 className="text-lg font-semibold capitalize">
                {course.topic}
              </h2>
              <p className="text-sm text-gray-600">
                Type: {course.type} | Level: {course.level}
                <br />
                Language: {course.language}
              </p>
              <p className="text-xs text-gray-500 flex justify-between items-center">
                <span>
                  Created on: {new Date(course.createdAt).toLocaleDateString()}
                </span>
                <span className="flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                    aria-label="Edit Course"
                  >
                    <PencilRuler size={19} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition duration-200"
                    aria-label="Delete Course"
                  >
                    <Trash2 size={19} />
                  </button>
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No course outlines found.</p>
      )}
    </div>
  );
};

export default CourseList;
