// api topicServices.ts

import { Topic} from "@/types/types";
import axios from "axios";


export const fetchTopics = async (): Promise<Topic[]> => {

    try{
        const res = await fetch('http://localhost:8000/api/getAllTopic')

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const alldata = await res.json()
        console.log(alldata.data)
        return alldata.data


    }catch(error: unknown){
        console.log(error)
        return []

    }
    
}