
// api postServices.ts

import { Post, PostData } from "@/types/types";

import axios from "axios";

import { redirect } from "next/navigation";


// โพสทั้งหมด
export const fetchPost = async () => {

    try{
        const { data } = await axios.get<{ data: Post[] }>('http://localhost:8000/api/posts/')

        console.log("Post respone: " , data.data)
        return data.data


    }catch(error: any){
        console.log(error)
        return []

    }
    
}

// ฟังก์ชันดึงข้อมูลโพสล่าสุด
export const fetchPostNew = async () => {

    try{
        const { data } = await axios.get<{ data: Post[] }>('http://localhost:8000/api/posts/latest')

        // console.log("data: " , alldata.data)
        return data.data


    }catch(error: any){
        console.log(error)
        return []

    }
    
}

// ฟังก์ชันดึงข้อมูลยอดไลค์เยอะสุด
export const fetchPostTop = async () => {

    try{
        const { data } = await axios.get<{ data: Post[] }>('http://localhost:8000/api/posts/top')
        return data.data


    }catch(error: any){
        console.log(error)
        return []

    }
    
}


// Detail post แต่ละโพส
export const fetchPostDetail = async (postId:string) =>{
    try{
        const { data } = await axios.get<Post>(`http://localhost:8000/api/posts/${postId}`);
        console.log("post detail respone : ", data.data)
        return data.data


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


// router.delete("/posts/:id", auth, deletePost);
export const DeletePost = async (postId: string) => {
    try {
        const res = await axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true });
        // return res.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error; 
    }
    redirect("/profile")
};

// router.put("/posts/:id",auth, updatePost);
export const UpdatePost = async (postId: string) => {
    try {
        const res = await axios.put(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error; 
    }
};