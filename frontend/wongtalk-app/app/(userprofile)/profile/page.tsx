"use client";
import React from "react";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { getProfile } from "../../api/profileServices";
import { getFollowTopic } from "@/app/api/userServices";
import { useRouter } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import Popup from "@/app/components/popupModel";
// type
import { User, Topic } from "@/types/types";
import { userFollowTopic } from "@/app/hook/useFollowTopic";

export default function Profile() {
    const { profile, topics, loading, error } = userFollowTopic();
    const [isShow, setIsShow] = useState<boolean>(false);
    const [mypost, setMyPost] = useState<boolean>(true);
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // เริ่มต้น set state ให้เป็น false
    useEffect(() => {
        const selectStart = topics.reduce((acc, topic) => {
            acc[topic._id] = false;
            return acc;
        }, {} as { [key: string]: boolean });
        setSelected(selectStart);
    }, [topics]);

    const handleSelect = (e: React.MouseEvent, topicid: string) => {
        e.preventDefault();
        setSelected((prev) => ({
            ...prev,
            [topicid]: !prev[topicid],
        }));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            // ปิด dropdown โดยตั้งค่า selected ให้เป็น false
            setSelected((prev) => {
                const newSelected = { ...prev };
                for (const key in newSelected) {
                    newSelected[key] = false; // ปิด dropdown ทั้งหมด
                }
                return newSelected;
            });
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />

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
                                    src={`/uploads/${profile?.image}`}
                                    alt="Profile picture"
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#080E13]"
                                />
                            </div>

                            {/* EditProfile */}
                            <div className="flex justify-end py-3">
                                <button>
                                    <i
                                        className="fa-solid fa-arrow-right-from-bracket fa-xl sm:mt-5 text-[#E8E9EA]/60"
                                        onClick={() => setIsShow(true)}
                                    ></i>
                                </button>

                                <Popup
                                    isOpen={isShow}
                                    onClose={() => setIsShow(false)}
                                />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-8">
                            <div className="space-y-1">
                                <h1 className="text-xl font-bold">
                                    {profile?.fullname}
                                </h1>
                                <p className="text-[#30E48E] text-sm sm:text-base">
                                    {profile?.username}
                                </p>
                            </div>

                            {/* Profile metadata */}
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-[#E8E9EA]/60 text-sm sm:text-base">
                                <div className="flex items-center gap-1">
                                    <span>Joined: {profile?.createdAt}</span>
                                </div>
                            </div>

                            <div className="mt-3">
                                <span className="text-[#E8E9EA]/60 text-sm sm:text-base">
                                    <span className="font-bold text-[#E8E9EA]">
                                        # {profile?.posts.length}
                                    </span>{" "}
                                    Posts
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                            <Link href="createpost" className="flex-1">
                                <button className="w-full py-2 sm:py-3 bg-gradient-to-r from-[rgba(0,255,124,1)] to-[#FCD34D] text-[#080E13] rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-opacity">
                                    Create Post
                                </button>
                            </Link>
                            <Link href="edit_profile" className="flex-1">
                                <button className="w-full py-2 sm:py-3 border border-[rgba(255,255,255,0.1)] rounded-full text-sm sm:text-base font-bold hover:bg-[#0F151A] transition-colors">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>

                        {/* Tabs */}
                        <div className="flex mt-4 border-b border-[rgba(255,255,255,0.1)] overflow-x-auto scrollbar-hide">
                            <button
                                className={` ${
                                    mypost
                                        ? "text-[#30E48E] border-b-2 border-[#30E48E] font-bold"
                                        : "text-[#E8E9EA]/60 hover:text-[#30E48E]"
                                }
                                    px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base`}
                                onClick={() => setMyPost(true)}
                            >
                                My Posts
                            </button>
                            <button
                                className={` ${
                                    !mypost
                                        ? "text-[#30E48E] border-b-2 border-[#30E48E] font-bold"
                                        : "text-[#E8E9EA]/60 hover:text-[#30E48E]"
                                }
                                    px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base transition-colors`}
                                onClick={() => setMyPost(false)}
                            >
                                Follow
                            </button>
                        </div>

                        {/* MyPost */}
                        {mypost ? (
                            <div className="py-4 divide-y divide-[rgba(255,255,255,0.1)] noscroll overflow-y-auto max-h-[26rem]">
                                {profile?.posts.map((post, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 py-3 mb-5"
                                    >
                                        <img
                                            src={`/uploads/${profile.image}`}
                                            alt="Profile picture"
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1 flex-wrap">
                                                <span className="font-bold text-[#30E48E] text-sm sm:text-base">
                                                    {profile.fullname}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{profile.createdAt}</p>

                                            <p className="mt-1 text-sm sm:text-base break-words">
                                                {post.content}
                                            </p>
                                            <div className="flex justify-between mt-3 text-[#E8E9EA]/60 max-w-md">
                                                <button className="flex items-center gap-1 text-sm hover:text-[#30E48E] transition-colors">
                                                    <i className="fa-regular fa-comment-dots fa-lg"></i>

                                                    <span>
                                                        {post.commentCount}
                                                    </span>
                                                </button>
    
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // div Follow Tpic
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
                                {topics.map((topic) => (
                                    <div
                                        key={topic._id}
                                        className="relative rounded-lg p-4 border border-[#374151] transition duration-200 hover:bg-[#0F151A] hover:border-[#4B5563]"
                                    >
                                        <i
                                            className="fa-solid fa-ellipsis-vertical absolute top-3 right-3 cursor-pointer text-gray-500 text-xl hover:text-[#E8E9EA] transition"
                                            onClick={(e) => {
                                                e.stopPropagation(); // ป้องกันการเกิดเหตุการณ์คลิกที่ div หลัก
                                                handleSelect(e, topic._id);
                                            }}
                                        ></i>

                                        <div ref={dropdownRef}>
                                            {selected[topic._id] && (
                                                <div className="absolute top-8 right-5 bg-[#1E293B] border border-[#374151] rounded-md shadow-lg p-1">
                                                    <button className="text-red-500 text-sm px-2 py-1 hover:font-bold rounded-md transition">
                                                        Unfollow
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <i
                                            className={`${topic.icon} text-base md:text-l`}
                                        ></i>

                                        <h1>{topic.name}</h1>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
