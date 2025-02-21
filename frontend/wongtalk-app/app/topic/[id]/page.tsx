"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import { Post, Topic } from '@/types/types'
import { fetchPostTopic, fetchTopic, fetchPostTopicTop } from '@/app/api/topicServices'

import PostCard from '@/app/components/home/PostCard';
import Link from 'next/link';
import TopicList from '@/app/components/home/TopicList';
import { handleClientScriptLoad } from 'next/script';



export default function page() {
    const [active, setActive] = useState<boolean>(false);
    const [postTopic, setPostTopic] = useState<Post[]>([]);
    const [topic, setTopic] = useState<Topic[]>([]);
    const [topicId, setTopicId] = useState<string | null>(null);
    const [isTop, setIsTop] = useState<boolean>(false); // ใช้เช็คว่าเป็น Top หรือ Latest
    
    useEffect(() => {
        const storedId = sessionStorage.getItem("itopic_id");
        setTopicId(storedId);
    }, []);
    
    useEffect(() => {
        if (topicId) {
            // ดึงข้อมูลตามค่า isTop ว่าเป็น Top หรือ Latest
            if (isTop) {
                getPostTopicTop(topicId);
            } else {
                getPostTopic(topicId);
            }
            getTopic(topicId);  // ดึงข้อมูลจาก topic
        }
    }, [topicId, isTop]); // จะรันใหม่เมื่อ topicId หรือ isTop เปลี่ยน
    


    // ดึงข้อมูล topic ตาม topicId
    const getPostTopic = async (topicId: string) => {
        try {
            const response = await fetchPostTopic(topicId);
            console.log("Topic latest:", response.data);
            setPostTopic(response.data); // อัพเดตข้อมูล latest
        } catch (error) {
            console.log(error);
        }
    };
    
    // ดึงข้อมูล topic
    const getTopic = async (topicId: string) => {
        try {
            const response = await fetchTopic(topicId);
            console.log("Topic details:", response.data);
            setTopic(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    // ดึงข้อมูล Top posts ตาม topicId
    const getPostTopicTop = async (topicId: string) => {
        try {
            const response = await fetchPostTopicTop(topicId);
            console.log("Topic Top:", response.data);
            setPostTopic(response.data); // อัพเดตข้อมูล top
        } catch (error) {
            console.log(error);
        }
    };
    
    // ฟังก์ชันเมื่อคลิกที่ "Top"
    const handleClickTop = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        setIsTop(true); // เปลี่ยนเป็น Top
        setActive(true); // เปลี่ยนสถานะ active
    };
    
    // ฟังก์ชันเมื่อคลิกที่ "Latest"
    const handleClickLatest = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        setIsTop(false); // เปลี่ยนเป็น Latest
        setActive(true); // เปลี่ยนสถานะ active
    };
    
    
    if (!topicId) {
        return <div>Loading...</div>; // รอให้ id โหลดมา
    }


  return (
    <>
    
        { topic ?(
         topic.map((topic) => (
            <div key={topic._id}>
              
                {/* <!-- Header Section --> */}
                <header className="relative h-64 rounded-lg overflow-hidden">
                    {/* <!-- <img src="https://www.manga-news.com/public/images/univers/naruto-univers-header.webp" alt="Header Image" className="w-full h-full object-cover"> --> */}
                    {/* <!-- Overlay --> */}
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
                    
                    {/* <!-- Content --> */}
                    <div className="absolute inset-0 flex flex-row lg:flex-col  gap-6 justify-center items-center text-center p-4 mt-20">

                        <div className="flex flex-col p-4">
                            <h1 className="text-xl md:text-5xl font-extrabold mb-4">{topic.name}</h1>
                            <p className="text-xs md:text-xl max-w-2xl">
                            {topic.description}
                            </p>
                        </div>
                        
                        <button className="m-4 bg-green-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition md:hidden">
                            Follow
                        </button>
                    </div>
                </header>

                {/* // <!-- Content --> */}
                <div className="container mx-auto px-4 mt-8 ">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* <!-- Main Content  --> */}
                        
                        <div className="w-full  md:w-3/4 pr-0 md:pr-6">
                            {/* <!-- Topic Tabs --> */}
                            <div className="bg-[--second-DarkMidnight] rounded-t-lg border-b border-[--border-color]">
                                <div className="flex flex-wrap items-center justify-between p-6">
                                    <div className="flex flex-wrap space-x-4">
                                        <button className={`font-bold hover:text-primary text-base md:text-lg ${!isTop ? 'text-[--primary-color]': 'text-gray-500'}`}
                                                onClick={(e) => handleClickLatest(e, topic._id)}>Latest</button>

                                        <button className="flex flex-wrap space-x-2 text-base"
                                                onClick={(e) => handleClickTop(e, topic._id)}>
                                            <span className={`font-bold hover:text-primary text-base md:text-lg ${isTop ? 'text-[--primary-color]': 'text-gray-500'}`}>Top</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Post ทั้งหมดในหัวข้อนี้ --> */}
                            {postTopic && postTopic.length > 0 ? (
                            <div className="bg-[--second-DarkMidnight] p-6 space-y-4">

                                {/* <!--  Posts --> */}
                                {postTopic.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                            ) : (
                                // ถ้าไม่มีโพสต์
                                <h2 className="text-gray-400 text-xl text-center py-6">No posts in this topic.</h2>
                            )}
                        </div>
                    

                        {/* <!-- Sidebar --> */}
                        <div className="max-h-max w-full md:w-1/4 hidden md:block">
                            <div className="space-y-4">
                                <div>
                                    {/* <!-- Right Sidebar --> */}
                                    <div className="hidden lg:block w-80 space-y-4">
                                        {/* <!-- Community Card --> */}
                                        <div className="p-4 rounded-lg bg-[--second-DarkMidnight]">

                                            {/* <!-- <img src="user.png" alt="Avatar" className="avatar p-1 w-10 rounded-full"> --> */}
                                            <h2 className="text-xl font-bold mb-3 ">{topic.name}</h2>
                                            <p className="text-sm mb-4">{topic.description}</p>
                                            <button className="w-full text-center bg-[--primary-color] hover:bg-green-400 py-1 rounded text-sm text-[--second-DarkMidnight] font-semibold">
                                                Follow
                                            </button>
                                        </div>

                                        {/* <!-- Moderators Card --> */}
                                        <div className="p-4 rounded-lg bg-[--second-DarkMidnight]">
                                            <div className="max-h-max w-full ">
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="font-bold text-primary">Other Topics</span>
                                                            <span className="text-text"><i className="fa-solid fa-bars-staggered"></i></span>
                                                        </div>

                                                        <div className="space-y-2 overflow-y-auto max-h-60 pr-2">
                                                            <TopicList />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   

                </div>
                    
               
            </div>
        ))

        ) : (
            <div>
                Not Found
            </div>
        )}
    </>
  )
}
