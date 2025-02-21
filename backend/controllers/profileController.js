const User = require("../models/userModel");
const moment = require("moment-timezone");
const fs = require("fs").promises;

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

        // console.log(authToken);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getToken = async (req, res) => {
    const authToken = req.cookies.token;
    res.json(authToken)
}

// edit Profile
// const editProfile = async (req, res) => {
//     const { fullname, username, email, image } = req.body;
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.fullname = fullname || user.fullname;
//         user.username = username || user.username;
//         user.email = email || user.email;
//         user.image = image || user.image;
//         await user.save();

//         res.status(200).json({ message: "Profile updated successfully", user });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

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

// Edit Profile
const editProfile = async (req, res) => {
    try {
        const { fullname, username, email, fileOld } = req.body; // ดึงข้อมูลจาก req.body (ข้อความ)

        const userId = req.user.id; // ดึง user id
        const user = await User.findById(userId); // หา user ในฐานข้อมูล
        let imageName = req.file ? req.file.filename : user.image; // ถ้าไม่มีให้เป็น ชื่อเดิม

        if (fileOld && req.file && fileOld !== "default.png") {
            try {
                await fs.unlink(
                    "../frontend/wongtalk-app/public/uploads/" + fileOld
                );
                console.log("Remove success");
            } catch (err) {
                console.log("Error removing file:", err);
            }
        }

        user.fullname = fullname || user.fullname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.image = imageName || user.image;
        await user.save(); // บันทึกข้อมูลทั้งหมด

        res.status(200).json({
            message: "Profile updated successfully",
            // user: {
            //     fullname: user.fullname,
            //     username: user.username,
            //     email: user.email,
            //     image: user.image,
            // },
        });
    } catch (error) {
        console.log("Update profile error:", error);
        res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
};

module.exports = {
    getProfile,
    getToken,
    editProfile,
    upload,
};
