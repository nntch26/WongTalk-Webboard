// routes/authRoute.js
const express = require("express");
const router = express.Router();
const { getAllTopic, getTopic } = require("../controllers/topicController");


router.get("/getAllTopic", getAllTopic);
router.post("/getTopic", getTopic);


module.exports = router;
