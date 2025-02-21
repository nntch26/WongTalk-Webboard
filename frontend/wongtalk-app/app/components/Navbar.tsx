"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// import { useRouter } from "next/navigation";

import { getProfile, getToken } from "../(userprofile)/api/profileServices";
import styles from "./styles/Navbar.module.css";
import Router from "next/router";
// type
import { UserProfile } from "@/types/types";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null)

    const fetchProfile = async () => {
        try {
            const token = await getToken(); // ดึง token
            if (token) {
                const data = await getProfile();
                setProfile(data);
                setToken(token);
                console.log("FFFF")
                return;
            }
            

            
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    // ดึง user
    useEffect(() => {
        fetchProfile();
    }, []);

    const toggleSidenav = (): void => {
        console.log(sidenavOpen);
        setSidenavOpen(!sidenavOpen);
    };

    // ฟังก์ชันเปิดปิด sidenav ถ้าคลิกด้านนอก
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            const sidenav = document.getElementById("sidenav");
            const toggleButton = document.getElementById("toggle-button");
            const overlay = document.getElementById("overlay");

            // ตรวจสอบว่า click outside หรือไม่
            if (
                sidenavOpen &&
                sidenav &&
                toggleButton &&
                overlay &&
                !sidenav.contains(event.target as Node) &&
                !toggleButton.contains(event.target as Node) &&
                !overlay.contains(event.target as Node)
            ) {
                setSidenavOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [sidenavOpen]);

    // if (!profile) {
    //     return <p>Profile not found</p>;
    // }

    // if (token) {
    //     console.log("tokennnn")
    // }
        return (
            <>
                {/* Navbar */}
                <nav
                    className={`${styles.navbartop} fixed top-0 left-0 right-0`}
                >
                    <div className="flex items-center justify-between p-4">
                        {/* <!-- ส่วนฝั่งซ้าย navbar --> */}
                        <div className="flex items-center gap-4">
                            <button
                                id="toggle-button"
                                className="p-2 hover:text-gray-400 rounded-full lg:hidden"
                                onClick={toggleSidenav}
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>

                            {/* <!-- ส่วน logo --> */}
                            <div className="flex items-center hidden lg:block">
                                <Link href="/" className={styles.logo}>
                                    <img src="logo2.png" alt="Logo" />
                                    <span className="font-bold text-2xl">
                                        Wong
                                        <span className="text-[--primary-color]">
                                            Talk .
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Search bar */}
                        <div className="flex items-center flex-1 max-w-2xl mx-4">
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={styles.searchbar}
                                />
                                <button className="px-6 py-2 bg-gray-900 border border-l-0 border-gray-600 rounded-r-full hover:bg-gray-800">
                                    <i className="fas fa-search text-gray-300"></i>
                                </button>
                            </div>
                        </div>

                        {/* <!-- ส่วนฝั่งขวา navbar --> */}
                        <div className="flex items-center gap-5">
                            <Link
                                href="/createpost"
                                className={`${styles.btncus} text-center md:flex px-3 py-2 rounded-lg items-center`}
                            >
                                <i className="fa-regular fa-square-plus text-l md:text-xl"></i>
                                <span className="hidden md:block ml-2 text-base md:text-l font-semibold">
                                    Post
                                </span>
                            </Link>


                            {token &&  profile ?  (
                                <Link
                                href="/profile"
                                className="flex items-center space-x-2"
                                >
                                <img
                                    src={`/uploads/${profile.image}`}
                                    alt="Profile picture"
                                    className=" w-10 h-10 rounded-full"
                                    />
                            </Link>

                                ) : (
                                    <Link
                                    href="/login"
                                    className="text-white cursor-pointer hover:text-[#30E48E]"
                                    >
                                Login
                            </Link>
                            )}
                        </div>
                    </div>

                    {/* Overlay */}
                    {sidenavOpen && (
                        <div
                            id="overlay"
                            className="fixed inset-0 bg-white bg-opacity-50 z-40 transition-transform duration-300 ease-in-out md:hidden"
                        ></div>
                    )}
                </nav>
            </>
        );

    {
        /* // return ( */
    }
    //     <>
    //         {/* Navbar */}
    //         <nav className="p-4 flex justify-between items-center px-4 sm:px-32 bg-[#080E13] fixed top-0 w-full z-10">
    //             {/* Logo */}
    //             <div className="text-3xl font-bold sm:text-2xl md:text-2xl">
    //                 <span className="text-white">Wong</span>
    //                 <span className="text-[#30E48E]">Talk .</span>
    //             </div>

    //             <div className="flex gap-6 items-center hidden sm:flex">
    //                 <div className="flex gap-6">
    //                     <Link
    //                         href="/home"
    //                         className="text-white cursor-pointer hover:text-[#30E48E]"
    //                     >
    //                         Home
    //                     </Link>
    //                     <Link
    //                         href="/post"
    //                         className="text-white cursor-pointer hover:text-[#30E48E]"
    //                     >
    //                         Post
    //                     </Link>
    //                     <Link
    //                         href="/login"
    //                         className="text-white cursor-pointer hover:text-[#30E48E]"
    //                     >
    //                         Login
    //                     </Link>
    //                 </div>

    //                 {/* Profile Icon */}
    //                 <div className="flex gap-4">
    //                     <Link href="/profile">
    //                         <button className="p-2 rounded-full bg-[#373B46] hover:bg-[#191C22]">
    //                             <svg
    //                                 className="h-6 w-6 text-white"
    //                                 fill="none"
    //                                 viewBox="0 0 24 24"
    //                                 stroke="currentColor"
    //                             >
    //                                 <path
    //                                     strokeLinecap="round"
    //                                     strokeLinejoin="round"
    //                                     strokeWidth="2"
    //                                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    //                                 />
    //                             </svg>
    //                         </button>
    //                     </Link>
    //                 </div>
    //             </div>

    //             {/* Hamburger สำหรับ mobile */}
    //             <div className="sm:hidden flex items-center">
    //                 <button
    //                     onClick={() => setIsMenuOpen(!isMenuOpen)}
    //                     className="text-white"
    //                 >
    //                     <svg
    //                         className="h-6 w-6"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                     >
    //                         <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth="2"
    //                             d="M4 6h16M4 12h16M4 18h16"
    //                         />
    //                     </svg>
    //                 </button>
    //             </div>
    //         </nav>

    //         {/* Mobile Menu */}
    //         {isMenuOpen && (
    //             <div className="sm:hidden bg-[#080E13] text-white p-4 fixed top-0 left-0 w-full z-20">
    //                 <div className="flex flex-col gap-4">
    //                     <button
    //                         onClick={closeMenu}
    //                         className="text-white absolute top-4 right-4 text-2xl"
    //                     >
    //                         &times;
    //                     </button>
    //                     <Link
    //                         href="/home"
    //                         className="cursor-pointer hover:text-[#30E48E]"
    //                         onClick={closeMenu}
    //                     >
    //                         Home
    //                     </Link>
    //                     <Link
    //                         href="/post"
    //                         className="cursor-pointer hover:text-[#30E48E]"
    //                         onClick={closeMenu}
    //                     >
    //                         Post
    //                     </Link>
    //                     <Link
    //                         href="/login"
    //                         className="cursor-pointer hover:text-[#30E48E]"
    //                         onClick={closeMenu}
    //                     >
    //                         Login
    //                     </Link>
    //                     <a
    //                         onClick={() => {
    //                             handleLogout();
    //                             closeMenu();
    //                         }}
    //                         className="cursor-pointer hover:text-[#30E48E]"
    //                     >
    //                         Logout
    //                     </a>
    //                     <Link
    //                         href="/profile"
    //                         className="cursor-pointer hover:text-[#30E48E]"
    //                         onClick={closeMenu}
    //                     >
    //                         Profile
    //                     </Link>
    //                 </div>
    //             </div>
    //         )}
    //     </>
    // );
}
