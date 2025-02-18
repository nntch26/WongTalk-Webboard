// routes/authRoute.js
const express = require("express");
const router = express.Router();
const { getAllTopic } = require("../controllers/topicController");


router.get("/getAllTopic", getAllTopic);


module.exports = router;
