const User = require("../models/userModel");
const moment = require("moment-timezone");


// get Profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("posts");
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
        console.log(userProfile)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// edit Profile
const editProfile = async (req, res) => {
    const { fullname, username, email, image } = req.body;
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
        user.image = image || user.image;
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



// upload Profileimage
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/wongtalk-app/public/uploads/"); // บันทึกไปที่ folder นี้
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

const uploadImage = async (req, res) => {
    const imageName = req.file.filename;
    try {
        const userId = req.user.id; // ดึง user id
        const user = await User.findById(userId); // หา user

        user.image = imageName; // update ข้อมูล
        await user.save(); // บันทึก

        res.status(200).json({
            message: "Image uploaded successfully",
            imageName: imageName,
        });
    } catch (error) {
        console.log("Upload error:", error);
        res.status(500).json({
            message: "Error uploading image",
            error: error.message,
        });
    }
};



module.exports = {
    getProfile,
    editProfile,
    uploadImage,
    upload
};
