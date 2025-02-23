'use client';

import Link from "next/link";
import { Topic } from "@/types/types";

import { useRouter } from "next/navigation";

import styles from "../styles/Maincontent.module.css";


export default function TopicList({topic} : {topic:Topic}) {  
    const router = useRouter();


    const handleNavigate = (e: React.MouseEvent, id:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
       
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/')
    }


    return (
        <>
    
        <button onClick={(e) => handleNavigate(e, topic._id)}  key={topic._id}
        className={`${styles.topicitem} px-3 py-2  w-full flex items-center hover:scale-95 transition-all duration-500 ease-in-out`}>
            <i className={`${topic.icon} text-base md:text-l`}></i>
            <span className="text-xs md:text-sm text-center ml-2"> {topic.name}</span>
        </button>
            
    
        </>
    )

    

}
