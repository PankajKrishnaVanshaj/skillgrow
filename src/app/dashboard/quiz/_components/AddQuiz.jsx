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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chatSession } from "@/utils/QuizGeminiAIModal";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Difficulty = { EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" };
const Language = ["English", "Hindi"];

// Generate 1 to 20 options
const QuestionCountOptions = Array.from({ length: 20 }, (_, i) => i + 1);

const AddQuiz = () => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [examOrClass, setExamOrClass] = useState("");
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

    const title = `${examOrClass} – ${subject} – ${chapter}`;

    const inputPrompt = `Generate **exactly ${number}** multiple-choice questions for:

- Exam / Class: ${examOrClass}
- Subject: ${subject}
- Topic / Chapter: ${chapter}
- Difficulty: ${difficulty}
- Language: ${language}

Return **only** a valid JSON array (no markdown, no extra text):

[
  {
    "question": "string",
    "options": ["opt1","opt2","opt3","opt4"],
    "answer": "exact matching option text"
  }
]

Rules:
- 4 unique options per question.
- Answer must be **identical** to one of the options.
- No explanations, no extra characters.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const raw = await result.response.text();

      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("AI returned no JSON array");

      const questions = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(questions) || questions.length === 0)
        throw new Error("Empty question list");

      const resp = await axios.post("/api/quiz", {
        questions: JSON.stringify(questions),
        title,
        examOrClass,
        subject,
        chapter,
        difficulty,
        language,
        number,
      });

      if (resp.data.success) {
        setOpenDialog(false);
        router.push(`/dashboard/quiz/${resp.data.data._id}`);
      } else {
        setError(resp.data.error ?? "Failed to save quiz");
      }
    } catch (err) {
      console.error(err);
      setError(err.message ?? "Something went wrong");
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
      {/* Trigger Card */}
      <div
        className="p-10 border-2 border-dashed rounded-xl bg-secondary hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center"
        onClick={() => setOpenDialog(true)}
      >
        <div className="text-3xl mb-2">+</div>
        <h2 className="text-lg font-medium">Add New Quiz</h2>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create New Quiz
            </DialogTitle>
            <DialogDescription>
              Fill the details – any class or competitive exam works.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Exam / Class */}
            <div>
              <Label htmlFor="examOrClass">Exam / Class *</Label>
              <Input
                id="examOrClass"
                placeholder="e.g. 10th, UPSC, SSC CGL, CTET, JEE"
                value={examOrClass}
                onChange={(e) => setExamOrClass(e.target.value)}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g. Physics, History, GK"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            {/* Chapter */}
            <div>
              <Label htmlFor="chapter">Topic / Chapter *</Label>
              <Input
                id="chapter"
                placeholder="e.g. Laws of Motion, Indian Polity"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                required
              />
            </div>

            {/* Difficulty, Language, Number */}
            <div className="grid grid-cols-3 gap-4">
              {/* Difficulty */}
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Difficulty.EASY}>Easy</SelectItem>
                    <SelectItem value={Difficulty.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={Difficulty.HARD}>Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Language.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Questions – NOW A SELECT */}
              <div>
                <Label htmlFor="number">Questions</Label>
                <Select
                  value={number.toString()}
                  onValueChange={(val) => setNumber(parseInt(val))}
                >
                  <SelectTrigger id="number">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    {QuestionCountOptions.map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    Generating…
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
