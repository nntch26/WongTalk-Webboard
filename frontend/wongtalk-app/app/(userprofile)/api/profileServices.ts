import axios from "axios";


// แสดงโปรไฟล์
export const getProfile = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/profile", { withCredentials: true })
        return res.data
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error
    }
}

// แก้ไขข้อมูลโปรไฟล์
export const editProfile = async (data: FormData) => {
    try {
        const res = await axios.post("http://localhost:8000/api/profile", data, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};