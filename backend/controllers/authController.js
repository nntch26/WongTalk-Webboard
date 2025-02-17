const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();


// register
const register = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmPassword } =
            req.body;

        // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // ตรวจสอบว่า email หรือ username มีอยู่ในระบบแล้วหรือไม่
       
        const existingUser = await User.findOne({
            $or: [{ email }, { username }] // ค้นหาจาก email หรือ username
          });
      
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash รหัสผ่านก่อนบันทึก
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // สร้าง user ใหม่
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // หาว่ามี email ในฐานข้อมูลรึป่าว
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // สร้าง JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // set token ไปที่ cookie
        res.cookie("token", token, {
            maxAge: 3600000, // 1 ชั่วโมง
            secure: true, // cookie จะถูกส่งผ่านเฉพาะเมื่อใช้ HTTPS เท่านั้น
            httpOnly: true, // cookie ไม่สามารถเข้าถึงได้จาก JavaScript ฝั่งไคลเอนต์
            sameSite: "none", // อนุญาตให้ส่ง cookie ระหว่างโดเมน (cross-site)
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Logout
const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
}





module.exports = {
    register,    
    login,
    logout
};
