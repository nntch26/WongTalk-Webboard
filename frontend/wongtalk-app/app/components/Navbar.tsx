"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getProfile, getToken } from "../api/profileServices";
import styles from "./styles/Navbar.module.css";
import { useRouter } from "next/navigation";
import { SearchPost } from "../api/postServices";

// type
import { User } from "@/types/types";

export default function Navbar() {
    const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const [profile, setProfile] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const fetchProfile = async () => {
        try {
            const token = await getToken(); // ดึง token
            if (token) {
                const data = await getProfile();
                setProfile(data);
                setToken(token);
                return;
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const getSearch = await SearchPost(search);
            localStorage.setItem(
                "searchResult",
                JSON.stringify(getSearch.data)
            );
            router.push(`/search?query=${encodeURIComponent(search)}`); // ส่งคำที่ค้นหาไปที่ params ตรง URL
        } catch (error: any) {
            // Type assertion to 'any'
            if (error.response) {
                console.log("No matching posts found");
                localStorage.setItem("searchResult", JSON.stringify([]));
                router.push("/search");
            } else {
                console.error("errorsss", error);
            }
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

    return (
        <>
            {/* Navbar */}
            <nav className={`${styles.navbartop} fixed top-0 left-0 right-0`}>
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
                                <img src="/logo2.png" alt="Logo" />
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
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // กด Enter ค้นหาได้ โครตเจ๋ง 555555555
                            />
                            <button
                                className="px-6 py-2 bg-gray-900 border border-l-0 border-gray-600 rounded-r-full hover:bg-gray-800"
                                onClick={handleSearch}
                            >
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

                        {token && profile ? (
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
}
