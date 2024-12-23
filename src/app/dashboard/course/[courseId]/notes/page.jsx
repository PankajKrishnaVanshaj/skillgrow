"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseNotes, setCourseNotes] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const getCourseNotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/course-notes`, {
          params: { id: params.courseId },
        });
        if (response.data.success) {
          setCourseNotes(response.data.data.notes);
        } else {
          setError(response.data.error || "Failed to fetch course notes.");
        }
      } catch (error) {
        console.error("Error fetching course notes:", error);
        setError("Failed to load course notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params.courseId) {
      getCourseNotes();
    }
  }, [params.courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Course Notes</h2>
      {Array.isArray(courseNotes) && courseNotes.length > 0 ? (
        courseNotes.map((chapter, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold">{chapter.title}</h3>
            <p className="text-gray-700 mb-4">{chapter.summary}</p>
            <ul>
              {chapter.topics.map((topic, idx) => (
                <li key={idx} className="mb-4">
                  <strong>{topic.topic}</strong>
                  <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: topic.content }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>No course notes available.</div>
      )}
    </div>
  );
};

export default Notes;
