"use client";

import React from 'react'
import Navbar from '@/app/components/Navbar'
import styles from "@/app/components/styles/Navbar.module.css";
import stylesp from "@/app/components/styles/Maincontent.module.css";

import { useState, useEffect } from 'react';
import { AddPost } from '@/app/api/postServices';
import { getToken } from '@/app/api/profileServices';

import {useRouter} from 'next/navigation';

export default function page() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [error, setError] = useState<string>("");

    const router = useRouter()


    // เช็คว่า user login หรือไม่
    const checkUserLogged = async () => {

        
        const loggedIn = await getToken(); 
        
        if (!loggedIn) {
            // ไม่สามารถสร้างโพสได้ถ้า user ยังไม่ login
            console.log("User is not logged in. Please log in first.");

            router.push('/login'); // เด้งไปหน้า login'
            return; 
        }

    }
    

    // สร้างโพส
    const createPost = async () => {
        
        try {
            const postData = new FormData();
            postData.append('title', title);
            postData.append('content', content);
            postData.append('topicId', topic);

            const savedata  = await AddPost(postData)
            // ถ้าสร้างได้
            if(savedata){
                console.log('Post successfully created:');
                setTitle("");
                setContent("");
                setTopic("");
            }
            

        } catch (error) {
            console.error('Error creating post:', error);
            router.push('/login'); // เด้งไปหน้า login'
        }
    };

    
    


    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        // เช็คก่อนว่า มีค่าป่าว
        if (!title || !content || !topic) {
            setError("Please fill in all fields.");
            return;
        }

        await createPost()
    }

    useEffect(()=>{
        checkUserLogged()
    }, [])



  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto p-4 mt-24">
        {/* <!-- Header Section --> */}
        <header className="flex items-center justify-between mb-2">
            <h1 className="text-xl md:text-4xl font-bold">Create Post</h1>

            <div className="flex flex-row-reverse md:hidden">
               
                <button className="px-4 py-2 rounded-lg bg-[#01F681] text-[#080E13] font-medium hover:opacity-90 transition-opacity">
                    Post
                </button>
            </div>
            
        </header>

        {error && (<div className="error text-red-500">{error}</div>) }

        <div className=" lg:grid-cols-3 gap-6 mb-5 p-4">
            {/* <!-- ส่วนเขียนโพส --> */}
            <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="lg:col-span-2 space-y-6">
                    <div className='bg-[--second-DarkMidnight] rounded-lg p-4'>

                    {/* <!-- Title Input --> */}
                        <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Post title" 
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`${stylesp.placeholder} ${stylesp.inputfocus} 
                            w-full px-4 py-6 bg-[--second-DarkMidnight] border-b-2 border-[rgba(255,255,255,0.1)] rounded-lg text-lg`}
                            maxLength={300}/>

                            <textarea 
                                placeholder="Write your post content here..." 
                                value={title || ''}
                                onChange={(e) => setContent(e.target.value)}
                                className={`${stylesp.inputfocustext} w-full px-4 py-3 bg-[--second-DarkMidnight] border border-[rgba(255,255,255,0.1)] rounded-lg min-h-[300px]`}
                            ></textarea>
                        </div>
                    
                    </div>

                
                    {/* <!-- Tags Input --> */}
                    <div className="space-y-2 p-4 bg-[#0F151A] rounded-lg border border-[rgba(255,255,255,0.1)]">
                        <h3 className="text-l md:text-xl font-bold text-[#E8E9EA] mb-3">Choose Topic</h3>
                        <select 
                            className={`${stylesp.inputfocustopic} w-full px-4 py-3 bg-[#191C24] border border-[rgba(255,255,255,0.1)] rounded-lg `}
                            value={topic || ''}  
                            onChange={(e) => setTopic(e.target.value)} 
                        >
                            <option value="" disabled className="text-[#888]">Select a community</option>
                            <option value="community1" className="bg-[--hover-DarkCharcoal] p-2">Community 1</option>
                            <option value="community2" className="bg-[--hover-DarkCharcoal] p-2">Community 2</option>
                            <option value="community3" className="bg-[--hover-DarkCharcoal] p-2">Community 3</option>
                        </select>
                    </div>


                    <div className="flex flex-row-reverse hidden md:flex">
                    
                        <button type="submit" className={`${styles.btncus} text-center md:flex px-4 py-2 rounded-lg items-center font-semibold`}>
                            Post
                        </button>
                        <button className="mr-3 px-4 py-2 font-semibold rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-[#515869] ">
                            Save Draft
                        </button>
                    </div>

                </div>
            </form>
                       
        </div>
    </div>
        
    </>
  )
}
