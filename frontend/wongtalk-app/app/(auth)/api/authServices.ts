import axios from "axios";

// Login
export const login = async (email: string, password: string) => {
    const res = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        { withCredentials: true } // ส่ง cookie
    );
    return res.data;
};

// Register
export const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    const res = await axios.post("http://localhost:8000/api/register", {
        fullname,
        username,
        email,
        password,
        confirmPassword,
    });
    return res.data;
};

// Logout
export const logout = async () => {
    try {
        await axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true });
        return { success: true };
    } catch (error) {
        console.error("Logout failed", error);
        return { success: false, error };
    }
};
