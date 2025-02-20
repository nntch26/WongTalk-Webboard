// models/topic.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TopicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // ไม่ซ้ำ
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const topic = mongoose.model("Topic", TopicSchema);
module.exports = topic;
