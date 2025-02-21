'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { fetchTopics } from "@/app/api/topicServices";
import { Topic } from "@/types/types";

import { useRouter } from "next/navigation";

import styles from "../styles/Maincontent.module.css";


export default function TopicList() {  
    const [topics, setTopics] = useState<Topic[]>([]) 
    const router = useRouter();

    const getTopics = async() =>{
        try{
            const getdata = await fetchTopics()
            setTopics(getdata);
            console.log('Fetched topics:', getdata);

        }catch(error){
            console.error('Error fetching topics', error)
        }
    }

    const handleNavigate = (e: React.MouseEvent, id:string, name:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
       
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/')
    }



    useEffect(() => {
        getTopics()
    }, []);

    return (
        <>
            {topics.map((topic) => (
                <button onClick={(e) => handleNavigate(e, topic._id, topic.name)}  key={topic._id}
                className={`${styles.topicitem} px-3 py-2  w-full flex items-center`}>
                    <i className={`${topic.icon} text-base md:text-l`}></i>
                    <span className="text-xs md:text-sm text-center ml-2"> {topic.name}</span>
                </button>
            ))}
            
    
        </>
    )

    

}
