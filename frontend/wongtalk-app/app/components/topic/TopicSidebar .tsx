"use client"
import React from 'react'
import { Topic } from '@/types/types'
import styles from "../styles/Maincontent.module.css"
import FollowButton from '../followButton';
import { useState } from 'react';

export default function TopicSidebar (
    {topic, topiclist, onClickTopic} : {
        topic:Topic, 
        topiclist:Topic[] ,
        onClickTopic: (e: React.MouseEvent, id: string) => void;
    }
) {

    console.log(topic, topiclist, onClickTopic)

    const [selected, setSelected] = useState<{[key: string] : boolean}>({})
    const [error, setError] = useState<string | null>(null)
    
    const handleFollowChange = (topicId: string) => {
        setSelected((prev) => ({
            ...prev,
            [topicId]: !prev[topicId],
        }));
        if (error) setError(null)
    };

  return (
    <>
    {/* <!-- Right Sidebar --> */}
    <div className="max-h-max w-full md:w-1/4 hidden md:block">
        <div className="space-y-4">
            <div>
                <div className="hidden lg:block space-y-4">
                    {/* <!-- Community Card --> */}
                    <div className=" p-6 rounded-lg bg-[--second-DarkMidnight]">
                        <div key={topic._id} className="flex flex-col items-center text-center">
                            <h2 className="text-xl font-bold mb-3">{topic.name}</h2>
                            <p className="text-sm mb-4">{topic.description}</p>
                            <FollowButton topicId={topic._id} onFollowChange={handleFollowChange} />
                        </div>

                    </div>

                    {/* <!-- Other Topics Card --> */}
                    <div className="p-4 rounded-lg bg-[--second-DarkMidnight]">
                        <div className="max-h-max w-full ">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-bold text-[--primary-color]">Other Topics</span>
                                        <span className="text-text"><i className="fa-solid fa-bars-staggered"></i></span>
                                    </div>

                                    <div className="space-y-2 overflow-y-auto max-h-60 pr-2">
                                        {topiclist.map((topiclist)=>(
                                            <button onClick={(e)=>onClickTopic(e, topiclist._id)} key={topiclist._id}
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
    </>
  )
}
