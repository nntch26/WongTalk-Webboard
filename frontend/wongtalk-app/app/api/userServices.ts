import axios from "axios";

export const getFollowTopic = async (userId: string) => {
    try {
        const respone = await axios.post('http://localhost:8000/api/showfollow', { userId: userId })
        return respone.data

    } catch (error) {
        console.error("Error fetching getFollowTopic:", error);
        throw error
    }
}