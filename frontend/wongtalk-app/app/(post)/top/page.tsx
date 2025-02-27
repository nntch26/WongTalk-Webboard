"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchPostTop } from "@/app/api/postServices";
import { Post, Topic } from "@/types/types";

import Sidebar from "@/app/components/Sidebar";
import TopicList from "@/app/components/home/TopicList";
import PostCard from "@/app/components/home/PostCard";
import ViewMoreButton from "@/app/components/home/ViewMoreButton";


export default function page() {
    const [postsTop, setPostsTop] = useState<Post[]>([]);
    const [topics, setTopicList] = useState<Topic[]>([]) 

    const [morePosts, setMorePosts] = useState<Post[]>([]);
    const [num, setNum] = useState<number>(5)

    const getposts = async () => {
        try {
            const getdata = await fetchPostTop();
            console.log("poststop ------> ", getdata);
            setPostsTop(getdata);
            setMorePosts(getdata.slice(0, num))
        } catch (error) {
            console.log("Error fetching ", error);
        }
    };

    const getTopicList = async() =>{
        try{
            const getdata = localStorage.getItem("topics"); // ดึงข้อมูลจาก localStorage

            if (getdata) {
                setTopicList(JSON.parse(getdata));  // ถ้ามีข้อมูลใน localStorage แล้ว ก้ใช้ข้อมูลนั้น
                console.log('Fetched topics:', getdata);
            }

        }catch(error){
            console.error('Error fetching topics', error)
        }
    }

    //show more โชว์โพสอื่นๆ เพิ่ม
    const handleeShowMorePost = () => {
        console.log(num)
        setNum(prevNum => {
            const newNum = prevNum + 5;// เพิ่มค่า num 
            setMorePosts(postsTop.slice(0, newNum)); // ใช้ค่าที่อัปเดตแล้ว ถ้ากดครั้งแรกไปแล้ว ให้โชว์เพิ่มอีก 
            return newNum;
        })
        
    }
    
    useEffect(() => {
        getposts();
        getTopicList()

    }, []);

    return (
        <div>
            {/* <Navbar /> */}
            <Sidebar />

            {/* <!-- Main Content --> */}
            <div
                id="main-content"
                className="pt-16 ml-0 md:ml-64 transition-margin duration-300 ease-in-out"
            >
                {/* <!-- ส่วน topic  --> */}
                <div className="max-w-6xl mx-auto px-4 mt-8 mb-6">
                    <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap">
                        <Link href={'/'} className="px-3 py-2 bg-gray-800 text-white rounded-lg  text-sm">All</Link>
                        {topics.map((topic) => (
                            <TopicList key={topic._id} topic={topic} />
                        ))}
                    </div>
                </div>

                {/* <!-- ส่วนโพสอื่นๆ --> */}
                <div className="max-w-7xl mx-auto p-4">
                    
                    <div className="text-2xl md:text-4xl font-bold mb-8">
                        <i className="fa-solid fa-arrow-up-right-dots mr-5 text-[--primary-color] "></i>
                        <span >Top Posts</span>
                    </div>


                    <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* ฝั่งซ้าย โพส */}
                        <div className="flex-1">
                            {/* <!-- Post  --> */}
                            {morePosts && morePosts.length > 0 ? (
                                morePosts.map((post) => {
                                    // console.log("Post top:", post);
                                    return (
                                        <PostCard key={post._id} post={post} />
                                    );
                                })
                            ) : (
                                <div>Loading...</div>
                            )}

                            {/* <!-- ปุ่มดูเพิ่มเติม --> */}
                            {morePosts.length < postsTop.length &&(
                            <div className="text-center mt-6">
                                {/* <!-- กดปุ่ม แล้วเปลี่ยนค่า t f ให้แสดงโพสเพิ่ม --> */}
                                <ViewMoreButton onClick={handleeShowMorePost} />
                                
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
