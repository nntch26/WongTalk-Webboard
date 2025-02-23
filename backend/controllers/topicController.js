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


const getTopic = async (req, res) => {
    try {
        console.log("get topic backend: ", req.body)
        const { topicId } = req.body;

        const getTopic = await Topic.find({ _id: topicId }).select("name description icon");
            console.log("get topic backend: ", getTopic)
            res.status(200).json({
                success: true,
                data: getTopic,
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
    getTopic
};
