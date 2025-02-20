const Topic = require("../models/topicModel");

const getAllTopic = async (req, res) => {
    try {
        const allTopic = await Topic.find().select("name description icon");

        res.status(200).json({
            success: true,
            data: allTopic,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error...",
        });
    }
};

module.exports = {
    getAllTopic,
};
