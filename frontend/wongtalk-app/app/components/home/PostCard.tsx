"use client";
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Post } from "@/types/types";

import styles from "../styles/Maincontent.module.css";
import TopicTag from '../topic/TopicTag';


export default function PostCard({ post }: { post: Post }) {

    const router = useRouter();
    console.log("PostCard",post)

    const handleNavigate = (e: React.MouseEvent, id:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
       
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/')
    }

    
    
    return (
        <>
        <div className={`${styles.postcard} rounded-xl p-4 mb-4 `}>
            <div className="flex flex-col gap-4 ">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        {/* <!-- User Info --> */}
                        <div className="flex items-center gap-3">
                            <img src={`/uploads/${post.userId.image}`} alt="Avatar" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-sm md:text-base">{post.userId.fullname}</div>
                                <div className="text-gray-500 text-sm md:text-md">{post.time}</div>
                            </div>
                        </div>
                        
                      {/* <!-- Topic tag--> */}
                      <TopicTag key={post.topicId._id} post={post} />
                      
                    </div>


                        {/* <!-- ส่วนหัวข้อ และเนื้อหา --> */}
                        <div>
                            <h1 className={`${styles.posttitle} text-xl md:text-2xl mb-2`}>
                                <Link href={`/detail/${post._id}`}>{post.title}</Link>
                            </h1>

                            <p className={`${styles.postcontent} text-sm md:text-base line-clamp-1`}>
                                {post.content}
                            </p>
                        </div>

                        {/* <!-- Actions (Likes & Comments) --> */}
                        <div className="flex items-center gap-4 text-gray-400 mt-4">
                            <button className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
                                <i className="fa-solid fa-hands-clapping"></i>
                                <span>{post.likes} Likes</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
                                <i className="fa-regular fa-comment-dots"></i>
                                <span>{post.commentCount} Comments</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
