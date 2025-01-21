"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { UserIcon } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const { status, data } = useSession();
  const [infoVisible, setInfoVisible] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // sign out without redirect
    setInfoVisible(false); // close the user info modal if open
    window.location.href = "/"; // redirect manually to the homepage
  };

  return (
    <header className="flex flex-col md:flex-row py-1 px-5 md:px-10 items-center justify-between bg-secondary shadow-md rounded-full mx-3 md:mx-10 my-2 transition-all duration-500 ease-in-out transform hover:scale-105">
      <Link href={"/"}>
        <div className="flex justify-center items-center gap-2">
          <Image
            src={"/skillgrow.png"}
            alt="logo"
            width={50}
            height={50}
            // className="rounded-full"
          />
          <span
            className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-br from-orange-500 via-blue-400 to-red-600"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PK SkillGrow
          </span>
        </div>
      </Link>

      {/* authentication */}
      <div className="flex items-center gap-5">
        {status === "authenticated" ? (
          <>
            <Image
              className="rounded-full w-10 h-10 cursor-pointer"
              src={data?.user?.image}
              alt="User avatar"
              width={60}
              height={60}
              onClick={() => setInfoVisible(!infoVisible)}
            />
            {infoVisible && (
              <div className="absolute bg-white dark:bg-neutral-700 p-6 rounded-md shadow-lg top-20 right-5">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  User Information
                </h2>
                <ul className="space-y-2">
                  <li className="text-lg text-gray-600 dark:text-gray-300">
                    {data?.user?.name}
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    {data?.user?.email}
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <nav>
            <Link
              href="/dashboard"
              className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-purple-500"
            >
              <UserIcon className="w-4 h-4" />
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
