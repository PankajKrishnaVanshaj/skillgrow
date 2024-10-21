"use client";
import { usePathname } from "next/navigation";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }) => {
  const path = usePathname();

  // Render the layout only for the exact /dashboard/quiz or /dashboard paths
  if (path === "/dashboard/quiz" || path === "/dashboard") {
    return (
      <div className="h-screen flex mx-3">
        <SideNav />
        <div className="flex-grow p-3">{children}</div>
      </div>
    );
  }

  // For all other paths (including dynamic quiz paths), just return children without layout
  return <>{children}</>;
};

export default DashboardLayout;
