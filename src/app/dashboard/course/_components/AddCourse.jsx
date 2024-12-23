"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const Difficulty = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const Types = ["Exam", "Job Interview", "Practice", "Coding Prep", "Other"];
const Language = ["English", "Hindi"];

const AddCourse = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [type, setType] = useState(Types[0]);
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [language, setLanguage] = useState(Language[0]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const GenarateCourseOutline = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      topic,
      type,
      difficulty,
      language,
    };

    try {
      const response = await axios.post("/api/course-outline", payload);
      setSuccess("Course outline generated successfully!");
      window.location.reload();

      // console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate course outline. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setError(null);
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Course</DialogTitle>
            <DialogDescription>
              Provide course details, including topic, difficulty level, and
              language.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={GenarateCourseOutline} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium">
                Topic Input
              </label>
              <Textarea
                placeholder="Enter a specific topic or description for the course, e.g., 'Introduction to JavaScript basics'"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between gap-5 items-center">
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                aria-label="Select difficulty level"
              >
                <option value={Difficulty.EASY}>Easy</option>
                <option value={Difficulty.MEDIUM}>Medium</option>
                <option value={Difficulty.HARD}>Hard</option>
              </select>

              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                aria-label="Select language"
              >
                {Language.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                aria-label="Select type"
              >
                {Types.map((Type) => (
                  <option key={Type} value={Type}>
                    {Type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:scale-95 transition-all disabled:bg-gray-300"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin mr-2" />
                ) : (
                  "Create Course"
                )}
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCourse;
