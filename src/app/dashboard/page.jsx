import Link from "next/link";
import QuizList from "./quiz/_components/QuizList";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Quiz Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-orange-400 text-white text-center py-10 shadow-lg rounded-md">
        <h1 className="text-4xl font-bold uppercase">PK SkillGrow</h1>
        <p className="text-lg mt-4 font-medium max-w-2xl mx-auto">
          Empower your learning with AI-generated quizzes crafted to match your
          goals. Discover smarter ways to grow your skills and unlock your
          potential!
        </p>

        <div className="mt-5">
          <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-100 duration-300 hover:scale-105 transition">
            <Link href={"/dashboard/quiz"}>Create a New Quiz</Link>
          </button>
        </div>
      </div>

      {/* Quiz List */}
      <div className="">
        <QuizList />
      </div>
    </div>
  );
};

export default Dashboard;
