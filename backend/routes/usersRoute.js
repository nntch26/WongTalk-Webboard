// routes/userRoute.js
const express = require("express");
const router = express.Router();
const {
    getAllUser,
    getUser,
    followTopic,
    showFollow,
} = require("../controllers/userController");

router.get("/users", getAllUser);
router.get("/users/:id", getUser);
router.get("/showfollow", showFollow);

router.post("/follow", followTopic);

module.exports = router;
