"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import { Post } from '@/types/types'
import { fetchTopic } from '@/app/api/topicServices'

export default function page({ params }: { params: Promise<{ id: string }> }) {

    const [postTopic, setPostTopic] = useState<Post[]>([])
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        // รอให้ Promise resolve แล้วดึงค่าของ id
        params.then((resolved) => {
            getTopic(resolved.id);  //ส่ง id เข้าฟังก์ชันดึงข้อมูล
            setId(resolved.id); // set id จาก resolved 
            console.log(resolved.id); 
        });
    }, [params]);

   
    // ดึงข้อมูบ topic ตาม id 
    const getTopic = async(topic_Id:string) =>{
        try{
            const respone = await fetchTopic(topic_Id)
            console.log("topic:",respone.data)
            setPostTopic(respone.data)


        }catch(error){
            console.log(error)
        }

    }


    
    if (!id) {
        return <div>Loading...</div>; // รอให้ id โหลดมา
    }


  return (
    <>
         {/* <!-- Header Section --> */}
    {postTopic && postTopic.length > 0 ?(
        postTopic.map((posttopic) => (
        <header key={posttopic._id} className="relative h-64 rounded-lg overflow-hidden">


            
            {/* <!-- <img src="https://www.manga-news.com/public/images/univers/naruto-univers-header.webp" alt="Header Image" className="w-full h-full object-cover"> --> */}
            {/* <!-- Overlay --> */}
            <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
            
            {/* <!-- Content --> */}
            <div className="absolute inset-0 flex flex-row lg:flex-col  gap-6 justify-center items-center text-center p-4 mt-20">

                <div className="flex flex-col p-4">
                    <h1 className="text-xl md:text-5xl font-extrabold mb-4">{posttopic.topicId.name}</h1>
                    <p className="text-xs md:text-xl max-w-2xl">
                    {posttopic.topicId.description}
                    </p>
                </div>
                
                <button className="m-4 bg-green-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition md:hidden">
                    Follow
                </button>
            </div>
        </header>



        ))
    ): (
        <p>No topics found.</p>
    )}
    </>
  )
}
