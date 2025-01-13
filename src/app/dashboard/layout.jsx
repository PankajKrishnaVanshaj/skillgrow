"use client";
import { usePathname } from "next/navigation";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }) => {
  const path = usePathname();

  // Render the layout only for the exact /dashboard/quiz or /dashboard paths
  if (
    path === "/dashboard/quiz" ||
    path === "/dashboard/course" ||
    path === "/dashboard"
  ) {
    return (
      <div className="h-screen flex mx-2">
        <div className="hidden md:block">
          <SideNav />
        </div>
        <div className="flex-grow px-1">{children}</div>
      </div>
    );
  }

  // For all other paths (including dynamic quiz paths), just return children without layout
  return <>{children}</>;
};

export default DashboardLayout;
