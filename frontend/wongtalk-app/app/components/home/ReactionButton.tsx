
import { LikePost } from '@/app/api/postServices'
import { useAuth } from '@/app/hook/useAuth';
import { Post } from '@/types/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PopupModalLogin from '../popup/PopupModalLogin';


export default function ReactionButton({post}:{post:Post}) {
    const [likes, setLikes] = useState<number>(post.likes.length);
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false);

     // hook เช็คว่า user login ยัง
    const {currentUser, islogin} = useAuth()
    console.log("Current User:", currentUser);
    console.log("reaction like post", post)

    useEffect(() => {
        if (currentUser) {
            // เช็คว่าผู้ใช้ที่ล็อกอินเคย likes ยัง ถ้า id มีในอาเรย like
            const haveLiked = post.likes.some(like => like.toString() === currentUser._id.toString());
            setIsLiked(haveLiked);
        }
    }, [currentUser, post.likes]); // ถ้าค่าเปลี่ยน รันใหม่

    


    const handleClikLike = async()=>{
        // ถ้ากด ก้ เช็คว่า login ยัง
        if (!islogin) {
            setShowModal(true) // ถ้ายังจะให้ดชว์ popup
            return;
        }

        console.log("Current User:", currentUser);

        try {
            // ยังไม่กดไลค์โพสนี้
            if (!isLiked) {
                const res = await LikePost(post._id);
    
                if (res.status === 200) {
                    console.log("Like post:", res);
                    setLikes(likes + 1); // เพิ่มจำนวนไลค์
                    setIsLiked(true); // กดไลค์แล้ว
                }
            } else {
                // ถ้ากดอีกครั้ง จะให้ลบไลค์ออก unlike
                const res = await LikePost(post._id);
    
                if (res.status === 200) {
                    console.log("Unlike post:", res);

                    setLikes(Math.max(likes - 1, 0)); // ลบไลค์  ตั้งว่ามันไม่ต่ำกว่า 0
                    setIsLiked(false); // ยังไม่กดไลค์
                }
            }
        } catch (error) {
            console.error("Error while liking/unliking post:", error);
        }
        
    }


    return (
        <>
         {/* โชว์ตอน user จะคอมเม้น แต่ยังไม่ login */}
        {showModal && <PopupModalLogin onClose={() => setShowModal(false)} />}
            
        <div className="flex items-center gap-4 text-gray-400 mt-4">
            
            <button className={`flex items-center gap-2 px-2 py-1 rounded ${
                    isLiked ? 'text-green-400' : 'hover:text-green-400'
                    }`}
                    onClick={handleClikLike}
                    >
                <i className="fa-solid fa-hands-clapping"></i>
                <span>{likes} Likes</span>
            </button>
    
            <Link href={`/detail/${post._id}`}>
                <button className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
                    <i className="fa-regular fa-comment-dots"></i>
                    <span>{post.commentCount} Comments</span>
                </button>
            </Link>
            
        </div>
        </>
    )
}
