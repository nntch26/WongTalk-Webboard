"use client";
import React from 'react'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { fetchPostNew } from "@/app/(home)/api/postServices";
import { Post } from "@/types/types";

import styles from "../styles/Maincontent.module.css";


export default function PostNew() {
    const [postsnew, setPostsnew] = useState<Post[]>([])

    useEffect (() =>{
        const getposts = async() =>{
                try{
                    const getdata = await fetchPostNew()
                    console.log("data ",getdata)
                    setPostsnew(getdata)
    
    
                }catch (error){
                    console.log('Error fetching ',error)
                }
            }
            getposts()

    }, []);


  return (
    <>
        {/* <!-- Post ใหม่ย่อยๆ --> */}
        {postsnew.map((postnew)=>(
            <div key={postnew._id} className="flex items-center space-x-3">
                <img src="user.png" alt="Avatar" className="p-1 w-10 rounded-f "/>
                <div>
                    <Link href="#">
                        <h3 className="text-white">{postnew.title}</h3>
                    </Link> 
                    <p className="text-gray-400 text-sm">{postnew.userId.fullname} replied {postnew.time}</p>
                </div>
            </div>

        ))}
        
    </>
  )
}
