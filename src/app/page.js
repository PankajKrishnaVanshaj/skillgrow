import { User, BarChart, LifeBuoy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-transparent bg-clip-text"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PK SkillGrow
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-6">
            <span
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Learn 10x Faster With AI
            </span>
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Unlock Your Potential with Personalized Quizzes
            {/* and Courses */}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center bg-blue-600 text-white font-medium rounded-lg py-3 px-6 shadow-lg hover:bg-blue-700 transition"
          >
            Get Started
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </main>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Why PK SkillGrow?
            </h3>
            <p className="text-lg text-gray-600">
              Discover the benefits of our platform and how it can elevate your
              learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Engaging Quizzes",
                description:
                  "Test your knowledge with interactive quizzes and track your progress.",
                icon: <BarChart size={32} className="text-blue-600" />,
              },
              {
                title: "Personalized Experience",
                description:
                  "Get recommendations based on your learning history and preferences.",
                icon: <User size={32} className="text-blue-600" />,
              },
              {
                title: "24/7 Support",
                description:
                  "Receive assistance any time of day, with our dedicated support team.",
                icon: <LifeBuoy size={32} className="text-blue-600" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-transform hover:scale-105"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
