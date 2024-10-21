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
import { chatSession } from "@/utils/GeminiAIModal";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define enums for Difficulty and Format
const Difficulty = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const Language = ["English", "Hindi"];

const AddQuiz = () => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [language, setLanguage] = useState("English");
  const [number, setNumber] = useState(5);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    let inputPrompt = `Please generate ${number} multiple-choice questions with a difficulty level of ${difficulty} in JSON format. The questions should be based on the topic "${topic}" and include the following fields: 'question', 'options', and 'answer'. The 'answer' should be one of the options provided. The text should be in ${language} and the questions should be relevant to the title "${title}".`;

    try {
      setLoading(true);
      setError(null);

      const result = await chatSession.sendMessage(inputPrompt);
      const quizJsonResp = (await result.response.text())
        .replace("```json", "")
        .replace("```", "");

      if (quizJsonResp) {
        const response = await axios.post("/api/quiz", {
          questions: quizJsonResp,
          title,
          topic,
          difficulty,
          language,
          number,
        });

        const data = response.data;

        if (data.success) {
          setOpenDialog(false);
          setLoading(false);
          router.push("/dashboard/quiz/" + data.data._id);
        } else {
          console.log("ERROR:", data.error);
          setError(data.error);
        }
      } else {
        console.log("ERROR: No response from AI");
        setError("No response from AI. Please try again.");
      }
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("Failed to generate quiz. Please try again.");
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
            <DialogTitle className="text-2xl">Create New Quiz</DialogTitle>
            <DialogDescription>
              Quiz Details, You can choose how many questions you would like to
              be quizzed on here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="topic" className="block text-sm font-medium">
                Topic
              </label>
              <Input
                id="topic"
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
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value={Difficulty.EASY}>Easy</option>
                <option value={Difficulty.MEDIUM}>Medium</option>
                <option value={Difficulty.HARD}>Hard</option>
              </select>

              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                {Language.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <Input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create Quiz"
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

export default AddQuiz;
