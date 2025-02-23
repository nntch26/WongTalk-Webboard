"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import { Post, Topic } from '@/types/types'
import { fetchPostTopic, fetchTopics, fetchPostTopicTop, fetchTopic } from '@/app/api/topicServices'
import PostCard from '@/app/components/home/PostCard';
import Link from 'next/link';

import styles from "@/app/components/styles/Maincontent.module.css";

import TopicHead from '@/app/components/topic/TopicHead';
import TopicSidebar from '@/app/components/topic/TopicSidebar ';

export default function page() {
    const [postTopic, setPostTopic] = useState<Post[]>([]);
    const [topic, setTopic] = useState<Topic| null>(null)
    const [topicId, setTopicId] = useState<string | null>(null);
    const [topicList, setTopicList] = useState<Topic[]>([]);
    const [isTop, setIsTop] = useState<boolean>(false); // ใช้เช็คว่าเป็น Top หรือ Latest
    const [isLoading, setIsLoading] = useState(false);

    // ดึง session topic id ที่กดมาจากหน้าอื่น
    useEffect(() => {
        const storedId = sessionStorage.getItem("itopic_id");
        if (storedId) {
            setTopicId(storedId);
        }
    }, []);
    
    
    
    useEffect(() => {
        if (!topicId) return;

        setIsLoading(true);  // เริ่มโหลด

        const fetchData = async () => {
            try {
                if (isTop) {  // ดึงข้อมูลตามค่า isTop ว่าเป็น Top หรือ Latest
                    await getPostTopicTop(topicId);
                } else {
                    await getPostTopic(topicId);
                }
                await getTopicList();
                await getTopicOne(topicId);// ดึงข้อมูลจาก topic

            } catch (error) {

                console.error(error);
            } finally {
                setIsLoading(false); // ซ่อน Loading ตอนโหลดเสร็จ 
            }
        };
        fetchData();

    }, [topicId, isTop]); // รันใหม่ถ้า topicId หรือ isTop เปลี่ยน

    


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

     
    // ดึงข้อมูล topic หลายๆอัน
    const getTopicList = async() =>{
        try{
            const cachedTopics = localStorage.getItem("topics"); // ดึงข้อมูลจาก localStorage

            if (cachedTopics) {
                setTopicList(JSON.parse(cachedTopics));  // ถ้ามีข้อมูลใน localStorage แล้ว ก้ใช้ข้อมูลนั้น

            } else {
                // ถ้ายังไม่มี ก้ดึง api มาใหม่
                const getdata = await fetchTopics();
                setTopicList(getdata);
                localStorage.setItem("topics", JSON.stringify(getdata)); // เก็บเข้า localStorage
                console.log('Fetched topics:', getdata);
            }
        }catch(error){
            console.error('Error fetching topics', error)
        }
    }
    

    // ดึง topic อันเดียว
    const getTopicOne = async(id:string) =>{

        try{
            const response = await fetchTopic(id)
            setTopic(response.data[0]) // ดึงส่วน data 

        }catch(error){
            console.log(error)
        }
    }
    

    // กดเลือก topic ในหน้านี้
    const handleClickTopic = (e:React.MouseEvent, id:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
        
        if (id === topicId) return; // ถ้ากด ID เดิม ให้ return ออกไปเลย (ไม่โหลดใหม่)

        setIsLoading(true);
        setTimeout(() => {
            setTopicId(id);
        }, 300); // หน่วงเวลา 0.3 ก่อนเปลี่ยน topicId
        
    }


    // ฟังก์ชัน คลิกปุ่ม Top
    const handleClickTop = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        setIsTop(true); // เปลี่ยนเป็น Top
    };
    
    // ฟังก์ชัน คลิกปุ่ม Latest
    const handleClickLatest = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        setIsTop(false); // เปลี่ยนเป็น Latest
        
    };


    if (!topicId) {
        return null // รอให้ id โหลดมา
    }


    return (
    <>
        {/* Loading Bar */}
        {isLoading && (
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="h-0.5 bg-[--primary-color] animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
        )}
        
        {topic && ( 
            <>
                {/* <!-- header --> */}
                <TopicHead key={topic._id} topic={topic} />

                <div className="container mx-auto px-4 mt-8 ">
                    <div className="flex flex-col lg:flex-row gap-6 justify-center">
                        {/* <!-- Main Content  --> */}
                        <div className="w-full md:w-3/4">
                            {/* <!-- Topic Tabs --> */}
                            <div className="bg-[--second-DarkMidnight] rounded-t-lg border-b border-[--border-color]">
                                <div className="flex flex-wrap items-center justify-between p-6">
                                    <div className="flex flex-wrap space-x-4">
                                        <button 
                                            className={`font-bold hover:text-primary text-base md:text-lg ${
                                                !isTop ? 'text-[--primary-color]' : 'text-gray-500'
                                            }`} 
                                            onClick={(e) => handleClickLatest(e, topicId)}
                                        >
                                            Latest
                                        </button>

                                        <button 
                                            className="flex flex-wrap space-x-2 text-base" 
                                            onClick={(e) => handleClickTop(e, topicId)}
                                        >
                                            <span 
                                                className={`font-bold hover:text-primary text-base md:text-lg ${
                                                    isTop ? 'text-[--primary-color]' : 'text-gray-500'
                                                }`}
                                            >
                                                Top
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Post ทั้งหมดในหัวข้อนี้ --> */}
                            {postTopic && postTopic.length > 0 ? (
                                <div className="bg-[--second-DarkMidnight] p-3 space-y-4">
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
                        <TopicSidebar key={topic._id} 
                            topic={topic}
                            topiclist={topicList}
                            onClickTopic={handleClickTopic} 
                        />
                    </div>
                </div>
            </>
        )}
    </>
    );
    
}