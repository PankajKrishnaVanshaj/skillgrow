"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AlertCircle, Play, Trash2, Calendar, BookOpen, Clock, User } from "lucide-react";
import AddQuiz from "./AddQuiz";

const QuizList = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const quizzesPerPage = 6;

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (status !== "authenticated") return;

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/quiz");
        const sorted = response.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuizList(sorted);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
        setError("Failed to load quizzes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [status]);

  const handlePlay = (quizId) => {
    router.push(`/dashboard/quiz/${quizId}`);
  };

  const openDeleteDialog = (quizId) => {
    setQuizToDelete(quizId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!quizToDelete) return;

    try {
      await axios.delete(`/api/quiz/${quizToDelete}`);
      setQuizList((prev) => prev.filter((q) => q._id !== quizToDelete));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete quiz. Please try again.");
    } finally {
      setDeleteDialogOpen(false);
      setQuizToDelete(null);
    }
  };

  // Pagination
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizList.slice(indexOfFirstQuiz, indexOfLastQuiz);
  const totalPages = Math.ceil(quizList.length / quizzesPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (status === "loading") {
    return <div className="p-6 text-center">Loading session...</div>;
  }

  if (!session) {
    return (
      <div className="p-6 text-center">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please sign in to view your quizzes.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Your Quiz Library
        </h1>
        <p className="text-gray-600">
          Manage and play your generated quizzes
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : quizList.length === 0 ? (
        <Card className="max-w-md mx-auto text-center p-8">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No quizzes yet</h3>
          <p className="text-gray-600 mb-4">
            Create your first quiz to get started!
          </p>
          <AddQuiz />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentQuizzes.map((quiz) => (
              <Card
                key={quiz._id}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {quiz.language}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">
                    {quiz.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {quiz.subject}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Class {quiz.className}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.number} Qs
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  <div className="flex justify-between items-center">
                    <Button
                      onClick={() => handlePlay(quiz._id)}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </Button>

                    <div className="flex gap-2">
                      <ShareButton url={quiz._id} />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(quiz._id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => goToPage(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => goToPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => goToPage(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your quiz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizList;