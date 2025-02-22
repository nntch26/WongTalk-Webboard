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
    const [topic, setTopic] = useState<Topic[]>([]);
    const [topicId, setTopicId] = useState<string | null>(null);
    const [topicList, setTopicList] = useState<Topic[]>([]);
    const [isTop, setIsTop] = useState<boolean>(false); // ใช้เช็คว่าเป็น Top หรือ Latest
    const [isLoading, setIsLoading] = useState(false);

    // ดึง session topic id
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
    const getTopicList = async () => {
        try {
            const response = await fetchTopics();
            console.log("Topic details:", response);
            setTopicList(response);
        } catch (error) {
            console.log(error);
        }
    };

    // ดึง topic อันเดียว
    const getTopicOne = async(id:string) =>{

        try{
            const response = await fetchTopic(id)
            setTopic(response.data) // ดึงส่วน data 

        }catch(error){
            console.log(error)
        }
    }
    

    const handleClickTopic = (e:React.MouseEvent, id:string, name:string) =>{
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
        {topic[0] && ( 
            <>
                {/* <!-- header --> */}
                <TopicHead key={topic[0]._id} topic={topic[0]} />

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
                        <div className="max-h-max w-full md:w-1/4 hidden md:block">
                            <div className="space-y-4">
                                <div>
                                    {/* <!-- Right Sidebar --> */}
                                    <div className="hidden lg:block space-y-4">
                                            
                                            <TopicSidebar key={topic[0]._id} topic={topic[0]} />

                                            {/* <!-- Other Topics Card --> */}
                                            <div className="p-4 rounded-lg bg-[--second-DarkMidnight]">
                                                <div className="max-h-max w-full ">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex justify-between items-center mb-4">
                                                                <span className="font-bold text-primary">Other Topics</span>
                                                                <span className="text-text"><i className="fa-solid fa-bars-staggered"></i></span>
                                                            </div>

                                                            <div className="space-y-2 overflow-y-auto max-h-60 pr-2">

                                                                {topicList.map((topiclist)=>(
                                                                    <button onClick={(e) => handleClickTopic(e, topiclist._id, topiclist.name)} key={topiclist._id}
                                                                        className={`${styles.topicitem} px-3 py-2  w-full flex items-center `}>
                                                                            <i className={`${topiclist.icon} text-base md:text-l`}></i>
                                                                            <span className="text-xs md:text-sm text-center ml-2"> {topiclist.name}</span>
                                                                    </button>
                                                                ))}
                                                            
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
            </>
        )}
    </>
    );
    
}