import { DeletePost } from "@/app/api/postServices";
import { useState, useRef, useEffect } from "react";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

import PopupModelCheck from "../popup/PopupModelCheck";

export const PostList = ({ profile }: { profile: User | null }) => {
    const [posts, setPosts] = useState(profile?.posts || []);
    const router = useRouter();
    const [ShowModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [postId, setPostId] = useState<string | null>(null)

    // อัปเดต posts ทุกครั้งที่ profile เปลี่ยน
    useEffect(() => {
        if (profile?.posts) {
            setPosts(profile.posts);
        }
    }, [profile]);

    // กด edit
    const handleEdit = (postId: string) => {
        // หา post ที่จะแก้ไข
        const postToEdit = posts.find((post) => post._id === postId);

        if (postToEdit) {
            const editData = {
                postId_edit: postId,
                title_edit: postToEdit.title || "",
                content_edit: postToEdit.content || "",
                topicId_edit: postToEdit.topicId || "",
            };

            // เก็บลง localStorage
            localStorage.setItem("editPostData", JSON.stringify(editData));

            router.push("/createpost");
        } else {
            console.error("Post not found for editing");
        }
    };

    // กด delete
    const handleDelete = async (postId: string) => {
        setShowModalDelete(false);

        try {
            console.log("Deleting post with ID:", postId);
            await DeletePost(postId);

            // อัปเดต posts ใหม่เอา post แค่ที่ postId ที่ id ไม่ตรงกับที่ลบออกไป
            setPosts((prevPosts) =>
                prevPosts.filter((post) => post._id !== postId)
            );
            console.log("Post deleted successfully");
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };


    const handlePostId = (postId: string) => {
        setShowModalDelete(true);
        setPostId(postId);
    }



    return (
        <div className="py-4 divide-y divide-[rgba(255,255,255,0.1)] noscroll overflow-y-auto max-h-[26rem] px-4">
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts available</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="">
                        <div className="relative flex gap-3 py-3 mb-5">
                            <img
                                src={`/uploads/${profile?.image}`}
                                alt="Profile picture"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="font-bold text-[#30E48E] text-sm sm:text-base">
                                        {profile?.fullname}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {profile?.createdAt}
                                </p>
                                <p className="mt-1 text-sm sm:text-base break-words">
                                    {post.content}
                                </p>
                                <div className="flex justify-between mt-3 text-[#E8E9EA]/60 max-w-md">
                                    <button className="flex items-center gap-1 text-sm hover:text-[#30E48E] transition-colors">
                                        <i className="fa-regular fa-comment-dots fa-lg"></i>
                                        <span>{post.commentCount}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute flex mt-2 right-5">
                                    <button
                                        onClick={() => handleEdit(post._id)}
                                        className="fa-solid fa-pen-to-square text-gray-500 mr-3 hover:text-gray-400"
                                    ></button>
                                    <button
                                        onClick={() => handlePostId(post._id)}
                                        className="fa-solid fa-trash text-gray-500 hover:text-gray-400"
                                    ></button>
                                </div>
                            </div>
                            {ShowModalDelete && postId &&(
                                <PopupModelCheck
                                    onClick={() => {
                                        handleDelete(postId);
                                    }}
                                    onClose={() => setShowModalDelete(false)}
                                    titletext="Delete Post?"
                                    subtext="Are you sure you want to delete your post?"
                                    textbutton="Delete"
                                />
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
