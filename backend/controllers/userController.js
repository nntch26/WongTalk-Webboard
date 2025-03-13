// controllers/productController.js
const User = require("../models/userModel");
const Post = require("../models/PostModel");
const Topic = require("../models/topicModel");

// ดึงข้อมูลทั้งหมด
const getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find(); //ดึงข้อมูลทั้งหมด
        res.status(200).json({
            success: true,
            data: allUsers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error...",
        });
    }
};

// ดึงข้อมูลตัวเดียว บางตัว
const getUser = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        // ค้นหาตาม id
        const user = await User.findById(id).populate("posts");
        // ใช้ populate เพื่อดึงข้อมูล post ที่เชื่อมโยงกับ User

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Error fetching..",
        });
    }
};


// ติดตาม topic
const followTopic = async (req, res) => {
    try {
        const { userId, topicId } = req.body;

        // ค้นหาผู้ใช้
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // เช็คว่าผู้ใช้ติดตาม topic ยัง ถ้ายัง
        if (!user.followTopic.includes(topicId)) {
            user.followTopic.push(topicId); // เพิ่ม topicId ลงใน array
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Topic followed successfully",
            });
        } else {
            // ติดตามแล้ว ก้ลบ topicId ออกจาก followTopic
            user.followTopic = user.followTopic.filter(
                (catId) => catId.toString() !== topicId.toString()
            );
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Topic unfollowed successfully",
            });
        }
    } catch (error) {
        console.error("Error following topic:", error);
        return { success: false, message: "Error following topic" };
    }
};

// แสดง topic ที่ติดตาม
const showFollow = async (req, res) => {
    try {
        const { userId } = req.body;

        // เช็คมี userId หรือไม่
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // ค้นหาผู้ใช้ และดึงข้อมูล topic ที่ติดตาม
        const user = await User.findById(userId).populate("followTopic");

        // ส่ง topic ติดตามกลับไป
        res.status(200).json({
            message: "Followed topics retrieved successfully",
            topics: user.followTopic || [],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllUser,
    getUser,
    followTopic,
    showFollow,
};
