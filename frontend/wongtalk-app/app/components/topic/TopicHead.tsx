import React from 'react'
import { Topic } from '@/types/types'
import styles from "@/app/components/styles/Maincontent.module.css";



export default function TopicHead({topic}: {topic: Topic}) {
  return (
    <>
    <header className="container max-w-8xl mx-auto mt-32 bg-[--second-DarkMidnight] shadow-md rounded-lg mb-6 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 px-8">
        <div className="flex items-center space-x-6 hover:scale-110 transition-all duration-500 ease-in-out">
            <i className={`${topic.icon} text-5xl rounded-full text-gray-200`} />
            <div className="flex flex-col">
            <h2 className="text-white text-xl font-semibold">{topic.name}</h2>
            <code className="text-gray-400 text-md mb-2">{topic.description}</code>
            </div>
        </div>
        <button className={`${styles.btncusfol} text-sm md:text-base font-semibold text-center flex px-3 py-2 rounded-lg items-center`}>
            <i className="fa-solid fa-bell mr-2"></i> <span>Follow</span>
        </button>
        </div>
        <div className="border-t border-gray-600 flex space-x-4 p-3 text-sm"></div>
    </header>
    </>
  )
}
