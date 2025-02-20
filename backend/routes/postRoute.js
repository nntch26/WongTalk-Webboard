// routes/postRoute.js
const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/PostController");

// ค้นหา
router.get("/search", Search);

router.get("/posts", getAllPost);
router.get("/posts/latest", getLatestPost);
router.get("/posts/top", getPostsTop);

router.get("/t/:topicName", getPostTopic);
router.get("/t/:topicName/top", getPostsTopInTopic);

router.get("/posts/:id", getPostDetail);

// กดไลค์
router.put("/posts/reactions", likePost);

// เพิ่ม ลบ แก้ไข
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

module.exports = router;
