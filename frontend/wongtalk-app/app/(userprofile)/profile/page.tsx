"use client"
import React from "react";
import Link from "next/link";

import { useState, useEffect } from "react";
import { getProfile } from "../api/profileServices";
import { logout } from "@/app/(auth)/api/authServices";
import { useRouter } from "next/navigation";


interface Post {
    _id: string;
    title: string;
    content: string;
    userId: string;
    topicId: string;
    commentCount: number;
    likes: number;
    createdAt: string;
}
interface UserProfile {
    fullname: string;
    username: string;
    email: string;
    posts: Post[];
    createdAt: string;
}

export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <p>Profile not found</p>;


    // จัดการตอน logout
    const handleLogout = async () => {
        const res = await logout();
        if (res.success) {
            router.push("/login"); // กลับไปหน้า login
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#080E13] text-[#E8E9EA]">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto">
                {/* Banner Image */}
                <div className="h-32 sm:h-48 bg-[#0F151A] relative">
                    <img
                        src="https://i.pinimg.com/originals/53/44/9f/53449fa87702af80374c45b87080c639.jpg"
                        alt="banner image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Profile Section */}
                <div className="px-4">
                    <div className="relative">
                        {/* Profile Picture */}
                        <div className="absolute -top-16">
                            <img
                                src="https://th.bing.com/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                alt="Profile picture"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#080E13]"
                            />
                        </div>

                        {/* EditProfile */}
                        <div className="flex justify-end py-3">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm sm:text-base font-bold hover:bg-opacity-90 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="mt-8">
                        <div className="space-y-1">
                            <h1 className="text-xl font-bold">
                                {profile.fullname}
                            </h1>
                            {/* <p className="text-[#E8E9EA]/60 text-sm sm:text-base">@Username_Benjamin</p> */}
                            {/* <p className="text-sm sm:text-base">Wannabe employee</p> */}
                            <p className="text-[#30E48E] text-sm sm:text-base">
                                {profile.username}
                            </p>
                        </div>

                        {/* Profile metadata */}
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-[#E8E9EA]/60 text-sm sm:text-base">
                            <div className="flex items-center gap-1">
                                <span>Joined: {profile.createdAt}</span>
                            </div>
                        </div>

                        <div className="mt-3">
                            <span className="text-[#E8E9EA]/60 text-sm sm:text-base">
                                <span className="font-bold text-[#E8E9EA]">
                                    # {profile.posts.length}
                                </span>{" "}
                                Posts
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-[rgba(0,255,124,1)] to-[#FCD34D] text-[#080E13] rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-opacity">
                            Create Post
                        </button>
                        <Link href="./edit_profile" className="flex-1">
                            <button className="w-full py-2 sm:py-3 border border-[rgba(255,255,255,0.1)] rounded-full text-sm sm:text-base font-bold hover:bg-[#0F151A] transition-colors">
                                Edit Profile
                            </button>
                        </Link>
                    </div>

                    {/* Tabs */}
                    <div className="flex mt-4 border-b border-[rgba(255,255,255,0.1)] overflow-x-auto scrollbar-hide">
                        <button className="px-3 sm:px-4 py-3 sm:py-4 font-bold text-[#30E48E] border-b-2 border-[#30E48E] whitespace-nowrap text-sm sm:text-base">
                            My Posts
                        </button>
                        <button className="px-3 sm:px-4 py-3 sm:py-4 text-[#E8E9EA]/60 whitespace-nowrap text-sm sm:text-base hover:text-[#30E48E] transition-colors">
                            Follow
                        </button>
                    </div>

                    {/* MyPost */}
                    <div className="py-4 divide-y divide-[rgba(255,255,255,0.1)]">

                        {profile.posts.map((post, index) => (
                            <div key={index} className="flex gap-3 py-3">
                                <img
                                    src="https://th.bing.com/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                    alt="Profile picture"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 flex-wrap">
                                        <span className="font-bold text-[#30E48E] text-sm sm:text-base">
                                            {profile.fullname}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm sm:text-base break-words">
                                        {post.content}
                                    </p>
                                    <div className="flex justify-between mt-3 text-[#E8E9EA]/60 max-w-md">
                                        <button className="flex items-center gap-1 text-sm hover:text-[#30E48E] transition-colors">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                                />
                                            </svg>
                                            <span>{post.commentCount}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
