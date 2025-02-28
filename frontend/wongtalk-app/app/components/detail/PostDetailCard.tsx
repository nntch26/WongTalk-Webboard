import React from 'react'
import ReactionButton from '../home/ReactionButton'
import TopicTag from '../topic/TopicTag'
import { Post } from '@/types/types'



export default function PostDetailCard({post}: {post: Post}) {
    return (
        <>
        <div className="bg-[--second-DarkMidnight] rounded-xl p-4 lg:p-8 mb-4">
            {/* <!-- profile --> */}
            <div className="flex items-start mb-6">
                <div className="w-full">
                    <div className="flex items-center gap-3">
                        <img src={`/uploads/${post.userId.image}`} alt="Avatar" className="w-10 h-10 rounded-full" />
                        <div>
                            <div className="text-sm md:text-base text-[--primary-color]">{post.userId.fullname}</div>
                            <div className="text-gray-500 text-sm md:text-md">{post.time}</div>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* <!-- content post --> */}
            <div className="mb-3 text-while">
                <h1 className="text-xl md:text-4xl font-bold mb-3">{post.title}</h1>
                {/* <!-- Topic tag--> */}
                <TopicTag key={post.topicId._id} post={post} />
    
                <p className="text-xs md:text-base">{post.content} </p>
            
            </div>
    
            {/* <!-- Actions (Likes & Comments) --> */}
            <ReactionButton key={post._id} post={post}/>
            
            <hr className="border-0 h-px bg-gray-800 rounded-xl my-2 w-full mx-auto" />
    
        </div>
        </>
    )
}
