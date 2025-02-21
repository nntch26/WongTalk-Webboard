// api topicServices.ts

import { Topic} from "@/types/types";
import axios from "axios";



export const fetchTopics = async () => {

    try{
        const { data } = await axios.get<{ data: Topic[] }>('http://localhost:8000/api/getAllTopic')
        //{ "data": [ { "id": 1, "title": "Topic 1" }... ] }
        console.log("respone : ",data)

        // const alldata = await res.json()
        // console.log(data)
        return data.data


    }catch(error: unknown){
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
        console.log("fetch topic one: ", respone.data)
        return respone.data

    }catch (error:unknown){
        console.log(error)
        return[]
    }
}

// ดึงข้อมูลของโพส ที่ topic นี้
export const fetchPostTopic = async(topicId: string) =>{

    try{
        const respone = await axios.post('http://localhost:8000/api/topic',{ topicId:topicId })
        // ส่ง topic id ใน body
        console.log("fetch topic one: ", respone.data)
        return respone.data

    }catch (error:unknown){
        console.log(error)
        return[]
    }
}


// ดึงข้อมูลของโพส ที่ topic นี้ ยอดนิยม
export const fetchPostTopicTop = async(topicId: string) =>{

    try{
        const respone = await axios.post('http://localhost:8000/api/topic/top',{ topicId:topicId })
        // ส่ง topic id ใน body
        console.log("fetch topic one: ", respone.data)
        return respone.data

    }catch (error:unknown){
        console.log(error)
        return[]
    }
}