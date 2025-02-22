
// api postServices.ts

import { Post } from "@/types/types";
import { PostData } from "@/types/types";

import axios from "axios";


// โพสทั้งหมด
export const fetchPost = async (): Promise<Post[]> => {

    try{
        const res = await fetch('http://localhost:8000/api/posts/')

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const alldata = await res.json()
        console.log("data: " , alldata.data)
        return alldata.data


    }catch(error: any){
        console.log(error)
        return []

    }
    
}

// ฟังก์ชันดึงข้อมูลโพสล่าสุด
export const fetchPostNew = async (): Promise<Post[]> => {

    try{
        const res = await fetch('http://localhost:8000/api/posts/latest')

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const alldata = await res.json()
        // console.log("data: " , alldata.data)
        return alldata.data


    }catch(error: any){
        console.log(error)
        return []

    }
    
}

// ฟังก์ชันดึงข้อมูลยอดไลค์เยอะสุด
export const fetchPostTop = async (): Promise<Post[]> => {

    try{
        const res = await fetch('http://localhost:8000/api/posts/top')

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const alldata = await res.json()
        // console.log("data: " , alldata.data)
        return alldata.data


    }catch(error: any){
        console.log(error)
        return []

    }
    
}


// สร้างโพสใหม่
export const AddPost = async (newdata:PostData) => {

    try{
        const res = await axios.post('http://localhost:8000/api/posts/', newdata, { withCredentials: true })
        // withCredentials: true ดึง Token จาก Cookies อัตโนมัติ
        console.log("respone : ",res)
        console.log("Post added successfully:", res);

        return res


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error adding post:", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}
