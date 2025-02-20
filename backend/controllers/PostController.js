// controllers/postController.js
const User = require("../models/userModel");
const Post = require("../models/PostModel");
const Comment = require("../models/commentModel");
const Topic = require("../models/topicModel");

const moment = require("moment-timezone");

// ดึงข้อมูลทั้งหมด
const getAllPost = async (req, res) => {
    try {
        const allPosts = await Post.find()
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name icon" })
            .populate({ path: "userId", select: "fullname" })
            .lean();

        // สุ่มโพสต์
        const randomPosts = allPosts.sort(() => 0.5 - Math.random()); //.slice(0, 10);

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = randomPosts.map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        console.log(modifiedPosts);

        res.status(200).json({
            success: true,
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error...",
        });
    }
};

// ดึงโพสอันล่าสุด
const getLatestPost = async (req, res) => {
    try {
        const allPosts = await Post.find()
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name icon" })
            .populate({ path: "userId", select: "fullname" })
            .sort({ createdAt: -1 }) // เรียงจากใหม่ไปเก่า
            .lean();

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = allPosts.map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        console.log(modifiedPosts);

        res.status(200).json({
            success: true,
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error...",
        });
    }
};

// ดึงโพสมาแรงที่สุด
const getPostsTop = async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // ย้อนกลับไป 7 วัน

        const allPosts = await Post.find({ createdAt: { $gte: oneWeekAgo } })
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name icon" })
            .populate({ path: "userId", select: "fullname" })
            .sort({ likes: -1 }) // เรียงจากมากไปน้อย
            .lean(); // แปลงเป็น JSON object

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = allPosts.map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        console.log(modifiedPosts);

        res.status(200).json({
            success: true,
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// ค้นหาโพส
const Search = async (req, res) => {
    try {
        const { query } = req.query;
        console.log(query, "<= query");

        if (!query) {
            return res
                .status(400)
                .json({ message: "Please enter a search term." });
        }

        const allPosts = await Post.find()
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name icon" })
            .populate({ path: "userId", select: "fullname" })
            .lean(); // แปลงเป็น JSON object

        // กรองโพสต์ที่ตรงกับคำค้นหา
        const filteredPosts = allPosts.filter(
            (post) => post.title.match(new RegExp(query, "i")) // ค้นหาจาก titlesea
            // post.content.match(new RegExp(query, 'i')) // ค้นหาจาก content
        );

        // สุ่มโพสต์ 10 โพส
        const randomPosts = filteredPosts
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = randomPosts.map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        console.log(modifiedPosts);

        // ไม่มีคำที่ค้นหา หาไม่เจอ
        if (modifiedPosts.length === 0) {
            return res.status(404).json({
                message: "No posts found matching your search.",
            });
        }

        res.status(200).json({
            success: true,
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// ดึงข้อมูลโพสตาม topic
const getPostTopic = async (req, res) => {
    try {
        // const { topicName } = req.params;  // รับชื่อหัว URL parameter
        const { topicId } = req.body;

        console.log(topicId, "<= topicId");

        if (!topicId) {
            return res.status(400).json({ message: "Please enter a topicId." });
        }

        const posts = await Post.find({ topicId: topicId })
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name description icon" })
            .populate({ path: "userId", select: "fullname" })
            .sort({ createdAt: -1 }) // เรียงจากใหม่ไปเก่า
            .lean(); // แปลงเป็น JSON object

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = posts.map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        console.log(modifiedPosts);

        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found for this topic.",
            });
        }

        res.status(200).json({
            success: true,
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// โพสแต่ละ topic ที่มี like มากที่สุด
const getPostsTopInTopic = async (req, res) => {
    try {
        // const { topicName } = req.params;  // รับชื่อหัว URL parameter
        const { topicId } = req.body;

        console.log(topicId, "<= topicId");

        if (!topicId) {
            return res.status(400).json({ message: "Please enter a topicId." });
        }

        const posts = await Post.find({ topicId: topicId })
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name description icon" })
            .populate({ path: "userId", select: "fullname" })
            .sort({ likes: -1 }) // เรียงตามจำนวน likes มากที่สุด
            .limit(5) // จำกัดผลลัพธ์ 5 โพสต์
            .lean(); // แปลงเป็น JSON object

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = posts.map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        console.log(modifiedPosts);

        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found for this topic.",
            });
        }

        res.status(200).json({
            success: true,
            data: modifiedPosts,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getPostDetail = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        // ค้นหาตาม id

        const posts = await Post.findById(id)
            .select("title content likes commentCount createdAt")
            .populate({ path: "topicId", select: "name icon" })
            .populate({ path: "userId", select: "fullname" })
            .lean(); // แปลงเป็น JSON object

        // แปลงข้อมูลให้ `likes` และ `commentCount` เป็นตัวเลขที่ถูกต้อง
        const modifiedPosts = Array.of(posts).map((post) => ({
            ...post,
            likes: post.likes?.length || 0, // ถ้าไม่มี likes ให้เป็น 0
            commentCount: post.commentCount?.length || 0, // ถ้าไม่มี comments ให้เป็น 0
            time: moment(post.createdAt).tz("Asia/Bangkok").fromNow(),
            createdPost: moment(post.createdAt)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));

        if (!modifiedPosts) {
            return res.status(404).json({ message: "Post not found" });
        }

        // ดึงข้อมูลคอมเม้นโพสต์นี้
        const comments = await Comment.find({ postId: id }).populate(
            "userId",
            "fullname"
        ); // ใช้ populate เพื่อดึงข้อมูลผู้ใช้ด้วย
        console.log(comments);

        res.status(200).json({
            success: true,
            Post: modifiedPosts,
            allComments: comments,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error...",
        });
    }
};

// สร้างโพสใหม่
const createPost = async (req, res) => {
    try {
        const { title, content, userId, topicId } = req.body;

        // เช็คว่าข้อมูลทั้งหมดถูกส่งมาป่าว
        if (!title || !content || !userId || !topicId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // สร้างโพสต์ใหม่
        const newPost = new Post({ title, content, userId, topicId });

        // บันทึก
        const savedPost = await newPost.save();

        // อัปเดต User (เพิ่ม postId เข้าไปในฟิลด์ posts ของ user)
        const user = await User.findById(userId);

        if (user) {
            user.posts.push(savedPost._id);
            await user.save();
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // ส่งข้อมูลโพสต์กลับไป
        res.status(201).json({
            success: true,
            message: "Post created and added to user successfully.",
            data: savedPost,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error...",
        });
    }
};

// อัพเดทข้อมูล
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // ตรวจสอบว่า id มีค่าหรือไม่
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "Post ID is required" });
        }

        // ค้นหาและอัปเดตโพสต์
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content }, // ข้อมูลที่ต้องการแก้ไข
            { new: true } // คืนค่าโพสต์ที่อัปเดตแล้ว
        );

        if (!updatedPost) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// ลบข้อมูล
const deletePost = async (req, res) => {
    try {
        const { id } = req.params; // รับ id ของโพสต์จาก URL

        // ตรวจสอบว่า id มีค่าหรือไม่
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "Post ID is required" });
        }

        // ลบโพสต์จากฐานข้อมูล
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        // หาก User มีโพสต์ที่เกี่ยวข้อง ให้ลบออกจาก array `posts`
        await User.updateOne({ posts: id }, { $pull: { posts: id } });

        // ใช้ operator $pull เพื่อลบค่า id

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// กดไลค์
const likePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        console.log(userId);
        console.log(postId);

        // ค้นหาโพสต์
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // userId อยู่ใน array likes แล้วหรือยัง
        if (post.likes.includes(userId)) {
            // ถ้าเคยไลค์ -> ลบ userId ออกจาก likes
            post.likes = post.likes.filter(
                (like) => like.toString() !== userId
            );

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post unliked successfully",
                likesCount: post.likes.length,
            });
        }

        // ถ้ายังไม่เคยไลค์ -> เพิ่ม userId เข้าไปใน likes
        post.likes.push(userId);

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post liked successfully",

            likesCount: post.likes.length,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Error toggling like status",
        });
    }
};

module.exports = {
    Search,
    getPostTopic,
    getPostsTopInTopic,
    getAllPost,
    createPost,
    updatePost,
    deletePost,
    getPostDetail,
    likePost,
    getLatestPost,
    getPostsTop,
};
