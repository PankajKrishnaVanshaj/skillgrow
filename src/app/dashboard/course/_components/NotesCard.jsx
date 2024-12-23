"use client";
import { ScrollText } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const NotesCard = ({ courseId, layout }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const GenerateCourseNotes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      courseId,
      layout,
    };

    try {
      const response = await axios.post("/api/course-notes", payload);
      setSuccess("Course notes generated successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate course Notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-xl bg-white p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
      <div className="mb-6 flex justify-center items-center">
        <ScrollText className="text-blue-600" size={56} />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center leading-tight bg-clip-text text-transparent bg-gradient-to-br from-orange-500 via-blue-400 to-red-700">
        Notes
      </h2>
      <div className="flex justify-center">
        <button
          onClick={GenerateCourseNotes}
          className={`bg-gradient-to-tr from-blue-500 to-blue-600 text-white py-2 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-orange-500 hover:via-blue-400 hover:to-red-600"
          }`}
          disabled={loading}
          aria-label="Generate Course Notes"
        >
          {loading ? "Generating..." : "View Notes"}
        </button>
      </div>
      <div className="space-y-2 mt-4">
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default NotesCard;
