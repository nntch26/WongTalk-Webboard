// api topicServices.ts

import { Topic} from "@/types/types";
import axios from "axios";


// ดึง topic หลายๆอัน
export const fetchTopics = async () => {

    try{
        const { data } = await axios.get<{ data: Topic[] }>('http://localhost:8000/api/getAllTopic')
        //{ "data": [ { "id": 1, "title": "Topic 1" }... ] }
        console.log("Topics respone : ",data)

        return data.data


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        }
        return []; // ป้องกัน undefined 

    }
    
}


// ดึงข้อมูล topic ตัวเดียว
export const fetchTopic = async(topicId: string) =>{

    try{
        const respone = await axios.post('http://localhost:8000/api/getTopic',{ topicId:topicId })
        // ส่ง topic id ใน body
        console.log("fetch topic one respone : ", respone.data)
        return respone.data

    }catch (error:any){
        console.log(error)
        return[]
    }
}

// ดึงข้อมูลของโพส ที่ topic นี้
export const fetchPostTopic = async(topicId: string) =>{

    try{
        console.log("api topic to backend:", topicId)
        const respone = await axios.post('http://localhost:8000/api/topic',{ topicId:topicId })
        // ส่ง topic id ใน body
        console.log("Post topic respone : ", respone.data)
        return respone.data

    }catch (error:any){
        console.log(error)
        return[]
    }
}


// ดึงข้อมูลของโพส ที่ topic นี้ ยอดนิยม
export const fetchPostTopicTop = async(topicId: string) =>{

    try{
        const respone = await axios.post('http://localhost:8000/api/topic/top',{ topicId:topicId })
        // ส่ง topic id ใน body
        console.log("Post topic Toprespone : ", respone.data)
        return respone.data

    }catch (error:any){
        console.log(error)
        return[]
    }
}