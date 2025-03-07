"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getProfile, getToken } from "../api/profileServices";
import styles from "./styles/Navbar.module.css";
import { useRouter } from "next/navigation";
import { SearchPost } from "../api/postServices";
import Sidebar from "./Sidebar";

// type
import { User } from "@/types/types";


export default function Navbar() {
    const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const [profile, setProfile] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);


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
        if (!search.trim()) {
            return;
        }
        try {
            console.log("search word",search)

            const getSearch = await SearchPost(search);
            console.log("getSearch",getSearch)
            localStorage.setItem(
                "searchResult",
                JSON.stringify(getSearch.data)
            );
            setSuggestions([]);  // ลบคำแนะนำ
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
    
    const handleSuggestion = async (search: string)=>{
        // ถ้าเปนช่องว่าง ส่งเปนลิสเปล่า
        if (!search.trim()) {
            setSuggestions([]);
            return;
        }
        try {
            const getSearch = await SearchPost(search);
            // ดึงแค่ title
            const titles = getSearch.data.map((suggestion: { title: string }) => suggestion.title);
        setSuggestions(titles); 
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        }

    }

    // เลือกคำค้นหา จากอันที่แนะนำ
    const handleSelectSuggestion = async (suggestion: string) => {
        console.log("SelectSuggestion -->:", suggestion);
        setSearch(suggestion)
        setSuggestions([]); // ลบคำแนะนำ
    
        try {
            console.log("search word2", suggestion); 
    
            const getSearch = await SearchPost(suggestion);
            localStorage.setItem(
                "searchResult",
                JSON.stringify(getSearch.data)
            );
            router.push(`/search?query=${encodeURIComponent(suggestion)}`);
    
        } catch (error: any) {
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
        setSidenavOpen(!sidenavOpen); // ถ้ากดที่ เบอร์เกอร์เมนู ให้เปิดปิด
    };

    console.log("search:",search)
    console.log("search results:",suggestions)


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
                                value={search}
                                onChange={(e) => {setSearch(e.target.value); handleSuggestion(e.target.value)}}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // กด Enter ค้นหาได้ โครตเจ๋ง 555555555
                            />
                            <button
                                className="px-6 py-2 bg-gray-900 border border-l-0 border-gray-600 rounded-r-full hover:bg-gray-800"
                                onClick={handleSearch}
                            >
                                <i className="fas fa-search text-gray-300"></i>
                            </button>

                            {/* โชว์คำค้นหาใกล้เคียง */}

                            {suggestions.length > 0 && (
                                <ul className="absolute bg-[--second-DarkMidnight] border border-gray-700 rounded-md p-4 mt-10 w-5/12 z-30">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-800"
                                            onClick={() => {handleSelectSuggestion(suggestion)}}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                    <hr className="border-gray-700 mt-2 mb-2" />
                                    <li className="text-gray-400"><i className="fas fa-search text-gray-300 mr-2"></i>Search For "{search}"</li>
                                </ul>
                            )}
                            

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

            </nav>

            {/* Overlay */}
            {sidenavOpen && (
                <>
                    <div
                        id="overlay"
                        className="fixed inset-0 bg-white bg-opacity-50 z-40 transition-transform duration-300 ease-in-out md:hidden"
                    ></div>
                    <Sidebar onClickOpen={sidenavOpen}/>
                </>
            )}
        </>
    );
}
