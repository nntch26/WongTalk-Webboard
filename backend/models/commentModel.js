// models/Comment.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // เชื่อมกับ Post model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // เชื่อมกับ User model
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const comment = mongoose.model("Comment", CommentSchema);
module.exports = comment;
