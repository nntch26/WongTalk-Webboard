"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchPostNew } from "@/app/api/postServices";
import { Post } from "@/types/types";

import styles from "../styles/Maincontent.module.css";

export default function PostNew() {
    const [postsnew, setPostsnew] = useState<Post[]>([]);

    useEffect(() => {
        const getposts = async () => {
            try {
                const getdata = await fetchPostNew();
                console.log("data ", getdata);
                setPostsnew(getdata);
            } catch (error) {
                console.log("Error fetching ", error);
            }
        };
        getposts();
    }, []);

    return (
        <>
            {/* <!-- Post ใหม่ย่อยๆ --> */}
            {postsnew.map((postnew) => (
                <div key={postnew._id} className="flex items-center space-x-3 hover:scale-95 transition-all duration-500 ease-in-out">
                    <img
                        src={`/uploads/${postnew.userId.image}`}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <Link href="#">
                            <h3 className="text-white">{postnew.title}</h3>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            {postnew.userId.fullname} replied {postnew.time}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}
