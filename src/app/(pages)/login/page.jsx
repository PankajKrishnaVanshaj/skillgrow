"use client"; // Ensure client-side rendering

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to dashboard if user is signed in
    if (status === "authenticated") {
      window.location.href = "/dashboard";
    }
  }, [status]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full space-y-6">
        <div className="mb-4 flex justify-center">
          <Image src="/skillgrow.png" alt="Logo" width={80} height={80} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">Login</h1>
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <p className="text-gray-700">
              Signed in as{" "}
              <span className="font-bold">{session.user.email}</span>
            </p>
            <p className="text-gray-700">
              Name: <span className="font-bold">{session.user.name}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
