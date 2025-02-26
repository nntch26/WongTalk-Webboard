import { DeletePost } from "@/app/api/postServices";
import { useState, useRef, useEffect } from "react";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

export const PostList = ({ profile }: { profile: User | null }) => {
    const [posts, setPosts] = useState(profile?.posts || []);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const router = useRouter();

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
        } finally {
            // ปิด dropdown เมื่อลบเสร็จ
            setOpenDropdown(null);
        }
    };

    const toggleDropdown = (postId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenDropdown((prev) => (prev === postId ? null : postId));
    };

    const handleClickOutside = (event: MouseEvent) => {
        // เช็คว่า กดข้างนอก dropdown หรือไม่
        let clickedInside = false;

        // ถ้ากดข้างใน dropdown ให้เป็น true
        Object.values(dropdownRefs.current).forEach((ref) => {
            if (ref && ref.contains(event.target as Node)) {
                clickedInside = true;
            }
        });

        if (!clickedInside) {
            setOpenDropdown(null); // ปิด
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // set ref ให้ dropdown แต่ละตัว เป็นค่าตาม postid
    const setDropdownRef = (postId: string) => (el: HTMLDivElement | null) => {
        dropdownRefs.current[postId] = el;
    };

    return (
        <div className="py-4 divide-y divide-[rgba(255,255,255,0.1)] noscroll overflow-y-auto max-h-[26rem] px-4">
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts available</p>
            ) : (
                posts.map((post, index) => (
                    <div key={post._id || index} className="">
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

                            <div
                                className="relative"
                                ref={setDropdownRef(post._id)}
                            >
                                <i
                                    className="fa-solid fa-ellipsis-vertical cursor-pointer text-gray-500 text-xl hover:text-[#E8E9EA] transition"
                                    onClick={(e) => toggleDropdown(post._id, e)}
                                />
                                {openDropdown === post._id && (
                                    <div className="absolute z-10 bg-[#1E293B] border border-[#374151] rounded-md shadow-md mt-1 right-5">
                                        <button
                                            onClick={() => handleEdit(post._id)}
                                            className="text-green-500 text-sm block px-4 py-1 hover:font-bold rounded-md transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(post._id)
                                            }
                                            className="text-red-500 text-sm block px-4 py-1 hover:font-bold rounded-md transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
