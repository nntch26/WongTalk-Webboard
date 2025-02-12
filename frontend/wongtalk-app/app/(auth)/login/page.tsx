"use client";
import React from "react";
import Link from "next/link";
import { login } from "../api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = await login(email, password);
            router.push("/profile");
            console.log(userData);
        } catch (err: any) {
            alert("Invalid email or password");
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#080E13]">
            {/* container หลัก */}
            <div className="w-full sm:w-[80%] md:w-[500px] max-w-5xl bg-[#0F151A] rounded-3xl shadow-xl flex justify-center overflow-hidden min-h-[500px] md:h-[50vh]">
                {/* div login */}
                <div className="w-full min-h-[300px] p-4 sm:p-6 md:p-8 bg-[#0F151A] flex justify-center relative">
                    <div className="w-full max-w-sm relative pt-16">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            <img
                                src="/logo2.png"
                                alt="Logo"
                                className="w-12 h-12"
                            />
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E9EA] mb-6 text-center">
                            Login
                        </h3>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            {/* Email Input */}
                            <div className="relative">
                                <svg
                                    className="w-5 h-5 absolute left-3 top-3.5 text-[#E8E9EA]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <svg
                                    className="w-5 h-5 absolute left-3 top-3.5 text-[#E8E9EA]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    ></path>
                                </svg>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-xs sm:text-sm mt-2">
                                <label className="flex items-center text-[#E8E9EA]">
                                    <input
                                        type="checkbox"
                                        id="red-checkbox"
                                        className="rounded border-[#A2A8B6] text-[#30E48E] focus:ring-[#30E48E] mr-2"
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="#"
                                    className="text-[#30E48E] hover:text-opacity-80"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-[#30E48E] text-[#080E13] font-medium hover:bg-opacity-90 transition duration-300 mt-2"
                            >
                                Login
                            </button>

                            {/* Register Link */}
                            <p className="text-center text-xs sm:text-sm text-[#E8E9EA] mt-2">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-[#30E48E] hover:text-opacity-80"
                                >
                                    Create an Account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
