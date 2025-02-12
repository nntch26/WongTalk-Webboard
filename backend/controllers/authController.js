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
            return res.status(400).json({ message: "Email Or Username already exists" });
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
        const { email, username, password } = req.body;

        // ตรวจสอบว่า user กรอก email หรือ username
        let query = {};

        if (email) {

            query.email = email;

        } else if (username) {

            query.username = username;

        } else {
            return res
                .status(400)
                .json({ message: "Email or username is required" });
        }

        // ค้นหา user
        const user = await User.findOne(query);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username/email or password" });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Invalid username/email or password" });
        }

        // สร้าง JWT Token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.status(200).json({ token, user });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};





module.exports = {
    register,    
    login

};
  