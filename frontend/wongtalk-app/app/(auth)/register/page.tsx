"use client";
import React, { useState } from "react";
import Link from "next/link";
import { register } from "../../api/authServices";
import { useRouter } from "next/navigation";

// type
import { RegisterForm } from "@/types/types";

export default function Register() {
    const [formData, setFormData] = useState<RegisterForm>({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // เคลียร์ error ถ้ามีค่า error อยู่
        if (error) setError(null);
    };

    const validateForm = () => {
        if (
            !formData.fullname ||
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All fields are required");
            return false;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Invalid email format");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const result = await register(
                formData.fullname,
                formData.username,
                formData.email,
                formData.password,
                formData.confirmPassword
            );

            // set userId ไปที่ session เพื่อให้หน้า recommend ใช้
            const userId = result.user._id;
            sessionStorage.setItem("userId", userId);
            router.push("/recommend");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#080E13]">
            {/* container หลัก */}
            <div className="w-full sm:w-[80%] md:w-[500px] max-w-6xl bg-[#0F151A] rounded-3xl shadow-xl flex justify-center overflow-hidden min-h-[750px] md:h-[55vh]">
                <div className="w-full min-h-[680px] p-4 sm:p-6 md:p-8 bg-[#0F151A] flex justify-center relative">
                    <div className="w-full max-w-sm mx-auto relative pt-16 ">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            <Link href={"/"}> 
                                <img src="/logo2.png" alt="Logo"className="w-12 h-12"/>
                            </Link>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E9EA] mb-6 sm:mb-8 text-center">
                            Register
                        </h3>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Fullname Input */}
                            <div className="relative">
                                <label className="block text-[#E8E9EA] text-[16px] mb-1">
                                    Fullname
                                </label>
                                <svg
                                    className="w-5 h-5 absolute left-3 top-10 text-[#E8E9EA]"
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
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="w-full px-2 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Fullname"
                                    required
                                />
                            </div>

                            {/* Username Input */}
                            <div className="relative">
                                <label className="block text-[#E8E9EA] text-[16px] mb-1">
                                    Username
                                </label>
                                <svg
                                    className="w-5 h-5 absolute left-3 top-10 text-[#E8E9EA]"
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
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-2 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Username"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <label className="block text-[#E8E9EA] text-[16px] mb-1">
                                    Email
                                </label>
                                <svg
                                    className="w-5 h-5 absolute left-3 top-10 text-[#E8E9EA]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-2 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <label className="block text-[#E8E9EA] text-[16px] mb-1">
                                    Password
                                </label>
                                <svg
                                    className="w-5 h-5 absolute left-3 top-10 text-[#E8E9EA]"
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-2 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            {/* Confirm Password Input */}
                            <div className="relative">
                                <label className="block text-[#E8E9EA] text-[16px] mb-1">
                                    Confirm Password
                                </label>
                                <svg
                                    className="w-5 h-5 absolute left-3 top-10 text-[#E8E9EA]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    ></path>
                                </svg>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-2 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] focus:border-[#30E48E] focus:ring-2 focus:ring-[#30E48E] outline-none transition pl-10 text-[#E8E9EA] bg-[#191C24]"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>

                            {/* Terms and Conditions */}
                            {/* <div className="flex items-center justify-between text-xs sm:text-sm">
                                <label className="flex items-center text-[#E8E9EA]">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="rounded border-[rgba(255,255,255,0.1)] text-[#30E48E] focus:ring-[#30E48E] mr-2"
                                    />
                                    Agree to Terms and Conditions
                                </label>
                            </div> */}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-[#30E48E] text-[#080E13] font-medium hover:bg-opacity-90 transition duration-300"
                            >
                                Create Account
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-xs sm:text-sm text-[#E8E9EA] mt-2">
                                Have an account already?{" "}
                                <Link
                                    href="/login"
                                    className="text-[#30E48E] hover:text-opacity-80"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
