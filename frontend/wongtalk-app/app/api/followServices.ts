import axios from "axios"


export const followTopic = async (userId:string, topicId:string) => {
    try {
        const res = await axios.post("http://localhost:8000/api/follow", {userId, topicId}, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error("Error Follow Topic:", error);
        throw error
    }
}