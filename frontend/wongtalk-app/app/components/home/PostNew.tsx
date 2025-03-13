"use client";
import React from "react";
import Link from "next/link";
import { Post } from "@/types/types";

import styles from "../styles/Maincontent.module.css";

export default function PostNew({newpost}: {newpost: Post[]}) {

    return (
        <>
            <div className="flex space-x-4 mb-4">
                <h6 className="text-green-400 border-b-2 border-green-400 pb-2">
                    New Posts
                </h6>
            </div>

            <div className="space-y-4 noscroll overflow-y-auto max-h-60">
                 {/* <!-- Post ใหม่ย่อยๆ --> */}
                {newpost.map((newpost) => (
                    <div key={newpost._id} className="flex items-center space-x-3 hover:scale-95 transition-all duration-500 ease-in-out noscroll overflow-y-auto max-h-96">
                        <img
                            src={`/uploads/${newpost.userId.image}`}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <Link href={`/detail/${newpost._id}`}>
                                <h3 className="text-white">{newpost.title}</h3>
                            </Link>
                            <p className="text-gray-400 text-sm">
                                {newpost.userId.fullname} replied {newpost.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        
        </>
    );
}
