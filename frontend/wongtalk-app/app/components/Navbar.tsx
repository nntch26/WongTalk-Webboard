"use client";
import React, { useState } from "react";
import Link from "next/link";
import { logout } from "../(auth)/api/authServices";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // จัดการตอน logout
    const handleLogout = async () => {
        const res = await logout();
        if (res.success) {
            router.push("/login"); // กลับไปหน้า login
        }
    };

    // ปิด menu
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="p-4 flex justify-between items-center px-4 sm:px-32 bg-[#080E13] fixed top-0 w-full z-10">
                {/* Logo */}
                <div className="text-3xl font-bold sm:text-2xl md:text-2xl">
                    <span className="text-white">Wong</span>
                    <span className="text-[#30E48E]">Talk .</span>
                </div>

                <div className="flex gap-6 items-center hidden sm:flex">
                    <div className="flex gap-6">
                        <Link
                            href="/home"
                            className="text-white cursor-pointer hover:text-[#30E48E]"
                        >
                            Home
                        </Link>
                        <Link
                            href="/post"
                            className="text-white cursor-pointer hover:text-[#30E48E]"
                        >
                            Post
                        </Link>
                        <Link
                            href="/login"
                            className="text-white cursor-pointer hover:text-[#30E48E]"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Profile Icon */}
                    <div className="flex gap-4">
                        <Link href="/profile">
                            <button className="p-2 rounded-full bg-[#373B46] hover:bg-[#191C22]">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Hamburger สำหรับ mobile */}
                <div className="sm:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[#080E13] text-white p-4 fixed top-0 left-0 w-full z-20">
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={closeMenu}
                            className="text-white absolute top-4 right-4 text-2xl"
                        >
                            &times;
                        </button>
                        <Link
                            href="/home"
                            className="cursor-pointer hover:text-[#30E48E]"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href="/post"
                            className="cursor-pointer hover:text-[#30E48E]"
                            onClick={closeMenu}
                        >
                            Post
                        </Link>
                        <Link
                            href="/login"
                            className="cursor-pointer hover:text-[#30E48E]"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>
                        <a
                            onClick={() => {
                                handleLogout();
                                closeMenu();
                            }}
                            className="cursor-pointer hover:text-[#30E48E]"
                        >
                            Logout
                        </a>
                        <Link
                            href="/profile"
                            className="cursor-pointer hover:text-[#30E48E]"
                            onClick={closeMenu}
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
