"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/QuizGeminiAIModal";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Difficulty = { EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" };
const Language = ["English", "Hindi"];

const AddQuiz = () => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [language, setLanguage] = useState("English");
  const [number, setNumber] = useState(5);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Auto-generate title
    const title = `${subject} - ${chapter} (Class ${className})`;

    // Optimized prompt: concise, structured, schema-enforced
    const inputPrompt = `Generate exactly ${number} multiple-choice questions for Class ${className}, Subject: ${subject}, Chapter: ${chapter}. 
Difficulty: ${difficulty}. Language: ${language}.

Return valid JSON only (no markdown):
[
  {
    "question": "string",
    "options": ["option1", "option2", "option3", "option4"],
    "answer": "correct_option_text"
  }
]

Ensure:
- Questions are educational and accurate.
- Exactly 4 unique options.
- Answer must match one option exactly.
- No extra text or explanation.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      let rawText = await result.response.text();

      // Clean JSON
      const jsonMatch = rawText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("Invalid JSON format from AI");
      const quizJson = jsonMatch[0];
      let questions;
      try {
        questions = JSON.parse(quizJson);
      } catch (parseErr) {
        throw new Error("Failed to parse AI response as JSON");
      }

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("No valid questions generated");
      }

      // Send to backend
      const response = await axios.post("/api/quiz", {
        questions: JSON.stringify(questions),
        title,
        className,
        subject,
        chapter,
        difficulty,
        language,
        number,
      });

      if (response.data.success) {
        setOpenDialog(false);
        router.push(`/dashboard/quiz/${response.data.data._id}`);
      } else {
        setError(response.data.error || "Failed to save quiz");
      }
    } catch (err) {
      console.error("Quiz generation error:", err);
      setError(err.message || "Failed to generate quiz. Try again.");
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
        <h2 className="text-lg text-center">+ Add New Quiz</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Quiz</DialogTitle>
            <DialogDescription>
              Fill in the details to generate a custom quiz.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="class" className="block text-sm font-medium">
                  Class
                </label>
                <Input
                  id="class"
                  placeholder="e.g., 10th"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="e.g., Physics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="chapter" className="block text-sm font-medium">
                Topic / Chapter
              </label>
              <Input
                id="chapter"
                placeholder="e.g., Laws of Motion"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={Difficulty.EASY}>Easy</option>
                  <option value={Difficulty.MEDIUM}>Medium</option>
                  <option value={Difficulty.HARD}>Hard</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {Language.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium">
                  Questions
                </label>
                <Input
                  id="number"
                  type="number"
                  min={1}
                  max={20}
                  value={number}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    if (val >= 1 && val <= 20) setNumber(val);
                  }}
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Create Quiz"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuiz;
