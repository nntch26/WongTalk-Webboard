
const express = require('express');
const router = express.Router();
const { 
    editComment, 
    deleteComment ,
    addComment
} = require('../controllers/commentController');



router.post('/comments/', addComment);
router.put('/comments/:commentId', editComment);
router.delete('/comments/:commentId', deleteComment);


module.exports = router;
