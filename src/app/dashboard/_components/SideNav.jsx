"use client";
import {
  FileClock,
  Home,
  GraduationCap,
  Settings,
  WalletCards,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

const SideNav = () => {
  const path = usePathname();

  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Quiz",
      icon: FileClock,
      path: "/dashboard/quiz",
    },
    {
      name: "Course",
      icon: GraduationCap,
      path: "/dashboard/course",
    },
    // {
    //   name: "Billing",
    //   icon: WalletCards,
    //   path: "/dashboard/billing",
    // },
    // {
    //   name: "Setting",
    //   icon: Settings,
    //   path: "/dashboard/settings",
    // },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // sign out without redirect
    window.location.href = "/"; // redirect manually to the homepage
  };

  return (
    <div className="h-screen w-64 p-3 shadow-sm border-r bg-secondary flex flex-col rounded-xl">
      <div className="mt-3 flex-grow">
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <div
              className={`flex gap-2 mb-2 p-3 hover:bg-gray-500 hover:text-white rounded-lg cursor-pointer ${
                path === menu.path ? "bg-blue-600 text-white" : ""
              }`}
            >
              <menu.icon className="h-6 w-6" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto p-3">
        <button
          onClick={handleSignOut}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideNav;
