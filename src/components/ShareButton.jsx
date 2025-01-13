import { Share2 } from "lucide-react";

export const ShareButton = ({ url }) => {
  const baseUrl = `${window.location.origin}/dashboard/quiz/${url}`;
  const shareData = {
    title:
      "PK SkillGrow - Enhance Your Knowledge with AI-Driven Quizzes & Courses",
    text: "PK SkillGrow is an AI-powered platform that helps users enhance their knowledge through interactive quizzes, personalized courses, and educational resources.",
    url: baseUrl,
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Check for Web Share API support
        await navigator.share(shareData);
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(baseUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      console.error("Share failed:", errorMessage);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-black font-bold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-slate-300"
    >
      <Share2 size={22} />
    </button>
  );
};
