"use client";

import AddCourse from "./_components/AddCourse";
import CourseList from "./_components/CourseList";

const Course = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-primary">My Courses</h2>
      <h2 className="text-gray-500">Create and Start your AI Course</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddCourse />
      </div>

      {/* Previous Interview List  */}
      <CourseList />
    </div>
  );
};

export default Course;
