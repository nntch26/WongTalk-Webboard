// controllers/commentController.js
const User = require("../models/userModel");
const Post = require("../models/PostModel");
const Comment = require("../models/commentModel");

// เพิ่มคอมเม้น
const addComment = async (req, res) => {
    try {

        const { postId, content } = req.body;
        const userId = req.user.id;

        console.log("backend add comment:",userId )
        console.log("backend add comment:",postId, content )

        // สร้างคอมเม้นต์ใหม่
        const newComment = new Comment({
            postId,
            userId,
            content,
        });

        // บันทึก
        await newComment.save();

        // อัพเดตจำนวนคอมเม้นต์ในโพสต์
        await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: newComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error adding comment",
        });
    }
};

// แก้ไขคอมเม้น
const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        //หาคอมเม้นจาก id
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // ตรวจสอบว่า userId ตรงกับเจ้าของคอมเม้นป่าว
        if (!comment.userId.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this comment",
            });
        }

        // อัพเดทเนื้อหา
        comment.content = content || comment.content;
        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating comment",
        });
    }
};

// ลบคอมเม้น
const deleteComment = async (req, res) => {
    try {
        const { commentId , postId} = req.params;
        const userId = req.user.id;

        console.log("backend delete comment:",userId, commentId )


        // ค้นหาคอมเม้นนั้น
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // ตรวจสอบว่า userId ตรงกับเจ้าของคอมเม้นต์หรือไม่
        if (!comment.userId.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment",
            });
        }

        // ลบคอมเม้นต์
        await comment.deleteOne();

        // อัพเดตจำนวนคอมเมนต์ในโพสต์
        await Post.findByIdAndUpdate(postId, { $inc: { commentCount: -1 } });

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Error deleting comment",
        });
    }
};

module.exports = {
    addComment,
    deleteComment,
    editComment,
};
