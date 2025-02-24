import { PostListProps } from "@/types/types";


export const PostList = ({ profile }: PostListProps) => (
    <div className="py-4 divide-y divide-[rgba(255,255,255,0.1)] noscroll overflow-y-auto max-h-[26rem] px-4">
        {profile?.posts.map((post, index) => (
            <div key={index} className="flex gap-3 py-3 mb-5">
                <img
                    src={`/uploads/${profile.image}`}
                    alt="Profile picture"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-bold text-[#30E48E] text-sm sm:text-base">
                            {profile.fullname}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">{profile.createdAt}</p>
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
            </div>
        ))}
    </div>
);
