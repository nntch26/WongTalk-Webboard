
"use client";
import React from 'react'
import { useRouter } from "next/navigation";

import { Post } from "@/types/types";

import styles from "../styles/Maincontent.module.css";


export default function TopicTag({post}:{post:Post}) {

    const router = useRouter()
    console.log("TopicTag",post)

    const handleNavigate = (e: React.MouseEvent, id:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
        
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/')
    }



return (
    <>
    <div className={`${styles.tagstopic} mt-2`}>
        <button onClick={(e) => handleNavigate(e, post.topicId._id)} className="flex flex-col text-xs md:text-md font-medium">
            <div className={`${styles.tag} h-10 p-3 flex items-center `}>
                <i className={`${post.topicId?.icon} text-base mr-3`}></i>
                <span className="text-center">{post.topicId?.name}</span>
            </div>
        </button>
    </div>
    </>
)
}
