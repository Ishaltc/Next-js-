"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Error signup", error.message);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]); // <-- added dependency array for useEffect

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">{loading ? "Processing..." : "Sign Up"}</h1>

      <hr className="w-full mb-4" />

      <label htmlFor="username" className="mb-1">Username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="p-2 border border-gray-300 rounded-lg mb-4 w-80 focus:outline-none focus:border-gray-600"
      />

      <label htmlFor="email" className="mb-1">Email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="p-2 border border-gray-300 rounded-lg mb-4 w-80 focus:outline-none focus:border-gray-600"
      />

      <label htmlFor="password" className="mb-1">Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="p-2 border border-gray-300 rounded-lg mb-4 w-80 focus:outline-none focus:border-gray-600"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className="p-2 bg-blue-500 text-white rounded-lg mb-4 w-80 hover:bg-blue-600 disabled:bg-gray-400"
      >
        {buttonDisabled ? "Fill all fields" : loading ? "Signing Up..." : "Sign Up"}
      </button>

      <Link href="/login" className="text-blue-500 hover:underline">
        Already have an account? Login
      </Link>
    </div>
  );
}
