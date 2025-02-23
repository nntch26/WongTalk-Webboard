import { Comment, CommentData} from "@/types/types";
import axios from "axios";


// สร้างคอมเมม้นใหม่
export const AddComment = async (newdata:CommentData) => {

    try{
        const res = await axios.post('http://localhost:8000/api/comments/', newdata, { withCredentials: true })
        // withCredentials: true ดึง Token จาก Cookies อัตโนมัติ
        console.log("respone : ",res)
        console.log("Comment added successfully:", res);

        return res


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error adding Comment:", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}

