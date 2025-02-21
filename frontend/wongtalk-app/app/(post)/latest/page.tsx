"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchPostNew } from "@/app/api/postServices";
import { Post } from "@/types/types";

import Sidebar from "@/app/components/Sidebar";
import TopicList from "@/app/components/home/TopicList";
import PostCard from "@/app/components/home/PostCard";
import Navbar from "@/app/components/Navbar";

export default function page() {
    const [postsnew, setPostsnew] = useState<Post[]>([]);

    useEffect(() => {
        const getposts = async () => {
            try {
                const getdata = await fetchPostNew();
                console.log("data ", getdata);
                setPostsnew(getdata);
            } catch (error) {
                console.log("Error fetching ", error);
            }
        };
        getposts();
    }, []);

    return (
        <div>
            <Navbar />
            <Sidebar />

            {/* <!-- Main Content --> */}
            <div
                id="main-content"
                className="pt-16 ml-0 md:ml-64 transition-margin duration-300 ease-in-out"
            >
               {/* <!-- ส่วน topic  --> */}
                <div className="max-w-6xl mx-auto px-4 mt-8 mb-4">
                    <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap">
                        <button className="px-3 py-2 bg-gray-800 text-white rounded-lg  text-sm">All</button>
                        <TopicList />
                    </div>
                </div>

                {/* <!-- ส่วนโพสอื่นๆ --> */}
                <div className="max-w-7xl mx-auto p-4">
                    <h3 className="text-2xl md:text-4xl font-bold mb-8">
                        Latest Posts 
                    </h3>

                    <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* ฝั่งซ้าย โพส */}
                        <div className="flex-1">
                            {/* <!-- Post  --> */}
                            {postsnew && postsnew.length > 0 ? (
                                postsnew.map((post) => {
                                    console.log("Post Data:", post);
                                    return (
                                        <PostCard key={post._id} post={post} />
                                    );
                                })
                            ) : (
                                <div>Loading...</div>
                            )}

                            {/* <!-- ปุ่มดูเพิ่มเติม --> */}
                            <div className="text-center mt-6">
                                <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700">
                                    more
                                    <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
