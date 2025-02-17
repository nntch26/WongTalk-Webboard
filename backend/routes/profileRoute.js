const express = require("express");
const router = express.Router();
const { getProfile, editProfile } = require("../controllers/profileController")
const { auth } = require("../middleware/auth")

router.get('/profile',auth, getProfile)
router.put('/profile',auth, editProfile)



module.exports = router;