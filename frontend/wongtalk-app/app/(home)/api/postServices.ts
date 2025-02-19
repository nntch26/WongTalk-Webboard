
// api postServices.ts

import { Post } from "@/types/types";
import axios from "axios";


export const fetchPost = async (): Promise<Post[]> => {

    try{
        const res = await fetch('http://localhost:8000/api/posts/')

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const alldata = await res.json()
        console.log("data: " , alldata.data)
        return alldata.data


    }catch(error: unknown){
        console.log(error)
        return []

    }
    
}


export const fetchPostNew = async (): Promise<Post[]> => {

    try{
        const res = await fetch('http://localhost:8000/api/posts/latest')

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const alldata = await res.json()
        console.log("data: " , alldata.data)
        return alldata.data


    }catch(error: unknown){
        console.log(error)
        return []

    }
    
}