"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data,setData] = useState(null)
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
        console.log(error)
    }
  };

  const getUserDetails = async () =>{
    const res = await axios.get("/api/user/me");
    setData(res.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>profile page</p>
      <hr />

      <button className="bg-blue-500 rounded p-3 mt 4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
