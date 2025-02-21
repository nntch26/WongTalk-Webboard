"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import { Post, Topic } from '@/types/types'
import { fetchPostTopic, fetchTopics, fetchPostTopicTop, fetchTopic } from '@/app/api/topicServices'
import PostCard from '@/app/components/home/PostCard';
import Link from 'next/link';


import styles from "@/app/components/styles/Maincontent.module.css";

export default function page() {
    const [postTopic, setPostTopic] = useState<Post[]>([]);
    const [topic, setTopic] = useState<Topic[]>([]);
    const [topicId, setTopicId] = useState<string | null>(null);
    const [topicList, setTopicList] = useState<Topic[]>([]);
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
            getTopicList()
            getTopicOne(topicId);  // ดึงข้อมูลจาก topic
        }
    }, [topicId, isTop]); // รันใหม่เมื่อ topicId หรือ isTop เปลี่ยน
    


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
    
        const handleClickTopic = (e:React.MouseEvent, id:string) =>{
            e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
            setTopicId(id)
        }



    
    // ฟังก์ชันเมื่อคลิกที่ "Top"
    const handleClickTop = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        setIsTop(true); // เปลี่ยนเป็น Top
    };
    
    // ฟังก์ชันเมื่อคลิกที่ "Latest"
    const handleClickLatest = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        setIsTop(false); // เปลี่ยนเป็น Latest
        
    };



    
    
    if (!topicId) {
        return <div>Loading...</div>; // รอให้ id โหลดมา
    }


  return (
    <>

        {topic.map((t) => (
            <header key={t._id} className="container max-w-8xl mx-auto mt-32 bg-[--second-DarkMidnight] shadow-md rounded-lg mb-6 p-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 px-8 ">
                    <div className="flex items-center space-x-6">
                        <i className={`${t.icon} text-5xl rounded-full text-gray-200`} ></i>
                        <div className="flex flex-col ">
                            <h2 className="text-white text-xl font-semibold">{t.name}</h2>
                            <code className="text-gray-400 text-md mb-2">{t.description}</code>
                        </div>
                    </div>
                    <button className={`${styles.btncusfol} text-sm md:text-base font-semibold text-center flex px-3 py-2 rounded-lg items-center`}>
                        <i className="fa-solid fa-bell mr-2 "></i> <span>Follow</span>
                    </button>
                </div>
                <div className="border-t border-gray-600 flex space-x-4 p-3 text-sm"></div>
            </header>
        ))}
       


        <div className="container mx-auto px-4 mt-8 ">
            <div className="flex flex-col lg:flex-row gap-6 justify-center">
                {/* <!-- Main Content  --> */}
        
                <div className="w-full  md:w-3/4">
                    {/* <!-- Topic Tabs --> */}
                    <div className="bg-[--second-DarkMidnight] rounded-t-lg border-b border-[--border-color]">
                        <div className="flex flex-wrap items-center justify-between p-6">
                            <div className="flex flex-wrap space-x-4">
                                <button className={`font-bold hover:text-primary text-base md:text-lg ${!isTop ? 'text-[--primary-color]': 'text-gray-500'}`}
                                        onClick={(e) => handleClickLatest(e, topicId)}>Latest</button>

                                <button className="flex flex-wrap space-x-2 text-base"
                                        onClick={(e) => handleClickTop(e, topicId)}>
                                    <span className={`font-bold hover:text-primary text-base md:text-lg ${isTop ? 'text-[--primary-color]': 'text-gray-500'}`}>Top</span>
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
                                {/* <!-- Community Card --> */}
                                <div className="p-6 rounded-lg bg-[--second-DarkMidnight]">
                                    {topic.map((t) => (
                                        <div key={t._id}>
                                            <h2 className="text-xl font-bold mb-3">{t.name}</h2>
                                            <p className="text-sm mb-4">{t.description}</p>
                                            <button className= "w-full text-center bg-[--primary-color] hover:bg-green-400 py-1 rounded text-sm text-[--second-DarkMidnight] font-semibold">
                                                Follow
                                            </button>
                                        </div>
                                    ))}

                                
                                </div>

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
                                                        <button onClick={(e)=> handleClickTopic(e,topiclist._id)}   key={topiclist._id}
                                                            className={`${styles.topicitem} px-3 py-2  w-full flex items-center`}>
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
  )
}
