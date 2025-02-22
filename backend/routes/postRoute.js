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
const { auth } = require("../middleware/auth");

// ค้นหา
router.get("/search", Search);

router.get("/posts", getAllPost);
router.get("/posts/latest", getLatestPost);
router.get("/posts/top", getPostsTop);

router.post("/topic", getPostTopic);
router.post("/topic/top", getPostsTopInTopic);

router.get("/posts/:id", getPostDetail);

// กดไลค์
router.put("/posts/reactions", likePost);

// เพิ่ม ลบ แก้ไข
router.post("/posts",auth, createPost);

router.put("/posts/:id",auth, updatePost);
router.delete("/posts/:id",auth, deletePost);

module.exports = router;
