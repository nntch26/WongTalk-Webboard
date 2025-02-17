const User = require("../models/userModel");
const moment = require("moment-timezone");

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('posts');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // เพิ่ม createdAt ใหอยู่ใน format ของ Bangkok
        const userProfile = {
            ...user.toObject(), // เปลี่ยนเป็นอ็อบเจ็กต์ธรรมดา
            createdAt: moment(user.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD"),
        };

        res.json(userProfile); // ส่งข้อมูลกลับไป
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const editProfile = async (req, res) => {
    const { fullname, username, email } = req.body;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // อัพเดตข้อมูลผู้ใช้
        user.fullname = fullname || user.fullname;
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getProfile, editProfile };
