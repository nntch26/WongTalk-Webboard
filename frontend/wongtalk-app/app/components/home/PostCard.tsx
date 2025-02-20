"use client";
import React from 'react'
import Link from "next/link";

import { Post } from "@/types/types";

import styles from "../styles/Maincontent.module.css";


export default function PostCard({ post }: { post: Post }) {
    
    console.log("PostCard",post)
    
    
    return(
        <>
        <div className={`${styles.postcard} rounded-xl p-4 mb-4`}>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        {/* <!-- User Info --> */}
                        <div className="flex items-center gap-3">
                            <img src="user.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="font-semibold text-sm md:text-base">{post.userId.fullname}</div>
                                <div className="text-gray-500 text-sm md:text-base">{post.time}</div>
                            </div>
                        </div>
                        
                        {/* <!-- Topic --> */}
                        <div className={`${styles.tagstopic} mt-2`}>
                            <Link href="#" className="flex flex-col text-xs md:text-md font-semibold">
                                <div className={`${styles.tag} h-10 p-3 flex items-center `}>
                                    <i className={`${post.topicId.icon} text-base mr-3`}></i>
                                    <span className="text-center">{post.topicId.name}</span>
                                </div>
                            </Link>
                        </div>
                    </div>


                    {/* <!-- ส่วนหัวข้อ และเนื้อหา --> */}
                    <div>
                        <h1 className={`${styles.posttitle} text-xl md:text-2xl`}>
                            <Link href='#'>{post.title}</Link>
                        </h1>
                    
                        <p className={`${styles.postcontent} text-sm md:text-base line-clamp-1`}>{post.content}</p>
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
    )

    


//     return (
//     <>
//         <div className={`${styles.postcard} rounded-xl p-4 mb-4`}>
//         { posts.map((post) =>(
//             <div key={post._id} className="flex flex-col gap-4">
//                 <div>
//                     <div className="flex justify-between items-center mb-2">
//                         {/* <!-- User Info --> */}
//                         <div className="flex items-center gap-3">
//                             <img src="user.png" alt="Avatar" className="w-10 h-10 rounded-full" />
//                             <div>
//                                 <div className="font-semibold text-sm md:text-base">{post.userId.fullname}</div>
//                                 <div className="text-gray-500 text-sm md:text-base">{post.time}</div>
//                             </div>
//                         </div>
                        
//                         {/* <!-- Topic --> */}
//                         <div className={`${styles.tagstopic} mt-2`}>
//                             <Link href="#" className="flex flex-col text-xs md:text-md font-semibold">
//                                 <div className={`${styles.tag} h-10 p-3 flex items-center `}>
//                                     <i className={`${post.topicId.icon} text-base mr-3`}></i>
//                                     <span className="text-center">{post.topicId.name}</span>
//                                 </div>
//                             </Link>
//                         </div>
//                     </div>


//                     {/* <!-- ส่วนหัวข้อ และเนื้อหา --> */}
//                     <div>
//                         <h1 className={`${styles.posttitle} text-xl md:text-2xl`}>
//                             <Link href="#" key={post._id}>{post.title}</Link>
//                         </h1>
                    
//                         <p className={`${styles.postcontent} text-sm md:text-base line-clamp-1`}>{post.content}</p>
//                     </div>
                    
                    
//                     {/* <!-- Actions (Likes & Comments) --> */}
//                     <div className="flex items-center gap-4 text-gray-400 mt-4">
//                         <button className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
//                             <i className="fa-solid fa-hands-clapping"></i>
//                             <span>{post.likes} Likes</span>
//                         </button>
//                         <button className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
//                             <i className="fa-regular fa-comment-dots"></i>
//                             <span>{post.commentCount} Comments</span>
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         ))}
            
//         </div>

       
    
//     </>
//   )
}
