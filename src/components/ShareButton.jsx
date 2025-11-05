"use client";
import { Share2, Check, Copy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ShareButton = ({ url, title = "Check out my quiz on PK SkillGrow!" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/dashboard/quiz/${url}`
    : "";

  const shareData = {
    title: "PK SkillGrow Quiz",
    text: title,
    url: baseUrl,
  };

  const handleShare = async () => {
    if (!baseUrl) return;

    setIsLoading(true);

    try {
      // Native Web Share API (mobile browsers)
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
       
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(baseUrl);
        
      }
    } catch (error) {
      console.error("Share failed:", error);

     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleShare}
      disabled={isLoading || !baseUrl}
      size="sm"
      variant="outline"
      className="flex items-center gap-2 hover:scale-105 transition-transform"
      aria-label="Share this quiz"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">Share</span>
    </Button>
  );
};