// controllers/postController.js
const User = require("../models/userModel");
const Post = require("../models/PostModel");
const Comment = require("../models/commentModel");
const Topic = require("../models/topicModel");
const mongoose = require('mongoose');

// ดึงข้อมูลทั้งหมด
const getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find()
        .populate({ path: 'topicId', select: 'name' }) // ดึง topic
        .populate({ path: 'userId', select: 'name' }); // ดึง user

    // เพิ่มจำนวน likesCount ในแต่ละโพสต์
    const posts = allPosts.map(post => ({
        ...post.toObject(), // แปลง Document เป็น Object
        likesCount: post.likes ? post.likes.length : 0 // นับจำนวน likes
    }));

    res.status(200).json({
        success: true,
        data: posts,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error...",
    });
  }
};


// ค้นหาโพส
const Search = async (req, res) => {  
  try {
    const { query } = req.query;
    console.log(query , "<= query");

    if (!query) {
      return res.status(400).json({ message: "Please enter a search term." });
    }

    const posts = await Post.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } }, // ค้นหาจาก title
            // { content: { $regex: query, $options: "i" } } // ค้นหาจาก content
          ]
        }
      },
      { $sample: { size: 10 } } // สุ่มโพสมา 10 โพส
    ]);


    // ไม่มีคำที่ค้นหา หาไม่เจอ
    if (posts.length === 0) {
      return res.status(404).json({ 
        message: "No posts found matching your search." 
      });
    }

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

// ดึงข้อมูลโพสตาม topic
const getPostTopic = async (req, res) => {
  try {
    // const { topicName } = req.params;  // รับชื่อหัว URL parameter
    const { topicId } = req.body; 

    console.log(topicId , "<= topicId");

    if (!topicId) {
      return res.status(400).json({ message: "Please enter a topicId." });
    }

    const posts = await Post.find({ topicId: topicId })
      .populate({ path: 'topicId', select: 'name' })
      .populate({ path: 'userId', select: 'name' })
      .sort({ createdAt: -1 });  // เรียงโพสต์จากใหม่ไปเก่า
    console.log(posts)

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No posts found for this topic."
      });
    }

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}


// โพสแต่ละ topic ที่มี like มากที่สุด
const getPostsTopInTopic = async (req, res) => {
  try {
    const { topicName } = req.params;  // รับชื่อหัวจาก URL parameter
    console.log(topicName , "<= query");

    // ตรวจสอบว่ามี topicName หรือไม่
    if (!topicName) {
      return res.status(400).json({ message: "Please provide a topic name." });
    }

    // ค้นหา topicId จากชื่อ topicName
    const topic = await Topic.findOne({ name: topicName });
    console.log(topic , "<= topic");
    
    // ตรวจสอบว่า topicId มีหรือไม่
    if (!topic) {
      return res.status(404).json({ message: "Topic not found." });
    }

    const topicId = new mongoose.Types.ObjectId(topic._id);  // ดึง topicId
    console.log(topicId , "<= topicId");


    // ค้นหาโพส และจัดเรียงตามจำนวน likes มากที่สุด
    const posts = await Post.find({ topicId: topicId })
      .populate({ path: 'userId', select: 'name' })  // ดึงข้อมูล username จาก userId
      .sort({ likes: -1 })  // จัดเรียงโพสต์ตามจำนวน likes มากที่สุด
      .limit(5);  // จำกัดผลลัพธ์ 5 โพสต์

    console.log(posts , "<= posts");

    // ตรวจสอบว่าไม่พบโพสต์
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this topic." });
    }

    res.status(200).json(posts.map(post => ({
      postId: post._id,  
      title: post.title,
      likes: post.likes.length, 
      commentCount: post.commentCount,
      username: post.userId.name, 
      createdAt: post.createdAt
    })));

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




const getPostDetail = async (req, res) =>{
    
    try{

        const { id } = req.params
        console.log(id)


        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }

         // ค้นหาตาม id
        const getpost = await Post.findById(id)
        .populate({ path: 'topicId', select: 'name' })
        .populate({ path: 'userId', select: 'name' }); // ดึง user

         if (!getpost) {
             return res.status(404).json({ message: "User not found" })
        }

        // ดึงข้อมูลคอมเม้นโพสต์นี้
        const comments = await Comment.find({ postId: id }).populate('userId', 'name'); // ใช้ populate เพื่อดึงข้อมูลผู้ใช้ด้วย
        console.log(comments)


        res.status(200).json({
        success: true,
        Post: getpost, 
        allComments :comments
        });
    

    }catch(error){
        console.error(error.message);
        res.status(500).json({
        success: false,
        message: "Internal Server Error...",
      });
    }
}


// สร้างโพสใหม่
const createPost = async (req, res) => {
    try {
      const { title, content, userId , topicId } = req.body;
  
      // เช็คว่าข้อมูลทั้งหมดถูกส่งมาป่าว
      if (!title || !content || !userId || !topicId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }

  
      // สร้างโพสต์ใหม่
      const newPost = new Post({title, content, userId, topicId});
  
      // บันทึก
      const savedPost = await newPost.save();

  
      // อัปเดต User (เพิ่ม postId เข้าไปในฟิลด์ posts ของ user)
      const user = await User.findById(userId);

      if (user) {
        user.posts.push(savedPost._id);
        await user.save();

      } else {

        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  

      // ส่งข้อมูลโพสต์กลับไป
      res.status(201).json({
        success: true,
        message: "Post created and added to user successfully.",
        data: savedPost,
      });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error...",
      });
    }
};


// อัพเดทข้อมูล
const updatePost = async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, content } = req.body; 
  
      // ตรวจสอบว่า id มีค่าหรือไม่
      if (!id) {
        return res.status(400).json({ success: false, message: "Post ID is required" });
      }
  
      // ค้นหาและอัปเดตโพสต์
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content }, // ข้อมูลที่ต้องการแก้ไข
        { new: true } // คืนค่าโพสต์ที่อัปเดตแล้ว
      );
  

      if (!updatedPost) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
  
// ลบข้อมูล
const deletePost = async (req, res) => {
    try {
      const { id } = req.params; // รับ id ของโพสต์จาก URL
  
      // ตรวจสอบว่า id มีค่าหรือไม่
      if (!id) {
        return res.status(400).json({ success: false, message: "Post ID is required" });
      }
  
      // ลบโพสต์จากฐานข้อมูล
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      // หาก User มีโพสต์ที่เกี่ยวข้อง ให้ลบออกจาก array `posts`
      await User.updateOne(
        { posts: id },
        { $pull: { posts: id } }
      );

      // ใช้ operator $pull เพื่อลบค่า id 
  
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// กดไลค์
const likePost = async (req, res) => {
  try {
    const { userId , postId } = req.body;

    console.log(userId)
    console.log(postId)

    // ค้นหาโพสต์
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // userId อยู่ใน array likes แล้วหรือยัง
    if (post.likes.includes(userId)) {
      // ถ้าเคยไลค์ -> ลบ userId ออกจาก likes
      post.likes = post.likes.filter((like) => like.toString() !== userId);

      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post unliked successfully',
        likesCount: post.likes.length,
      });
    }
 
    // ถ้ายังไม่เคยไลค์ -> เพิ่ม userId เข้าไปใน likes
    post.likes.push(userId);

    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post liked successfully',

      likesCount: post.likes.length,

    });

  } catch (error) {
    console.log(error.message)
      res.status(500).json({
        success: false,
        message: 'Error toggling like status',
      });
  }
};



  


module.exports = {
    Search,
    getPostTopic,
    getPostsTopInTopic,
    getAllPost,
    createPost,
    updatePost,
    deletePost,
    getPostDetail,
    likePost,

};