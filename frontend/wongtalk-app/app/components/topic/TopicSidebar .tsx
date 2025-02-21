import React from 'react'
import { Topic } from '@/types/types'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { fetchTopics } from "@/app/api/topicServices";

import { useRouter } from 'next/navigation';

import styles from "../styles/Maincontent.module.css";



export default function TopicSidebar (topic : {topic:Topic}) {

    const [topicList, setTopicList] = useState<Topic[]>([]) 
    const router = useRouter();

    console.log(topic)
    const gettopic = topic.topic // ดึงชั้นข้อมูลจาก topic ที่ส่งมา

    const getTopics = async() =>{
        try{
            const getdata = await fetchTopics()
            setTopicList(getdata);
            console.log('Fetched topics:', getdata);

        }catch(error){
            console.error('Error fetching topics', error)
        }
    }

    const handleClickTopic = (e: React.MouseEvent, id:string, name:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/' + name);
       
        
    }



    useEffect(() => {
        getTopics()
    }, []);

  return (
    <>
     
        {/* <!-- Community Card --> */}
        <div className="p-6 rounded-lg bg-[--second-DarkMidnight]">
            <div key={gettopic._id}>
                <h2 className="text-xl font-bold mb-3">{gettopic.name}</h2>
                <p className="text-sm mb-4">{gettopic.description}</p>
                <button className= "w-full text-center bg-[--primary-color] hover:bg-green-400 py-1 rounded text-sm text-[--second-DarkMidnight] font-semibold">
                    Follow
                </button>
            </div>

        </div>

         
    </>
  )
}
