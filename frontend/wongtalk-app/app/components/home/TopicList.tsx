'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { fetchTopics } from "@/app/(home)/api/topicServices";
import { Topic } from "@/types/types";

import styles from "../styles/Maincontent.module.css";


export default function TopicList() {  
    const [topics, setTopics] = useState<Topic[]>([])

    useEffect(() => {
        const getTopics = async() =>{
            try{
                const getdata = await fetchTopics()
                setTopics(getdata);
                // console.log('Fetched topics:', getdata);

            }catch(error){
                console.error('Error fetching topics', error)
            }
        }

        getTopics()
    }, []);

    return (
        <>
            <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap">
                <button className="px-3 py-2 bg-gray-800 text-white rounded-lg  text-sm">All</button>
                {topics.map((topic) => (
                    <Link href="#" key={topic._id} className={`${styles.topicitem} px-3 py-2  w-full flex items-center`}>
                        <i className={`${topic.icon} text-base md:text-l`}></i>
                        <span className="text-xs md:text-sm text-center ml-2"> {topic.name}</span>
                    </Link>
                ))}
                
            </div>    
    
        </>
    )

    

}
