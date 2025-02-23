import React from 'react'
import { Topic } from '@/types/types'

export default function TopicSidebar (topic : {topic:Topic}) {

    console.log(topic)
    const gettopic = topic.topic // ดึงชั้นข้อมูลจาก topic ที่ส่งมา

  return (
    <>
     
        {/* <!-- Community Card --> */}
        <div className="p-6 rounded-lg bg-[--second-DarkMidnight]">
            <div key={gettopic._id}>
                <h2 className="text-xl font-bold mb-3">{gettopic.name}</h2>
                <p className="text-sm mb-4">{gettopic.description}</p>
                {/* <button className= "w-full text-center bg-[--primary-color] hover:bg-green-400 py-1 rounded text-sm text-[--second-DarkMidnight] font-semibold">
                    Follow
                </button> */}
            </div>

        </div>

         
    </>
  )
}
