// models/post.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // เชื่อมกับ User model
        required: true,
    },

    topicId: {
        type: mongoose.Schema.Types.ObjectId, // เชื่อมกับ topic model
        ref: "Topic",
        required: true,
    },

    commentCount: {
        // นับคอมเม้น
        type: Number,
        default: 0,
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // เชื่อมโยงกับ User
        },
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;
