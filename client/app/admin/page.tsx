"use client";

import useLoginUserMutation from "@/actions/user/signInUser";
import { getUserFromToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const { mutate: login, isPending } = useLoginUserMutation();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const token = Cookies.get("token");
      if (token) {
        const user = await getUserFromToken(token);
        if (user) {
          router.replace("/admin/dashboard");
        }
      }
    }
    checkAuth();
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    login({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin}>
        <div className="flex flex-col p-10 rounded-lg shadow-lg justify-center items-center gap-3">
          <p className="text-2xl font-bold">Login</p>
          <label className="input input-bordered flex items-center gap-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
            />
          </label>
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Login
            {isPending && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
