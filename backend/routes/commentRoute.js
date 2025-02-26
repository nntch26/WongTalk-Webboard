
const express = require('express');
const router = express.Router();
const { 
    editComment, 
    deleteComment ,
    addComment
} = require('../controllers/commentController');
const { auth } = require("../middleware/auth");



router.post('/comments/',auth, addComment);
router.put('/comments/:commentId/',auth, editComment);
router.delete('/comments/:commentId/:postId',auth, deleteComment);


module.exports = router;
