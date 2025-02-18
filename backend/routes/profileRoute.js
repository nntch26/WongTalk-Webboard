const express = require("express");
const router = express.Router();
const {
    getProfile,
    editProfile,
    uploadImage,
    upload,
} = require("../controllers/profileController");
const { auth } = require("../middleware/auth");

router.get("/profile", auth, getProfile);
router.put("/profile", auth, editProfile);
router.post("/profile", auth, upload.single("image"), uploadImage);

module.exports = router;
