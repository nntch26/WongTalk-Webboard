// routes/userRoute.js
const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUser,
  followTopic
  
} = require("../controllers/userController");


router.get("/users", getAllUser);
router.get("/users/:id", getUser);


router.post("/follow", followTopic);



module.exports = router;