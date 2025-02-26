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


// ลบคอมเมม้น
export const DeleteComment = async (commentId:string, postId:string) => {

    try{
        const res = await axios.delete(`http://localhost:8000/api/comments/${commentId}/${postId}`,{ withCredentials: true })
        // withCredentials: true ดึง Token จาก Cookies อัตโนมัติ
        console.log("respone : ",res)
        console.log("Comment delete successfully:", res);

        return res


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error delete Comment:", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}

// แก้ไขคอมเมม้น
export const EditComment = async (commentId:string, editdata:CommentData) => {

    try{
        console.log("commentId edit comment : ",commentId)
        const res = await axios.put(`http://localhost:8000/api/comments/${commentId}/`,editdata, { withCredentials: true })
        // withCredentials: true ดึง Token จาก Cookies อัตโนมัติ
        console.log("respone : ",res)
        console.log("Comment edit comment successfully:", res);

        return res


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error edit Comment:", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}

