const express = require("express");
const router = express.Router();
const {
    getProfile,
    getToken,
    editProfile,
    upload,
} = require("../controllers/profileController");
const { auth } = require("../middleware/auth");

router.get("/profile", auth, getProfile);
router.get("/gettoken", getToken);
router.post("/profile", auth, upload.single("image"), editProfile);

module.exports = router;
