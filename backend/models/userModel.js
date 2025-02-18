// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: "default.png",
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts", // โมเดล Post
        },
    ],

    followTopic: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic", // เชื่อมกับ Topic model
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const user = mongoose.model("User", UserSchema);

module.exports = user;
