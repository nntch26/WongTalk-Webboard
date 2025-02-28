"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/types";

import Sidebar from "../components/Sidebar";
import PostCard from "../components/home/PostCard";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [morePosts, setMorePosts] = useState<Post[]>([]);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [num, setNum] = useState<number>(5);
    
    const query = useSearchParams() // ดึงค่าคำค้นหาจาก params
    const queryURL = query.get("query") || "";


    // ดึง post จาก localStorage
    const getposts = async () => {
        try {
            const data = localStorage.getItem("searchResult");

            // ถ้ามี
            if (data) {
                const searchResult = JSON.parse(data);
                // ใน localStorage มีแต่เป็น [] ว่าง
                if (searchResult.length === 0) {
                    setNotFound(true);
                    setAllPosts([]);
                    setMorePosts([]);
                }

                // มีข้อมูล หาเจอ
                else {
                    setNotFound(false);
                    setAllPosts(searchResult); // เก็บโพสต์ทั้งหมด
                    setMorePosts(searchResult.slice(0, num)); // แสดงเฉพาะ 2 โพสแรก
                }
            }

            // ถ้าใน localStorage ไม่มี
            else {
                setNotFound(true);
                setAllPosts([]);
                setMorePosts([]);
            }
        } catch (error) {
            console.log("Error fetching ", error);
            setNotFound(true);
        }
    };

    //show more โชว์โพสอื่นๆ เพิ่ม
    const handleeShowMorePost = () => {
        console.log(num);
        setNum(num + 5); // เพิ่มค่า num แต่ numจะไม่เปลี่ยนทันที เลย + ไปตรงๆ
        setMorePosts(allPosts.slice(0, num + 5)); // ถ้ากดครั้งแรกไปแล้ว ให้โชว์เพิ่มอีก
        console.log(num);
    };

    // โหลด ครั้งเดียว
    useEffect(() => {
        getposts();
    }, [queryURL]);


    return (
        <>
            <Navbar />
            <Sidebar onClickOpen={false} />
            {/* <!-- Main Content --> */}
            <div
                id="main-content"
                className="pt-24 ml-0 md:ml-64 transition-margin duration-300 ease-in-out"
            >
                {/* <!-- ส่วนโพสอื่นๆ --> */}
                <div className="max-w-7xl mx-auto p-4">
                    <h3 className="text-2xl md:text-4xl font-bold mb-8">
                        Search results for " {queryURL} "
                    </h3>

                    {!notFound ? (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/*  ฝั่งซ้าย โพส */}
                            <div className="flex-1">
                                {/* <!-- Post  --> */}
                                {morePosts && morePosts.length > 0 ? (
                                    morePosts.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))
                                ) : (
                                    <div>Loading...</div>
                                )}

                                {/* <!-- ปุ่มดูเพิ่มเติม --> */}
                                {morePosts.length < allPosts.length && (
                                    <div className="text-center mt-6">
                                        <button
                                            className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700"
                                            onClick={() =>
                                                handleeShowMorePost()
                                            }
                                        >
                                            {" "}
                                            {/* <!-- กดปุ่ม แล้วเปลี่ยนค่า t f ให้แสดงโพสเพิ่ม --> */}
                                            View All
                                            <i className="fas fa-chevron-down ml-2"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-gray-400 text-xl text-center">
                            No matching posts found.
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}
